import type { Project } from "../../lib/content";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <a className="project-card" href={`/projetos/${project.slug}`}>
      <span className="project-topline">
        <span>{project.index} / {project.category}</span>
        <span aria-hidden="true">↗</span>
      </span>
      <h3>{project.name}</h3>
      <p>{project.shortDescription}</p>
      <ul className="tag-list" aria-label={`Tecnologias de ${project.name}`}>
        {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
    </a>
  );
}
