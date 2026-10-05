import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça João Guilherme, estudante de Ciência da Computação e sua proposta de suporte de TI para pequenas empresas em Concórdia.",
};

const skills = ["Computadores", "Impressoras", "Redes e Wi-Fi", "Backup", "Suporte remoto", "E-mail", "Programas", "Manutenção preventiva"];

export default function AboutPage() {
  return (
    <main className="page-main">
      <PageIntro eyebrow="Sobre mim" title="Tecnologia útil para quem precisa trabalhar." description="Sou estudante de Ciência da Computação. Gosto de entender como as coisas funcionam, organizar problemas e encontrar soluções que ajudem as pessoas a trabalhar." />
      <section className="about-layout shell">
        <div className="about-copy">
          <p className="section-number">MINHA JORNADA</p>
          <h2>Entender o problema. Organizar a solução.</h2>
          <p>Minha formação reúne fundamentos de programação, banco de dados, redes e arquitetura de software. Esse aprendizado me ajuda a analisar problemas e explicar as possibilidades de solução com clareza.</p>
          <p>Minha proposta é ajudar pequenas empresas em Concórdia e região com computadores, impressoras, redes e ferramentas de trabalho. O atendimento começa por ouvir o problema, avaliar o ambiente e combinar uma solução com escopo claro.</p>
        </div>
        <div className="timeline" aria-label="Linha do tempo">
          <article><span>AGORA</span><div><h3>Ciência da Computação</h3><p>Estudando fundamentos de tecnologia para analisar e resolver problemas.</p></div></article>
          <article><span>EM FOCO</span><div><h3>Tecnologia na rotina da empresa</h3><p>Computadores, impressoras, redes e ferramentas de trabalho.</p></div></article>
          <article><span>OBJETIVO</span><div><h3>Evolução contínua</h3><p>Ajudar pequenos negócios a organizar a tecnologia e reduzir interrupções.</p></div></article>
        </div>
      </section>
      <section className="skills-section shell">
        <div><p className="section-number">ÁREAS DE ATENDIMENTO</p><h2>Apoio para as necessidades do seu negócio.</h2></div>
        <ul>{skills.map((skill, index) => <li key={skill}><span>{String(index + 1).padStart(2, "0")}</span>{skill}</li>)}</ul>
      </section>
      <section className="values-grid shell">
        <article><span>01</span><h3>Curiosidade</h3><p>Entender o porquê antes de decidir o como.</p></article>
        <article><span>02</span><h3>Clareza</h3><p>Comunicar ideias e construir soluções que façam sentido.</p></article>
        <article><span>03</span><h3>Constância</h3><p>Melhorar um pouco a cada estudo, entrega e revisão.</p></article>
      </section>
    </main>
  );
}
