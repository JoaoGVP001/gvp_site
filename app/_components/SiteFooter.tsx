/* eslint-disable @next/next/no-html-link-for-pages -- Navegação completa evita depender do roteador no cliente. */
export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div>
        <a className="wordmark" href="/">JG<span>.</span></a>
        <p>Suporte de TI para pequenas empresas em Concórdia e região.</p>
      </div>
      <div className="footer-links" aria-label="Links e contato">
        <a href="https://www.linkedin.com/in/jo%C3%A3o-vargas-7ba1b836b" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="https://www.instagram.com/joao.gvp_/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href="/notas">Notas →</a><a href="/laboratorio">Laboratório →</a><a href="/contato">Contato →</a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} João Guilherme</p>
    </footer>
  );
}
