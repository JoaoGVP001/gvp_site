/* eslint-disable @next/next/no-html-link-for-pages -- Navegação completa evita depender do roteador no cliente. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "../../../lib/content";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return { title: "Projeto não encontrado" };
  return {
    title: project.name,
    description: project.description,
    openGraph: { title: project.name, description: project.description, images: [] },
    twitter: { title: project.name, description: project.description, images: [] },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();
  return (
    <main className="detail-page shell">
      <a className="back-link" href="/projetos">← Voltar para projetos</a>
      <header className="detail-hero">
        <div><p className="eyebrow"><span /> {project.category}</p><h1>{project.name}</h1><p>{project.description}</p></div>
        <span className="project-index">{project.index}</span>
      </header>
      <div className="detail-meta">
        <div><span>Status</span><strong>{project.status}</strong></div>
        <div><span>Ano</span><strong>{project.year}</strong></div>
        <div><span>Tecnologias</span><strong>{project.tags.join(" · ")}</strong></div>
        <a href={project.github} target="_blank" rel="noreferrer">Ver no GitHub ↗</a>
      </div>
      <section className="project-story">
        <article><p className="section-number">01 / DESAFIO</p><h2>O problema a resolver.</h2><p>{project.challenge}</p></article>
        <article><p className="section-number">02 / CAMINHO</p><h2>A solução desenhada.</h2><p>{project.solution}</p></article>
      </section>
      <section className="highlight-section">
        <p className="section-number">03 / DESTAQUES</p>
        <ol>{project.highlights.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</li>)}</ol>
      </section>
      <nav className="detail-next" aria-label="Navegação entre projetos"><a href="/projetos">Conhecer os outros projetos <span>→</span></a></nav>
    </main>
  );
}
