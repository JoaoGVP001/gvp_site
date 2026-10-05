import { readFile, readdir } from "node:fs/promises";
import { DatabaseSync } from "node:sqlite";
import { createLeadHandler } from "../../lib/leads.ts";

export const sampleLead = { nome: "João", empresa: "Loja de teste", cidade: "Concórdia", telefone: "(49) 99999-9999", email: "teste@example.com", assunto: "Backup", mensagem: "Gostaria de organizar cópias dos arquivos.", preferencia: "E-mail", consentimento: true, website: "" };
export function contactRequest(body = sampleLead, headers = {}) {
  return new Request("https://example.com/api/contato", { method: "POST", headers: { origin: "https://example.com", "content-type": "application/json", "cf-connecting-ip": "192.0.2.1", ...headers }, body: typeof body === "string" ? body : JSON.stringify(body) });
}
export async function leadFixture(afterSave) {
  const sqlite = new DatabaseSync(":memory:");
  sqlite.exec("PRAGMA foreign_keys = ON");
  const migrations = new URL("../../drizzle/", import.meta.url);
  for (const name of (await readdir(migrations)).filter(name => name.endsWith(".sql")).sort()) sqlite.exec(await readFile(new URL(name, migrations), "utf8"));
  const database = { prepare(sql) { return { bind(...values) { return { async first() { return sqlite.prepare(sql).get(...values) ?? null; }, async run() { sqlite.prepare(sql).run(...values); return { success: true }; } }; } }; } };
  return { sqlite, database, handler: createLeadHandler(() => database, afterSave) };
}
