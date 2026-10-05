"use client";
import { useRef, useState } from "react";
import { attendanceTypes, contactPreferences } from "../../lib/leads";

export function ContactForm() {
  const sending = useRef(false);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ ok: boolean; message: string; id?: string } | null>(null);
  return <form className="support-form" onSubmit={async event => {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    sending.current = true;
    setPending(true);
    setResult(null);
    try {
      const response = await fetch("/api/contato", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data.entries()), consentimento: data.get("consentimento") === "on" }),
        signal: AbortSignal.timeout(20000),
      });
      const value: unknown = await response.json();
      if (!value || typeof value !== "object") throw new Error("Resposta inválida");
      const payload = value as { error?: string; message?: string; id?: string };
      if (!response.ok) { setResult({ ok: false, message: payload.error ?? "Não foi possível enviar. Tente novamente mais tarde." }); return; }
      setResult({ ok: true, message: payload.message ?? "Solicitação recebida.", id: payload.id });
      form.reset();
    } catch {
      setResult({ ok: false, message: "Não foi possível confirmar o envio. Seus campos foram preservados. Confira sua conexão antes de tentar novamente." });
    } finally { sending.current = false; setPending(false); }
  }}>
    <h2>Solicitar atendimento</h2>
    <p>Conte o que sua empresa precisa. Seus dados serão usados para avaliar a solicitação e retornar pelo canal escolhido. Quando disponível, você também receberá uma confirmação por e-mail.</p>
    <div className="form-grid">
      <label>Nome<input name="nome" autoComplete="name" required maxLength={120} /></label>
      <label>Empresa<input name="empresa" autoComplete="organization" required maxLength={160} /></label>
      <label>Cidade<input name="cidade" autoComplete="address-level2" required maxLength={100} /></label>
      <label>Telefone<input name="telefone" type="tel" autoComplete="tel" required minLength={10} maxLength={30} /></label>
      <label>E-mail<input name="email" type="email" autoComplete="email" required maxLength={254} /></label>
      <label>Tipo de atendimento<select name="assunto" required><option value="">Selecione</option>{attendanceTypes.map(type => <option key={type}>{type}</option>)}</select></label>
      <label>Preferência de contato<select name="preferencia">{contactPreferences.map(type => <option key={type}>{type}</option>)}</select></label>
      <label className="form-wide">Descrição do problema<textarea name="mensagem" rows={5} required maxLength={3000} /></label>
    </div>
    <div className="contact-honeypot" aria-hidden="true"><label>Deixe este campo vazio<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <p>Descreva apenas o necessário para o diagnóstico inicial. Evite senhas e dados internos de clientes.</p>
    <label className="contact-consent"><input type="checkbox" name="consentimento" required />Autorizo João Guilherme a usar os dados informados para avaliar esta solicitação e entrar em contato comigo.</label>
    <p>Os dados não são publicados. Para solicitar correção ou exclusão, use o perfil profissional no LinkedIn indicado nesta página enquanto os canais comerciais estiverem em demonstração.</p>
    <button className="button button-primary" type="submit" disabled={pending}>{pending ? "Enviando…" : "Solicitar atendimento"}</button>
    {result && <div className="request-summary" role={result.ok ? "status" : "alert"}><p>{result.message}</p>{result.id && <p>Protocolo: <strong>{result.id}</strong></p>}</div>}
  </form>;
}
