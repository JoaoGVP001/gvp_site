"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.dataset.theme === "dark");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("jg-theme", next ? "dark" : "light");
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Ativar tema ${dark ? "claro" : "escuro"}`}>
      <span aria-hidden="true">{dark ? "☀" : "☾"}</span>
      <span className="theme-label">{dark ? "Claro" : "Escuro"}</span>
    </button>
  );
}
