"use client";

import { useMemo, useState } from "react";
import type { Note } from "../../lib/content";

type NoteSummary = Pick<Note, "slug" | "title" | "excerpt" | "category" | "date" | "readingTime" | "tags">;

export function NotesExplorer({ notes }: { notes: NoteSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const categories = ["Todas", ...Array.from(new Set(notes.map((note) => note.category)))];

  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("pt-BR");
    return notes.filter((note) => {
      const matchesCategory = category === "Todas" || note.category === category;
      const searchable = [note.title, note.excerpt, note.category, ...note.tags].join(" ").toLocaleLowerCase("pt-BR");
      return matchesCategory && searchable.includes(normalized);
    });
  }, [category, notes, query]);

  return (
    <div className="notes-explorer shell">
      <div className="search-panel">
        <label htmlFor="note-search">Pesquisar no caderno</label>
        <div className="search-field">
          <span aria-hidden="true">⌕</span>
          <input id="note-search" type="search" placeholder="Ex.: PostgreSQL, Git, POO..." value={query} onChange={(event) => setQuery(event.target.value)} />
        </div>
        <div className="filter-list" aria-label="Filtrar por categoria">
          {categories.map((item) => (
            <button className={item === category ? "selected" : ""} type="button" onClick={() => setCategory(item)} key={item}>{item}</button>
          ))}
        </div>
      </div>

      <p className="result-count">{filtered.length} {filtered.length === 1 ? "anotação encontrada" : "anotações encontradas"}</p>
      <div className="notes-grid">
        {filtered.map((note) => (
          <a className="note-card" href={`/notas/${note.slug}`} key={note.slug}>
            <div><span>{note.category}</span><time>{note.readingTime}</time></div>
            <h2>{note.title}</h2>
            <p>{note.excerpt}</p>
            <ul>{note.tags.map((tag) => <li key={tag}>#{tag}</li>)}</ul>
            <strong>Ler anotação <span aria-hidden="true">→</span></strong>
          </a>
        ))}
      </div>
      {filtered.length === 0 && <p className="empty-state">Nada por aqui ainda. Tente outro termo ou categoria.</p>}
    </div>
  );
}
