import type { Metadata } from "next";
import { projects } from "../../lib/content";
import { PageIntro } from "../_components/PageIntro";
import { ProjectCard } from "../_components/ProjectCard";

export const metadata: Metadata = {
  title: "Projetos",
  description: "Conheça o BookReadNet, projeto desenvolvido por João Guilherme.",
};

export default function ProjectsPage() {
  return (
    <main className="page-main">
      <PageIntro eyebrow="Projeto" title="Uma ideia que saiu do caderno e virou código." description="O BookReadNet é minha oportunidade de experimentar tecnologias, tomar decisões e aprender com todo o processo de criação de um produto digital." />
      <section className="catalog-heading shell"><p>{projects.length} projeto selecionado</p><span>2026 — agora</span></section>
      <section className="project-grid project-catalog shell">{projects.map((project) => <ProjectCard project={project} key={project.slug} />)}</section>
    </main>
  );
}
