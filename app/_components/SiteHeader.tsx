/* eslint-disable @next/next/no-html-link-for-pages -- Navegação completa evita depender do roteador no cliente. */
import { ThemeToggle } from "./ThemeToggle";

const navigation = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Projetos" },
  { href: "/notas", label: "Notas" },
  { href: "/laboratorio", label: "Laboratório" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  return (
    <header className="header-wrap">
      <div className="site-header shell">
        <a className="wordmark" href="/" aria-label="Página inicial de João Guilherme">
          JG<span>.</span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
        </nav>
        <ThemeToggle />
      </div>
      <nav className="mobile-nav shell" aria-label="Navegação principal para celular">
        {navigation.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
      </nav>
    </header>
  );
}
