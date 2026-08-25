import type { Metadata } from "next";
import { notes } from "../../lib/content";
import { NotesExplorer } from "../_components/NotesExplorer";
import { PageIntro } from "../_components/PageIntro";

export const metadata: Metadata = {
  title: "Notas",
  description: "Anotações de João Guilherme sobre programação, dados, redes e tecnologia.",
};

export default function NotesPage() {
  const summaries = notes.map((note) => ({
    slug: note.slug,
    title: note.title,
    excerpt: note.excerpt,
    category: note.category,
    date: note.date,
    readingTime: note.readingTime,
    tags: note.tags,
  }));
  return (
    <main className="page-main">
      <PageIntro eyebrow="Caderno de estudos" title="Aprender fica melhor quando a gente organiza e compartilha." description="Notas curtas sobre programação, banco de dados, redes e outras coisas que estou estudando. Uma base de conhecimento em constante construção." />
      <NotesExplorer notes={summaries} />
    </main>
  );
}
