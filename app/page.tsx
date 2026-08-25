/* eslint-disable @next/next/no-html-link-for-pages, @next/next/no-img-element, react/no-unescaped-entities -- Links nativos preservam a navegação e a foto vem diretamente do perfil público do GitHub. */
import { Note, projects, notes } from "../lib/content";
import { getGitHubSnapshot } from "../lib/github";
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
          <p className="eyebrow"><span /> Olá, eu sou João Guilherme</p>
          <h1 id="hero-title">Eu transformo <em>curiosidade</em> em código.</h1>
          <p className="hero-text">Estudante de Ciência da Computação explorando software, dados e novas ideias — um projeto de cada vez.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="/projetos/bookreadnet">Explorar o BookReadNet <span aria-hidden="true">↗</span></a>
            <a className="button button-ghost" href="https://github.com/JoaoGVP001" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <aside className="hero-card" aria-label="Resumo profissional">
          <div className="code-dots"><span /><span /><span /></div>
          <div className="code-line"><b>const</b> joao = {'{'}</div>
          <div className="code-line indent">formacao: <strong>"Ciência da Computação"</strong>,</div>
          <div className="code-line indent">foco: [<strong>"web"</strong>, <strong>"dados"</strong>, <strong>"mobile"</strong>],</div>
          <div className="code-line indent">aprendendoSempre: <b>true</b>,</div>
          <div className="code-line">{'}'};</div>
          <div className="status-line"><i /> disponível para criar</div>
        </aside>
      </section>

      <section className="home-section shell" aria-labelledby="projects-title">
        <div className="section-heading">
          <div><p className="section-number">01 / PROJETO</p><h2 id="projects-title">O projeto em que estou trabalhando.</h2></div>
          <a className="text-link" href="/projetos/bookreadnet">Ver projeto <span aria-hidden="true">→</span></a>
        </div>
        <div className="project-grid single-project">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </section>

      <section className="home-github shell" aria-labelledby="github-title">
        <div className="section-heading github-heading">
          <div>
            <p className="section-number">02 / GITHUB · API REST</p>
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
          <div><p className="section-number">03 / CADERNO</p><h2 id="notes-title">O que tenho aprendido.</h2></div>
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

      <section className="home-laboratory shell" aria-labelledby="laboratory-title">
        <div>
          <p className="section-number">04 / LABORATÓRIO</p>
          <h2 id="laboratory-title">Código que você pode jogar.</h2>
          <p>Uma versão da cobrinha feita com React e TypeScript, controles para teclado e celular, pontuação e recorde local.</p>
          <a className="button button-primary" href="/laboratorio">Abrir laboratório <span aria-hidden="true">→</span></a>
        </div>
        <div className="lab-preview" aria-hidden="true">
          <span className="preview-food" />
          <span className="preview-snake p1" /><span className="preview-snake p2" /><span className="preview-snake p3" /><span className="preview-snake p4" /><span className="preview-snake p5" />
          <small>SNAKE_01 · REACT + TYPESCRIPT</small>
        </div>
      </section>

      <section className="home-cta shell">
        <p className="section-number">05 / PRÓXIMO PASSO</p>
        <div><h2>Tem uma ideia interessante?</h2><a className="button button-primary" href="/contato">Vamos conversar <span aria-hidden="true">↗</span></a></div>
      </section>
    </main>
  );
}
