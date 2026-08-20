import Link from "next/link";
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
        <Link className="wordmark" href="/" aria-label="Página inicial de João Guilherme">
          JG<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </nav>
        <ThemeToggle />
      </div>
      <nav className="mobile-nav shell" aria-label="Navegação principal para celular">
        {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
      </nav>
    </header>
  );
}
