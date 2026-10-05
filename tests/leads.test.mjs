import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import test from "node:test";
import { createLeadHandler, validateLead } from "../lib/leads.ts";

const valid = { nome: "João", empresa: "Loja de teste", cidade: "Concórdia", telefone: "(49) 99999-9999", email: "teste@example.com", assunto: "Backup", mensagem: "Gostaria de organizar cópias dos arquivos.", preferencia: "E-mail", consentimento: true, website: "" };
function request(body = valid, headers = {}) {
  return new Request("https://example.com/api/contato", { method: "POST", headers: { origin: "https://example.com", "content-type": "application/json", "cf-connecting-ip": "192.0.2.1", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}
async function fixture() {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec(await readFile(new URL("../drizzle/0000_flippant_the_twelve.sql", import.meta.url), "utf8"));
  const database = { prepare(sql) { return { bind(...values) { return { async first() { return sqlite.prepare(sql).get(...values) ?? null; }, async run() { sqlite.prepare(sql).run(...values); return { success: true }; } }; } }; } };
  return { sqlite, handler: createLeadHandler(() => database) };
}

test("validates required fields, bounded input, consent, enumerations and honeypot", () => {
  assert.equal(validateLead(valid).nome, "João");
  for (const invalid of [null, [], { ...valid, nome: " " }, { ...valid, mensagem: "x".repeat(3001) }, { ...valid, email: "invalid" }, { ...valid, telefone: "abc123" }, { ...valid, assunto: "Inventado" }, { ...valid, preferencia: "SMS" }, { ...valid, consentimento: false }, { ...valid, website: "spam" }]) assert.equal(validateLead(invalid), null);
});

test("persists validated lead with default status and returns a protocol", async () => {
  const { sqlite, handler } = await fixture();
  try {
    const response = await handler(request({ ...valid, nome: "  João  ", mensagem: "Texto com ' aspas e <script> literal" }));
    assert.equal(response.status, 201);
    const result = await response.json();
    const row = sqlite.prepare("SELECT * FROM leads WHERE id = ?").get(result.id);
    assert.equal(row.nome, "João");
    assert.equal(row.mensagem, "Texto com ' aspas e <script> literal");
    assert.equal(row.status, "novo");
    assert.equal(row.origem, "contato");
    assert.equal(row.criado_em, row.atualizado_em);
    assert.equal(response.headers.get("cache-control"), "no-store");
    const quota = sqlite.prepare("SELECT key FROM contact_rate_limits").get();
    assert.equal(quota.key.length, 64);
    assert.doesNotMatch(quota.key, /192\.0\.2\.1/);
  } finally { sqlite.close(); }
});

test("rejects bad origin, content type, malformed JSON and oversized streaming body before database access", async () => {
  const handler = createLeadHandler(() => { throw new Error("must not access database"); });
  assert.equal((await handler(request(valid, { origin: "https://other.example" }))).status, 403);
  assert.equal((await handler(request(valid, { "content-type": "text/plain" }))).status, 415);
  assert.equal((await handler(request("{"))).status, 400);
  assert.equal((await handler(request("x".repeat(16385)))).status, 413);
  assert.equal((await handler(request({ ...valid, consentimento: false }))).status, 400);
});

test("limits submissions durably and resets quota in a new time window", async () => {
  const { sqlite, handler } = await fixture();
  try {
    for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 201);
    assert.equal((await handler(request())).status, 429);
    assert.equal(sqlite.prepare("SELECT count(*) AS count FROM leads").get().count, 5);
    sqlite.exec("UPDATE contact_rate_limits SET window_start = 0");
    assert.equal((await handler(request())).status, 201);
  } finally { sqlite.close(); }
});

test("storage failures never return a false confirmation or leak diagnostic data", async () => {
  const handler = createLeadHandler(() => { throw new Error("private database details"); });
  const response = await handler(request());
  assert.equal(response.status, 503);
  const result = await response.json();
  assert.match(result.error, /campos foram preservados/);
  assert.doesNotMatch(JSON.stringify(result), /private database details|Loja de teste/);
});
