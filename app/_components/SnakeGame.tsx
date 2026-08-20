"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Point = { x: number; y: number };
type Direction = "up" | "down" | "left" | "right";
type GameStatus = "idle" | "running" | "paused" | "gameover";

const GRID_SIZE = 18;
const INITIAL_SNAKE: Point[] = [
  { x: 8, y: 9 },
  { x: 7, y: 9 },
  { x: 6, y: 9 },
];
const INITIAL_FOOD: Point = { x: 12, y: 9 };

const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const OPPOSITE: Record<Direction, Direction> = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
};

function samePoint(first: Point, second: Point) {
  return first.x === second.x && first.y === second.y;
}

function createFood(snake: Point[]): Point {
  const occupied = new Set(snake.map((point) => `${point.x}-${point.y}`));

  for (let attempt = 0; attempt < 500; attempt += 1) {
    const candidate = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    if (!occupied.has(`${candidate.x}-${candidate.y}`)) return candidate;
  }

  for (let y = 0; y < GRID_SIZE; y += 1) {
    for (let x = 0; x < GRID_SIZE; x += 1) {
      if (!occupied.has(`${x}-${y}`)) return { x, y };
    }
  }

  return INITIAL_FOOD;
}

export function SnakeGame() {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>("right");
  const [status, setStatus] = useState<GameStatus>("idle");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const directionRef = useRef<Direction>("right");
  const turnLockedRef = useRef(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setBest(Number(localStorage.getItem("jg-snake-best")) || 0);
      } catch {
        setBest(0);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const startGame = useCallback(() => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setScore(0);
    setDirection("right");
    directionRef.current = "right";
    turnLockedRef.current = false;
    setStatus("running");
  }, []);

  const changeDirection = useCallback((nextDirection: Direction) => {
    if (status !== "running" && status !== "paused") return;
    if (turnLockedRef.current || OPPOSITE[directionRef.current] === nextDirection) return;

    directionRef.current = nextDirection;
    turnLockedRef.current = true;
    setDirection(nextDirection);
  }, [status]);

  const togglePause = useCallback(() => {
    if (status === "idle" || status === "gameover") {
      startGame();
      return;
    }
    setStatus((current) => current === "running" ? "paused" : "running");
  }, [startGame, status]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const keyDirections: Record<string, Direction> = {
        ArrowUp: "up",
        w: "up",
        W: "up",
        ArrowDown: "down",
        s: "down",
        S: "down",
        ArrowLeft: "left",
        a: "left",
        A: "left",
        ArrowRight: "right",
        d: "right",
        D: "right",
      };

      if (keyDirections[event.key]) {
        event.preventDefault();
        changeDirection(keyDirections[event.key]);
        return;
      }

      if (event.key === " " || event.key === "p" || event.key === "P") {
        event.preventDefault();
        togglePause();
      }

      if (event.key === "r" || event.key === "R") {
        event.preventDefault();
        startGame();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changeDirection, startGame, togglePause]);

  useEffect(() => {
    if (status !== "running") return;

    const speed = Math.max(72, 132 - Math.floor(score / 30) * 8);
    const timer = window.setInterval(() => {
      setSnake((currentSnake) => {
        const vector = VECTORS[directionRef.current];
        const nextHead = {
          x: currentSnake[0].x + vector.x,
          y: currentSnake[0].y + vector.y,
        };
        const ateFood = samePoint(nextHead, food);
        const bodyToCheck = ateFood ? currentSnake : currentSnake.slice(0, -1);
        const hitWall = nextHead.x < 0 || nextHead.x >= GRID_SIZE || nextHead.y < 0 || nextHead.y >= GRID_SIZE;
        const hitBody = bodyToCheck.some((point) => samePoint(point, nextHead));

        if (hitWall || hitBody) {
          setStatus("gameover");
          return currentSnake;
        }

        const nextSnake = [nextHead, ...currentSnake];
        if (ateFood) {
          setFood(createFood(nextSnake));
          setScore((currentScore) => {
            const nextScore = currentScore + 10;
            setBest((currentBest) => {
              const nextBest = Math.max(currentBest, nextScore);
              try {
                localStorage.setItem("jg-snake-best", String(nextBest));
              } catch {
                // O jogo continua mesmo quando o armazenamento está indisponível.
              }
              return nextBest;
            });
            return nextScore;
          });
        } else {
          nextSnake.pop();
        }

        turnLockedRef.current = false;
        return nextSnake;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [food, score, status]);

  const snakeCells = useMemo(() => new Set(snake.map((point) => `${point.x}-${point.y}`)), [snake]);
  const cells = useMemo(() => Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => ({
    x: index % GRID_SIZE,
    y: Math.floor(index / GRID_SIZE),
  })), []);

  const statusText = {
    idle: "Pronto para jogar",
    running: "Em jogo",
    paused: "Jogo pausado",
    gameover: "Fim de jogo",
  }[status];

  return (
    <section className="snake-console" aria-label="Jogo da cobrinha">
      <header className="snake-scoreboard">
        <div><span>PONTOS</span><strong>{String(score).padStart(3, "0")}</strong></div>
        <div><span>RECORDE</span><strong>{String(best).padStart(3, "0")}</strong></div>
        <div className="snake-status"><i className={status} /><span aria-live="polite">{statusText}</span></div>
      </header>

      <div className="snake-stage">
        <div
          className="snake-board"
          role="grid"
          aria-label={`Tabuleiro 18 por 18. Pontuação ${score}.`}
          style={{ "--grid-size": GRID_SIZE } as CSSProperties}
        >
          {cells.map((cell) => {
            const key = `${cell.x}-${cell.y}`;
            const isHead = samePoint(snake[0], cell);
            const isSnake = snakeCells.has(key);
            const isFood = samePoint(food, cell);
            return <span className={`snake-cell${isSnake ? " snake" : ""}${isHead ? " head" : ""}${isFood ? " food" : ""}`} role="gridcell" key={key} />;
          })}
        </div>

        {status !== "running" && (
          <div className="snake-overlay">
            <span>{status === "gameover" ? `Você fez ${score} pontos` : statusText}</span>
            <strong>{status === "paused" ? "Respire. A cobrinha espera." : status === "gameover" ? "Mais uma rodada?" : "Snake_01"}</strong>
            <button type="button" onClick={status === "paused" ? togglePause : startGame}>
              {status === "paused" ? "Continuar" : status === "gameover" ? "Jogar novamente" : "Começar jogo"}
            </button>
          </div>
        )}
      </div>

      <div className="snake-actions">
        <button type="button" onClick={togglePause}>{status === "running" ? "Pausar" : status === "paused" ? "Continuar" : "Começar"}</button>
        <button type="button" onClick={startGame}>Reiniciar</button>
      </div>

      <div className="snake-mobile-controls" aria-label="Controles direcionais">
        <button type="button" onClick={() => changeDirection("up")} aria-label="Mover para cima">↑</button>
        <button type="button" onClick={() => changeDirection("left")} aria-label="Mover para a esquerda">←</button>
        <button type="button" onClick={() => changeDirection("down")} aria-label="Mover para baixo">↓</button>
        <button type="button" onClick={() => changeDirection("right")} aria-label="Mover para a direita">→</button>
      </div>

      <p className="snake-shortcuts"><span>SETAS / WASD</span> mover <span>ESPAÇO / P</span> pausar <span>R</span> reiniciar</p>
      <span className="sr-only" aria-live="polite">Direção atual: {direction}. {statusText}. Pontuação: {score}.</span>
    </section>
  );
}
