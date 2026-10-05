import type { LeadInput } from "./leads";

export type EmailEnvironment = {
  CONTACT_EMAIL_ENABLED?: string;
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_FROM?: string;
  CONTACT_EMAIL_TO?: string;
};
export type EmailSettings = { apiKey: string; from: string; to: string };
type MailKind = "notification" | "confirmation";
type SendResult = { status: "accepted" | "failed" | "unknown"; providerId: string | null };

function validBusinessEmail(value: string) {
  if (!/^[^\s@<>(),;:"[\]\\]+@[^\s@<>(),;:"[\]\\]+\.[^\s@<>(),;:"[\]\\]+$/.test(value)) return false;
  const domain = value.split("@")[1].toLowerCase();
  return !["example.com", "example.org", "example.net"].includes(domain) && !/\.(example|invalid|test|localhost)$/.test(domain);
}

export function emailSettings(environment: EmailEnvironment): EmailSettings | null {
  if (environment.CONTACT_EMAIL_ENABLED !== "true") return null;
  const apiKey = environment.RESEND_API_KEY?.trim();
  const from = environment.CONTACT_EMAIL_FROM?.trim();
  const to = environment.CONTACT_EMAIL_TO?.trim();
  if (!apiKey || !from || !to || !validBusinessEmail(from) || !validBusinessEmail(to)) return null;
  return { apiKey, from, to };
}

export function emailMessage(settings: EmailSettings, id: string, lead: LeadInput, kind: MailKind) {
  if (kind === "confirmation") return {
    from: settings.from,
    to: [lead.email],
    reply_to: settings.to,
    subject: "Solicitação de suporte de TI recebida",
    // Não reproduzir conteúdo fornecido pelo visitante em mensagens para terceiros.
    text: `Recebemos uma solicitação de suporte de TI pelo site de João Guilherme.\n\nProtocolo: ${id}\n\nO retorno depende da disponibilidade e será realizado pelo canal informado na solicitação. Esta confirmação não representa agendamento ou contratação.\n\nSe você não iniciou essa solicitação, desconsidere esta mensagem.`,
  };
  return {
    from: settings.from,
    to: [settings.to],
    reply_to: lead.email,
    subject: "Nova solicitação de suporte de TI",
    text: `Protocolo: ${id}\n\nNome: ${lead.nome}\nEmpresa: ${lead.empresa}\nCidade: ${lead.cidade}\nTelefone: ${lead.telefone}\nE-mail: ${lead.email}\nAtendimento: ${lead.assunto}\nPreferência: ${lead.preferencia}\n\nDescrição:\n${lead.mensagem}\n\nO lead foi registrado no banco com status novo.`,
  };
}

async function send(settings: EmailSettings, id: string, lead: LeadInput, kind: MailKind, transport: typeof fetch): Promise<SendResult> {
  try {
    const response = await transport("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${settings.apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `lead-${id}-${kind}` },
      body: JSON.stringify(emailMessage(settings, id, lead, kind)),
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return { status: "failed", providerId: null };
    const payload: unknown = await response.json();
    if (payload && typeof payload === "object" && "id" in payload && typeof payload.id === "string" && payload.id.length > 0 && payload.id.length <= 200) return { status: "accepted", providerId: payload.id };
    return { status: "unknown", providerId: null };
  } catch {
    // Um timeout não prova que o provedor recusou o envio; não repetir automaticamente.
    return { status: "unknown", providerId: null };
  }
}

export function createLeadEmailNotifier(settings: () => EmailSettings | null, transport: typeof fetch = fetch) {
  return async (db: D1Database, id: string, lead: LeadInput): Promise<void> => {
    const config = settings();
    for (const kind of ["notification", "confirmation"] as const) {
      try {
        const attemptId = `${id}:${kind}`;
        const now = Date.now();
        // A chave única permite uma única tentativa por lead e finalidade.
        const claimed = await db.prepare(`INSERT INTO lead_email_attempts (id, lead_id, kind, status, criado_em, atualizado_em)
          VALUES (?, ?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING RETURNING id`).bind(attemptId, id, kind, config ? "pending" : "skipped", now, now).first();
        if (!claimed || !config) continue;
        const result = await send(config, id, lead, kind, transport);
        await db.prepare(`UPDATE lead_email_attempts SET status = ?, provider_id = ?, atualizado_em = ? WHERE id = ?`)
          .bind(result.status, result.providerId, Date.now(), attemptId).run();
      } catch {
        // Não registrar credenciais, conteúdo do lead ou respostas do provedor.
        console.error("contact_email_attempt_unavailable");
      }
    }
  };
}
