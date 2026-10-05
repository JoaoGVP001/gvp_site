import type { Metadata } from "next";
import { ContactForm } from "../_components/ContactForm";
import { SupportCTA } from "../_components/SupportCTA";
import { businessContact } from "../../lib/support";

export const metadata: Metadata = { title: "Solicitar suporte de TI em Concórdia", description: "Prepare sua solicitação de suporte de TI para computadores, impressoras, redes e backup. Atendimento para pequenas empresas em Concórdia e região." };

export default function ContactPage() {
  return <main className="contact-page shell">
    <section className="contact-intro"><p className="eyebrow"><span /> Contato · Concórdia e região</p><h1>Sua empresa precisa de <em>suporte de TI?</em></h1><p>Conte o que está acontecendo, quantos equipamentos estão envolvidos e onde fica sua empresa. A avaliação inicial ajuda a definir atendimento remoto ou presencial.</p></section>
    <section className="contact-card"><div><span>CANAIS COMERCIAIS</span><h2>WhatsApp e e-mail</h2>{businessContact.whatsapp || businessContact.email ? <SupportCTA /> : <><p>Contatos fictícios para demonstração. Atendimento por estes canais ainda não está ativo.</p><p>WhatsApp: +55 (49) 00000-0000<br />E-mail: contato@example.com</p></>}</div></section>
    <ContactForm />
    <section className="contact-socials" aria-label="Perfis profissionais"><a className="social-link-card" href="https://www.linkedin.com/in/jo%C3%A3o-vargas-7ba1b836b" target="_blank" rel="noreferrer"><span>PROFISSIONAL</span><strong>LinkedIn</strong><p>Formação e conexões profissionais.</p><i aria-hidden="true">↗</i></a><a className="social-link-card" href="https://github.com/JoaoGVP001" target="_blank" rel="noreferrer"><span>PORTFÓLIO TÉCNICO</span><strong>GitHub</strong><p>Projetos e código público.</p><i aria-hidden="true">↗</i></a></section>
    <section className="contact-details"><div><span>LOCALIZAÇÃO</span><p>Concórdia/SC e região, com suporte remoto conforme o problema.</p></div><div><span>ATENDIMENTO</span><p>Horário, disponibilidade, deslocamento e prazo de resposta combinados na proposta.</p></div><div><span>ORÇAMENTO</span><p>Equipamentos, peças e licenças são orçados separadamente.</p></div></section>
  </main>;
}
