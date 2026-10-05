/* eslint-disable @next/next/no-html-link-for-pages -- Navegação nativa. */
import { Note, notes } from "../lib/content";
import { services } from "../lib/support";
import { SupportCTA } from "./_components/SupportCTA";

function compactDate(note: Note) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${note.date}T00:00:00Z`));
}

export default function Home() {

  return (
    <main>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> João Guilherme · Concórdia e região</p>
          <h1 id="hero-title">Suporte de TI para <em>pequenas empresas.</em></h1>
          <p className="hero-text">Computadores, impressoras, redes, backups e suporte remoto para empresas em Concórdia e região que precisam de tecnologia funcionando sem complicação.</p>
          <SupportCTA /><a className="text-link" href="/servicos">Conhecer serviços →</a>
        </div>
        <aside className="hero-card support-summary" aria-label="Modalidades de atendimento"><p className="section-number">TI PARA O SEU NEGÓCIO</p><h2>Menos interrupções.<br />Mais organização.</h2><ul><li>Atendimento local em Concórdia e região</li><li>Suporte remoto autorizado</li><li>Foco em pequenas empresas</li><li>Serviços avulsos e planos mensais</li></ul></aside>
      </section>

      <section className="home-section shell" aria-labelledby="services-title"><div className="section-heading"><div><p className="section-number">01 / SERVIÇOS</p><h2 id="services-title">Ajuda para a tecnologia do dia a dia.</h2></div><a className="text-link" href="/servicos">Todos os serviços →</a></div><div className="service-grid">{services.map(service => <a className="service-card" href={`/servicos#${service.slug}`} key={service.slug}><span className="service-icon" aria-hidden="true">{service.icon}</span><h3>{service.name}</h3><p>{service.description}</p></a>)}</div></section>
<section className="home-section shell"><div className="section-heading"><div><p className="section-number">02 / PARA QUEM</p><h2>Para quem depende de TI todos os dias.</h2></div></div><p>Contabilidades, clínicas, consultórios, escritórios jurídicos, imobiliárias, lojas, oficinas e pequenos comércios. Apoio para negócios que precisam de um ponto de contato para suas necessidades de tecnologia.</p><div className="segment-list">{["Contabilidade", "Clínicas", "Escritórios", "Lojas", "Oficinas", "Pequenos comércios"].map(segment => <span key={segment}>{segment}</span>)}</div></section>
<section className="home-section shell"><div className="section-heading"><div><p className="section-number">03 / COMO FUNCIONA</p><h2>Do primeiro contato à orientação final.</h2></div></div><ol className="support-steps">{["Você conta o que está acontecendo.", "Analisamos o problema e combinamos o escopo.", "Atendimento remoto ou presencial conforme a necessidade.", "Solução e orientação para o uso no dia a dia.", "Possibilidade de acompanhamento mensal."].map(step => <li key={step}>{step}</li>)}</ol><SupportCTA /></section>
<section className="home-section shell"><div className="section-heading"><div><p className="section-number">04 / ACOMPANHAMENTO</p><h2>Uma necessidade pontual ou apoio recorrente?</h2></div><a className="text-link" href="/planos">Conhecer planos →</a></div><p>Atendimento avulso, Essencial, Comércio ou proposta personalizada. Escopo, visitas e valores definidos conforme o ambiente.</p></section>
<section className="home-section shell"><div className="section-heading"><div><p className="section-number">05 / SOBRE JOÃO</p><h2>Conhecimento técnico, comunicação clara.</h2></div><a className="text-link" href="/sobre">Conhecer João →</a></div><p>Sou João Guilherme, estudante de Ciência da Computação. Uno estudos de software, redes e dados à proposta de ajudar pequenas empresas a organizar sua tecnologia. Meu foco é entender o problema, explicar as opções e combinar um atendimento adequado à sua rotina.</p></section>
<section className="home-section notes-section shell" aria-labelledby="notes-title">
        <div className="section-heading">
          <div><p className="section-number">06 / ORIENTAÇÕES</p><h2 id="notes-title">Orientações para sua empresa.</h2></div>
          <a className="text-link" href="/notas">Ver orientações <span aria-hidden="true">→</span></a>
        </div>
        <div className="note-list">
          {notes.filter(note => ["Suporte de TI", "Backup", "Segurança", "Redes"].includes(note.category)).slice(0, 3).map((note) => (
            <a href={`/notas/${note.slug}`} className="note-row" key={note.slug}>
              <span className="note-topic">{note.category}</span><strong>{note.title}</strong><time>{compactDate(note)}</time><span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

<section className="home-cta shell">
        <p className="section-number">07 / PRÓXIMO PASSO</p>
        <div><h2>Sua empresa precisa de suporte?</h2><a className="button button-primary" href="/contato">Solicitar atendimento <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
