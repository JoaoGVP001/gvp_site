/* eslint-disable @next/next/no-html-link-for-pages -- Navegação completa evita depender do roteador no cliente. */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatDate, getNote, notes } from "../../../lib/content";

type NotePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: NotePageProps): Promise<Metadata> {
  const note = getNote((await params).slug);
  if (!note) return { title: "Nota não encontrada" };
  return {
    title: note.title,
    description: note.excerpt,
    openGraph: { title: note.title, description: note.excerpt, images: [] },
    twitter: { title: note.title, description: note.excerpt, images: [] },
  };
}

export default async function NoteDetailPage({ params }: NotePageProps) {
  const note = getNote((await params).slug);
  if (!note) notFound();
  return (
    <main className="article-page shell">
      <a className="back-link" href="/notas">← Voltar para as notas</a>
      <header className="article-header">
        <p className="eyebrow"><span /> {note.category}</p>
        <h1>{note.title}</h1>
        <p>{note.excerpt}</p>
        <div><time dateTime={note.date}>{formatDate(note.date)}</time><span>{note.readingTime} de leitura</span></div>
      </header>
      <div className="article-layout">
        <aside><span>NESTA NOTA</span>{note.sections.map((section, index) => <a href={`#secao-${index + 1}`} key={section.heading}>{String(index + 1).padStart(2, "0")} {section.heading}</a>)}</aside>
        <article className="article-body">
          {note.sections.map((section, index) => (
            <section id={`secao-${index + 1}`} key={section.heading}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.code && <pre><code>{section.code}</code></pre>}
            </section>
          ))}
        </article>
      </div>
      <footer className="article-footer">
        <ul>{note.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
        <a href="/notas">Continuar explorando o caderno →</a>
      </footer>
    </main>
  );
}
