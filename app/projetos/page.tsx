import type { Metadata } from "next";
import { projects } from "../../lib/content";
import { PageIntro } from "../_components/PageIntro";
import { ProjectCard } from "../_components/ProjectCard";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Projetos de software, dados e aplicações desenvolvidos por João Guilherme.",
};

export default function ProjectsPage() {
  return (
    <main className="page-main">
      <PageIntro eyebrow="Projetos" title="Ideias que saíram do caderno e viraram código." description="Uma seleção de projetos acadêmicos e pessoais. Cada um é uma oportunidade de experimentar tecnologias, tomar decisões e aprender com o processo." />
      <section className="catalog-heading shell"><p>{projects.length} projetos selecionados</p><span>2026 — agora</span></section>
      <section className="project-grid project-catalog shell">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</section>
    </main>
  );
}
