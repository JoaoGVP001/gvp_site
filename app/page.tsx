import Link from "next/link";
import { Note, projects, notes } from "../lib/content";
import { ProjectCard } from "./_components/ProjectCard";

function compactDate(note: Note) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(new Date(`${note.date}T00:00:00Z`));
}

export default function Home() {
  return (
    <main>
      <section className="hero shell" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Olá, eu sou João Guilherme</p>
          <h1 id="hero-title">Eu transformo <em>curiosidade</em> em código.</h1>
          <p className="hero-text">Estudante de Ciência da Computação explorando software, dados e novas ideias — um projeto de cada vez.</p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/projetos/bookreadnet">Explorar o BookReadNet <span aria-hidden="true">↗</span></Link>
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
          <Link className="text-link" href="/projetos/bookreadnet">Ver projeto <span aria-hidden="true">→</span></Link>
        </div>
        <div className="project-grid single-project">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</div>
      </section>

      <section className="home-section notes-section shell" aria-labelledby="notes-title">
        <div className="section-heading">
          <div><p className="section-number">02 / CADERNO</p><h2 id="notes-title">O que tenho aprendido.</h2></div>
          <Link className="text-link" href="/notas">Abrir caderno <span aria-hidden="true">→</span></Link>
        </div>
        <div className="note-list">
          {notes.slice(0, 3).map((note) => (
            <Link href={`/notas/${note.slug}`} className="note-row" key={note.slug}>
              <span className="note-topic">{note.category}</span><strong>{note.title}</strong><time>{compactDate(note)}</time><span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-laboratory shell" aria-labelledby="laboratory-title">
        <div>
          <p className="section-number">03 / LABORATÓRIO</p>
          <h2 id="laboratory-title">Código que você pode jogar.</h2>
          <p>Uma versão da cobrinha feita com React e TypeScript, controles para teclado e celular, pontuação e recorde local.</p>
          <Link className="button button-primary" href="/laboratorio">Abrir laboratório <span aria-hidden="true">→</span></Link>
        </div>
        <div className="lab-preview" aria-hidden="true">
          <span className="preview-food" />
          <span className="preview-snake p1" /><span className="preview-snake p2" /><span className="preview-snake p3" /><span className="preview-snake p4" /><span className="preview-snake p5" />
          <small>SNAKE_01 · REACT + TYPESCRIPT</small>
        </div>
      </section>

      <section className="home-cta shell">
        <p className="section-number">04 / PRÓXIMO PASSO</p>
        <div><h2>Tem uma ideia interessante?</h2><Link className="button button-primary" href="/contato">Vamos conversar <span aria-hidden="true">↗</span></Link></div>
      </section>
    </main>
  );
}
