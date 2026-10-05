"use client";
import { useState } from "react";

export function ContactForm() {
  const [summary, setSummary] = useState("");
  const [copied, setCopied] = useState(false);
  return <form className="support-form" onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSummary(Array.from(data.entries()).map(([key, value]) => `${key}: ${value}`).join("\n"));
    setCopied(false);
  }}>
    <h2>Prepare sua solicitação</h2>
    <p>Modo demonstração: os contatos são fictícios. Este formulário gera um resumo no seu navegador; não envia nem armazena seus dados.</p>
    <div className="form-grid">
      <label>Nome<input name="Nome" autoComplete="name" required maxLength={120} /></label>
      <label>Empresa<input name="Empresa" autoComplete="organization" required maxLength={160} /></label>
      <label>Cidade<input name="Cidade" autoComplete="address-level2" required maxLength={100} /></label>
      <label>Telefone<input name="Telefone" type="tel" autoComplete="tel" required maxLength={30} /></label>
      <label>E-mail<input name="E-mail" type="email" autoComplete="email" required maxLength={254} /></label>
      <label>Tipo de atendimento<select name="Atendimento" required><option value="">Selecione</option>{["Suporte remoto", "Visita técnica", "Computadores", "Impressoras", "Rede/Wi-Fi", "Backup", "Plano mensal", "Outro"].map(type => <option key={type}>{type}</option>)}</select></label>
      <label>Preferência de contato<select name="Preferência"><option>WhatsApp</option><option>E-mail</option><option>Telefone</option></select></label>
      <label className="form-wide">Descrição do problema<textarea name="Descrição" rows={5} required maxLength={3000} /></label>
    </div>
    <p>Descreva apenas o necessário para o diagnóstico inicial. Evite senhas e dados internos de clientes.</p>
    <button className="button button-primary" type="submit">Preparar solicitação</button>
    {summary && <div className="request-summary" role="status"><h3>Resumo pronto · ainda não enviado</h3><pre>{summary}</pre><button className="button button-ghost" type="button" onClick={async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch { setCopied(false); } }}>{copied ? "Copiado" : "Copiar solicitação"}</button><p>Use este resumo quando um canal comercial real estiver disponível.</p></div>}
  </form>;
}
