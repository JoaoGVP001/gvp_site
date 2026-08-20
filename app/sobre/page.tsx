import type { Metadata } from "next";
import { PageIntro } from "../_components/PageIntro";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheça a formação, os interesses e os objetivos de João Guilherme.",
};

const skills = ["Next.js", "React", "TypeScript", "Python", "PostgreSQL", "Flutter", "Git", "Linux"];

export default function AboutPage() {
  return (
    <main className="page-main">
      <PageIntro eyebrow="Sobre mim" title="Tecnologia é onde minha curiosidade ganha forma." description="Sou estudante de Ciência da Computação. Gosto de entender como as coisas funcionam, organizar problemas complexos e transformar aprendizado em projetos que podem ser usados." />
      <section className="about-layout shell">
        <div className="about-copy">
          <p className="section-number">MINHA JORNADA</p>
          <h2>Aprender, construir, compartilhar.</h2>
          <p>Minha formação reúne fundamentos de programação, banco de dados, redes e arquitetura de software. Fora da sala de aula, aprofundo esses temas criando aplicações e registrando o que descubro.</p>
          <p>Tenho interesse especial por produtos web, backend e dados. Busco oportunidades em que eu possa aprender com pessoas experientes, contribuir com atenção aos detalhes e assumir desafios cada vez maiores.</p>
        </div>
        <div className="timeline" aria-label="Linha do tempo">
          <article><span>AGORA</span><div><h3>Ciência da Computação</h3><p>Construindo fundamentos sólidos e projetos práticos.</p></div></article>
          <article><span>EM FOCO</span><div><h3>Web, dados e mobile</h3><p>Explorando soluções completas, da interface à persistência.</p></div></article>
          <article><span>OBJETIVO</span><div><h3>Evolução contínua</h3><p>Transformar conhecimento em software útil e bem pensado.</p></div></article>
        </div>
      </section>
      <section className="skills-section shell">
        <div><p className="section-number">TECNOLOGIAS</p><h2>Ferramentas que fazem parte do caminho.</h2></div>
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
