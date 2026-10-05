export const attendanceTypes = ["Suporte remoto", "Visita técnica", "Computadores", "Impressoras", "Rede/Wi-Fi", "Backup", "Plano mensal", "Outro"];
export const contactPreferences = ["WhatsApp", "E-mail", "Telefone"];
export type LeadInput = { nome: string; empresa: string; cidade: string; telefone: string; email: string; assunto: string; mensagem: string; preferencia: string };

export function validateLead(value: unknown): LeadInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const data = value as Record<string, unknown>;
  const limits = { nome: 120, empresa: 160, cidade: 100, telefone: 30, email: 254, assunto: 40, mensagem: 3000, preferencia: 20 };
  const result: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (typeof data[key] !== "string") return null;
    const text = data[key].trim();
    if (!text || text.length > limit || Array.from(text).some(char => char.charCodeAt(0) < 32 && ![9, 10, 13].includes(char.charCodeAt(0)))) return null;
    result[key] = text;
  }
  if (data.website !== undefined && data.website !== "") return null;
  if (!/^[^\s@<>(),;:"[\]\\]+@[^\s@<>(),;:"[\]\\]+\.[^\s@<>(),;:"[\]\\]+$/.test(result.email)) return null;
  if (!/^[+\d\s().-]+$/.test(result.telefone) || result.telefone.replace(/\D/g, "").length < 10) return null;
  if (!attendanceTypes.includes(result.assunto) || !contactPreferences.includes(result.preferencia)) return null;
  if (data.consentimento !== true) return null;
  return result as LeadInput;
}

export function createLeadHandler(database: () => D1Database, afterSave?: (db: D1Database, id: string, lead: LeadInput) => Promise<void>) {
  return async (request: Request): Promise<Response> => {
    const response = (body: Record<string, unknown>, status: number) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
    if (request.headers.get("origin") !== new URL(request.url).origin) return response({ error: "Origem da solicitação inválida." }, 403);
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/json") return response({ error: "Formato inválido." }, 415);
    if (!request.body) return response({ error: "Preencha os campos obrigatórios." }, 400);
    const reader = request.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > 16384) { await reader.cancel(); return response({ error: "Solicitação muito grande." }, 413); }
        chunks.push(value);
      }
    } catch { return response({ error: "Não foi possível ler a solicitação." }, 400); }
    finally { reader.releaseLock(); }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    let payload: unknown;
    try { payload = JSON.parse(new TextDecoder().decode(bytes)); } catch { return response({ error: "Solicitação inválida." }, 400); }
    const lead = validateLead(payload);
    if (!lead) return response({ error: "Revise os campos e autorize o contato para enviar." }, 400);
    try {
      const db = database();
      const now = Date.now();
      const windowStart = Math.floor(now / 600000) * 600000;
      // O header é fornecido pelo Cloudflare; sem ele o limite é compartilhado.
      const ip = request.headers.get("cf-connecting-ip") ?? "local";
      const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
      const key = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
      const quota = await db.prepare(`INSERT INTO contact_rate_limits (key, window_start, count) VALUES (?, ?, 1)
        ON CONFLICT(key) DO UPDATE SET window_start = excluded.window_start,
        count = CASE WHEN contact_rate_limits.window_start = excluded.window_start THEN contact_rate_limits.count + 1 ELSE 1 END
        WHERE contact_rate_limits.window_start != excluded.window_start OR contact_rate_limits.count < 5
        RETURNING count`).bind(key, windowStart).first();
      if (!quota) return response({ error: "Muitas solicitações. Aguarde alguns minutos e tente novamente." }, 429);
      const id = crypto.randomUUID();
      await db.prepare(`INSERT INTO leads (id, nome, empresa, cidade, telefone, email, assunto, mensagem, preferencia, origem, status, criado_em, atualizado_em)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'contato', 'novo', ?, ?)`).bind(id, lead.nome, lead.empresa, lead.cidade, lead.telefone, lead.email, lead.assunto, lead.mensagem, lead.preferencia, now, now).run();
      if (afterSave) {
        try { await afterSave(db, id, lead); } catch { console.error("contact_email_notification_unavailable"); }
      }
      return response({ id, message: "Solicitação recebida. Guarde seu protocolo. O retorno depende da disponibilidade de atendimento." }, 201);
    } catch {
      // Não registrar payload, dados pessoais ou mensagens de erros do banco.
      console.error("contact_lead_storage_unavailable");
      return response({ error: "Não foi possível receber sua solicitação agora. Seus campos foram preservados; tente novamente mais tarde." }, 503);
    }
  };
}
