import assert from "node:assert/strict";
import test from "node:test";
import { createLeadEmailNotifier, emailSettings, emailMessage } from "../lib/lead-email.ts";
import { sampleLead, contactRequest, leadFixture } from "./helpers/leads.mjs";

const config = { apiKey: "re_mock_secret", from: "suporte@empresa.com.br", to: "joao@empresa.com.br" };
const enabled = { CONTACT_EMAIL_ENABLED: "true", RESEND_API_KEY: config.apiKey, CONTACT_EMAIL_FROM: config.from, CONTACT_EMAIL_TO: config.to };

test("email requires explicit enablement, complete config and real business addresses", () => {
  assert.equal(emailSettings({}), null);
  assert.equal(emailSettings({ ...enabled, CONTACT_EMAIL_ENABLED: "false" }), null);
  assert.equal(emailSettings({ ...enabled, RESEND_API_KEY: "" }), null);
  assert.equal(emailSettings({ ...enabled, CONTACT_EMAIL_FROM: "contato@example.com" }), null);
  assert.equal(emailSettings({ ...enabled, CONTACT_EMAIL_TO: "x@host.test" }), null);
  assert.equal(emailSettings({ ...enabled, CONTACT_EMAIL_FROM: "a@empresa.com.br\nBcc:other@empresa.com.br" }), null);
  assert.deepEqual(emailSettings(enabled), config);
});

test("disabled email never calls provider and records both attempts as skipped", async () => {
  const notifier = createLeadEmailNotifier(() => null, async () => { throw new Error("must not call provider"); });
  const { sqlite, handler } = await leadFixture(notifier);
  try {
    const response = await handler(contactRequest());
    assert.equal(response.status, 201);
    const statuses = sqlite.prepare("SELECT status FROM lead_email_attempts").all().map(row => row.status);
    assert.deepEqual(statuses, ["skipped", "skipped"]);
  } finally { sqlite.close(); }
});

test("sends notification and fixed confirmation after persistence and stores provider acceptance", async () => {
  const calls = [];
  let sqlite;
  const notifier = createLeadEmailNotifier(() => config, async (url, options) => {
    assert.equal(sqlite.prepare("SELECT count(*) AS count FROM leads").get().count, 1);
    assert.equal(url, "https://api.resend.com/emails");
    assert.equal(options.headers.Authorization, `Bearer ${config.apiKey}`);
    assert.ok(options.signal instanceof AbortSignal);
    calls.push({ payload: JSON.parse(options.body), key: options.headers["Idempotency-Key"] });
    return Response.json({ id: `provider-${calls.length}` });
  });
  const fixture = await leadFixture(notifier);
  sqlite = fixture.sqlite;
  try {
    const response = await fixture.handler(contactRequest({ ...sampleLead, mensagem: "<script>untrusted visitor text</script>" }));
    assert.equal(response.status, 201);
    const responseBody = await response.json();
    const { id } = responseBody;
    assert.equal(calls.length, 2);
    assert.deepEqual(calls[0].payload.to, [config.to]);
    assert.equal(calls[0].payload.reply_to, sampleLead.email);
    assert.match(calls[0].payload.text, /untrusted visitor text/);
    assert.deepEqual(calls[1].payload.to, [sampleLead.email]);
    assert.equal(calls[1].payload.reply_to, config.to);
    assert.match(calls[1].payload.text, new RegExp(id));
    assert.doesNotMatch(calls[1].payload.text, /untrusted visitor text|Loja de teste/);
    assert.equal(calls[1].payload.html, undefined);
    const attempts = sqlite.prepare("SELECT status, provider_id FROM lead_email_attempts ORDER BY provider_id").all();
    assert.deepEqual(attempts.map(row => row.status), ["accepted", "accepted"]);
    await notifier(fixture.database, id, sampleLead);
    assert.equal(calls.length, 2, "a second call must not duplicate email");
    assert.notEqual(calls[0].key, calls[1].key);
    assert.doesNotMatch(JSON.stringify(responseBody), /re_mock_secret/);
  } finally { sqlite.close(); }
});

test("provider rejection or timeout keeps lead saved and records separate outcomes", async () => {
  let calls = 0;
  const notifier = createLeadEmailNotifier(() => config, async () => {
    calls++;
    if (calls === 1) return Response.json({ error: "private provider diagnostic" }, { status: 429 });
    throw new Error("timeout with private details");
  });
  const { sqlite, handler } = await leadFixture(notifier);
  try {
    const response = await handler(contactRequest());
    assert.equal(response.status, 201);
    const result = await response.json();
    assert.ok(result.id);
    assert.doesNotMatch(JSON.stringify(result), /private|timeout|re_mock_secret/);
    assert.deepEqual(sqlite.prepare("SELECT status FROM lead_email_attempts ORDER BY kind DESC").all().map(row => row.status), ["failed", "unknown"]);
    assert.equal(sqlite.prepare("SELECT count(*) AS count FROM leads").get().count, 1);
  } finally { sqlite.close(); }
});

test("a malformed success response is uncertain rather than falsely marked accepted", async () => {
  const notifier = createLeadEmailNotifier(() => config, async () => Response.json({}));
  const { sqlite, handler } = await leadFixture(notifier);
  try {
    assert.equal((await handler(contactRequest())).status, 201);
    assert.deepEqual(sqlite.prepare("SELECT status FROM lead_email_attempts").all().map(row => row.status), ["unknown", "unknown"]);
  } finally { sqlite.close(); }
});

test("mail audit errors or an unexpected callback exception cannot undo receipt", async () => {
  let calls = 0;
  const notifier = createLeadEmailNotifier(() => config, async () => { calls++; return Response.json({ id: "unexpected" }); });
  const { sqlite, handler } = await leadFixture(notifier);
  try {
    sqlite.exec("DROP TABLE lead_email_attempts");
    assert.equal((await handler(contactRequest())).status, 201);
    assert.equal(calls, 0);
    assert.equal(sqlite.prepare("SELECT count(*) AS count FROM leads").get().count, 1);
  } finally { sqlite.close(); }
  const other = await leadFixture(async () => { throw new Error("private callback error"); });
  try { assert.equal((await other.handler(contactRequest())).status, 201); } finally { other.sqlite.close(); }
});

test("confirmation templates do not echo visitor input or promise appointments", () => {
  const message = emailMessage(config, "protocol", { ...sampleLead, nome: "malicious text" }, "confirmation");
  assert.doesNotMatch(message.text, /malicious text/);
  assert.match(message.text, /não representa agendamento/);
});
