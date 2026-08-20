import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com João Guilherme para conversar sobre tecnologia, projetos e oportunidades.",
};

export default function ContactPage() {
  return (
    <main className="contact-page shell">
      <section className="contact-intro">
        <p className="eyebrow"><span /> Contato</p>
        <h1>Boas conversas podem virar <em>ótimos projetos.</em></h1>
        <p>Se você quer falar sobre tecnologia, uma oportunidade ou uma ideia interessante, pode me encontrar pelo GitHub. Vou gostar de conhecer o contexto.</p>
      </section>
      <section className="contact-card">
        <div><span>CANAL PRINCIPAL</span><h2>GitHub</h2><p>Acompanhe meus projetos ou inicie uma conversa pelo meu perfil.</p></div>
        <a className="button button-primary" href="https://github.com/JoaoGVP001" target="_blank" rel="noreferrer">Abrir @JoaoGVP001 <span aria-hidden="true">↗</span></a>
      </section>
      <section className="contact-details">
        <div><span>INTERESSES</span><p>Desenvolvimento web, backend, dados e projetos acadêmicos.</p></div>
        <div><span>LOCALIZAÇÃO</span><p>Brasil · disponível para conexões remotas.</p></div>
        <div><span>RESPOSTA</span><p>Conte um pouco sobre a ideia para começarmos com contexto.</p></div>
      </section>
    </main>
  );
}
