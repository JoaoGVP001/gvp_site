import type { Metadata } from "next";
import { SnakeGame } from "../_components/SnakeGame";

export const metadata: Metadata = {
  title: "Laboratório",
  description: "Experimentos interativos de João Guilherme feitos com React e TypeScript.",
};

export default function LaboratoryPage() {
  return (
    <main className="laboratory-page shell">
      <section className="laboratory-intro">
        <p className="eyebrow"><span /> Laboratório 01</p>
        <h1>Lógica também pode ser <em>diversão.</em></h1>
        <p>Um experimento interativo feito com React e TypeScript para demonstrar gerenciamento de estado, eventos, lógica de jogo e interfaces responsivas.</p>
      </section>
      <div className="laboratory-layout">
        <SnakeGame />
        <aside className="laboratory-notes">
          <p className="section-number">POR TRÁS DO JOGO</p>
          <h2>Uma cobrinha, vários conceitos.</h2>
          <ol>
            <li><span>01</span><div><strong>Estado em tempo real</strong><p>Posição, direção, comida, pontuação e fases do jogo controladas pelo React.</p></div></li>
            <li><span>02</span><div><strong>Lógica e colisões</strong><p>Regras para movimento, crescimento, paredes e contato com o próprio corpo.</p></div></li>
            <li><span>03</span><div><strong>Experiência responsiva</strong><p>Teclado no computador e botões direcionais para jogar pelo celular.</p></div></li>
            <li><span>04</span><div><strong>Persistência local</strong><p>O melhor resultado fica salvo no navegador para a próxima visita.</p></div></li>
          </ol>
        </aside>
      </div>
    </main>
  );
}
