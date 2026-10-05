/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element -- Links nativos preservam a navegação e a foto vem diretamente do perfil público do GitHub. */
import { Note, projects, notes } from "../lib/content";
import { getGitHubSnapshot } from "../lib/github";
import { services } from "../lib/support";
import { SupportCTA } from "./_components/SupportCTA";
import { ProjectCard } from "./_components/ProjectCard";

function compactDate(note: Note) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${note.date}T00:00:00Z`));
}

function githubDate(date: string | null) {
  if (!date) return "indisponível";

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "America/Sao_Paulo",
  })
    .format(new Date(date))
    .replace(" de ", " ")
    .replace(" de ", " ");
}

export default async function Home() {
  const github = await getGitHubSnapshot();

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
<section className="home-section shell"><div className="section-heading"><div><p className="section-number">05 / SOBRE JOÃO</p><h2>Conhecimento técnico, comunicação clara.</h2></div><a className="text-link" href="/sobre">Conhecer João →</a></div><p>Sou João Guilherme, estudante de Ciência da Computação. Uno estudos de software, redes e dados à proposta de ajudar pequenas empresas a organizar sua tecnologia. Meus projetos e anotações mostram esse aprendizado na prática.</p></section>
<section className="home-section shell" aria-labelledby="projects-title">
        <div className="section-heading">
          <div><p className="section-number">06 / PROVA TÉCNICA</p><h2 id="projects-title">O projeto em que estou trabalhando.</h2></div>
          <a className="text-link" href="/projetos/bookreadnet">Ver projeto <span aria-hidden="true">→</span></a>
        </div>
        <div className="project-grid single-project">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </section>

      <section className="home-github shell" aria-labelledby="github-title">
        <div className="section-heading github-heading">
          <div>
            <p className="section-number">07 / GITHUB · API REST</p>
            <h2 id="github-title">Código vivo, direto do GitHub.</h2>
          </div>
          <p className="github-live-status">
            <span aria-hidden="true" />
            {github.source === "github" ? "Dados públicos · cache de 1 hora" : "Dados locais temporários"}
          </p>
        </div>

        <div className="github-grid">
          <article className="github-profile-card">
            <div className="github-card-label"><span>PERFIL</span><span>PUBLIC</span></div>
            <div className="github-identity">
              <img src={github.profile.avatarUrl} alt={`Foto do perfil de ${github.profile.name}`} width="72" height="72" />
              <div><strong>{github.profile.name}</strong><span>@{github.profile.login}</span></div>
            </div>
            <p className="github-location">⌖ {github.profile.location}</p>
            <dl className="github-stats">
              <div><dt>Repositórios</dt><dd>{github.profile.publicRepos}</dd></div>
              <div><dt>Seguidores</dt><dd>{github.profile.followers}</dd></div>
              <div><dt>Seguindo</dt><dd>{github.profile.following}</dd></div>
            </dl>
            <a href={github.profile.profileUrl} target="_blank" rel="noreferrer">Abrir perfil no GitHub <span aria-hidden="true">↗</span></a>
          </article>

          <article className="github-repository-card">
            <div className="github-card-label"><span>REPOSITÓRIO EM DESTAQUE</span><span>PUBLIC</span></div>
            <h3>{github.repository.name}</h3>
            <p>{github.repository.description}</p>
            <dl className="repository-meta">
              <div><dt>Linguagem</dt><dd><i aria-hidden="true" /> {github.repository.primaryLanguage}</dd></div>
              <div><dt>Stars</dt><dd>★ {github.repository.stars}</dd></div>
              <div><dt>Forks</dt><dd>⑂ {github.repository.forks}</dd></div>
              <div><dt>Branch</dt><dd>{github.repository.defaultBranch}</dd></div>
            </dl>
            <div className="language-breakdown" aria-label="Distribuição das linguagens do BookReadNet">
              <div className="language-bar">
                {github.repository.languages.map((language) => (
                  <span key={language.name} style={{ width: `${language.percentage}%` }} title={`${language.name}: ${language.percentage}%`} />
                ))}
              </div>
              <ul>
                {github.repository.languages.map((language) => <li key={language.name}>{language.name} <strong>{language.percentage}%</strong></li>)}
              </ul>
            </div>
            <div className="repository-footer">
              <small>Última atualização: {githubDate(github.repository.pushedAt)}</small>
              <a href={github.repository.url} target="_blank" rel="noreferrer">Ver código <span aria-hidden="true">↗</span></a>
            </div>
          </article>
        </div>
      </section>

      <section className="home-section notes-section shell" aria-labelledby="notes-title">
        <div className="section-heading">
          <div><p className="section-number">08 / CADERNO</p><h2 id="notes-title">O que tenho aprendido.</h2></div>
          <a className="text-link" href="/notas">Abrir caderno <span aria-hidden="true">→</span></a>
        </div>
        <div className="note-list">
          {notes.slice(0, 3).map((note) => (
            <a href={`/notas/${note.slug}`} className="note-row" key={note.slug}>
              <span className="note-topic">{note.category}</span><strong>{note.title}</strong><time>{compactDate(note)}</time><span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </section>

<section className="home-cta shell">
        <p className="section-number">09 / PRÓXIMO PASSO</p>
        <div><h2>Sua empresa precisa de suporte?</h2><a className="button button-primary" href="/contato">Solicitar atendimento <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
