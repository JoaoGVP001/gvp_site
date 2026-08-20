import type { Metadata } from "next";
import { notes } from "../../lib/content";
import { NotesExplorer } from "../_components/NotesExplorer";
import { PageIntro } from "../_components/PageIntro";

export const metadata: Metadata = {
  title: "Notas",
  description: "Anotações de João Guilherme sobre programação, dados, redes e tecnologia.",
};

export default function NotesPage() {
  const summaries = notes.map(({ sections: _sections, ...note }) => note);
  return (
    <main className="page-main">
      <PageIntro eyebrow="Caderno de estudos" title="Aprender fica melhor quando a gente organiza e compartilha." description="Notas curtas sobre programação, banco de dados, redes e outras coisas que estou estudando. Uma base de conhecimento em constante construção." />
      <NotesExplorer notes={summaries} />
    </main>
  );
}
