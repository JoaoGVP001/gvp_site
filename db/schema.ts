import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const leads = sqliteTable("leads", {
  id: text("id").primaryKey(),
  nome: text("nome").notNull(),
  empresa: text("empresa").notNull(),
  cidade: text("cidade").notNull(),
  telefone: text("telefone").notNull(),
  email: text("email").notNull(),
  assunto: text("assunto").notNull(),
  mensagem: text("mensagem").notNull(),
  preferencia: text("preferencia").notNull(),
  origem: text("origem").notNull().default("contato"),
  status: text("status", { enum: ["novo", "contatado", "interessado", "orcamento", "cliente", "perdido"] }).notNull().default("novo"),
  criadoEm: integer("criado_em").notNull(),
  atualizadoEm: integer("atualizado_em").notNull(),
}, table => [index("leads_status_criado_idx").on(table.status, table.criadoEm)]);

export const contactRateLimits = sqliteTable("contact_rate_limits", {
  key: text("key").primaryKey(),
  windowStart: integer("window_start").notNull(),
  count: integer("count").notNull(),
});

export const leadEmailAttempts = sqliteTable("lead_email_attempts", {
  id: text("id").primaryKey(),
  leadId: text("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  kind: text("kind", { enum: ["notification", "confirmation"] }).notNull(),
  status: text("status", { enum: ["pending", "skipped", "accepted", "failed", "unknown"] }).notNull(),
  providerId: text("provider_id"),
  criadoEm: integer("criado_em").notNull(),
  atualizadoEm: integer("atualizado_em").notNull(),
}, table => [index("lead_email_attempts_lead_idx").on(table.leadId)]);
