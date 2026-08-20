export function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div>
        <a className="wordmark" href="/">JG<span>.</span></a>
        <p>Desenvolvendo ideias e aprendendo em público.</p>
      </div>
      <div className="footer-links" aria-label="Links pessoais">
        <a href="https://github.com/JoaoGVP001" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="https://www.linkedin.com/in/jo%C3%A3o-vargas-7ba1b836b" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        <a href="https://www.instagram.com/joao.gvp_/" target="_blank" rel="noreferrer">Instagram ↗</a>
        <a href="/contato">Contato →</a>
      </div>
      <p className="copyright">© {new Date().getFullYear()} João Guilherme</p>
    </footer>
  );
}
