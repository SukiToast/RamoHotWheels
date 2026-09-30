import { useMemo } from "react";
import { HEART_PATH, SPARK_PATH } from "../lib/cars";

interface Piece {
  kind: "heart" | "star" | "confetti";
  dx: number;
  dy: number;
  rot: number;
  delay: number;
  color: string;
  size: number;
}

interface Props {
  /** Posición horizontal del centro del estallido. */
  xPercent?: number;
  /** Posición vertical del centro del estallido. */
  yPercent?: number;
  count?: number;
  colors?: string[];
}

const PALETTE = ["#FF7BA9", "#5EB0FF", "#FFFFFF", "#FFD86B", "#FFB3CC", "#9EC9FF"];

/** Efecto de brillo + confeti. */
export default function SparkleBurst({
  xPercent = 50,
  yPercent = 46,
  count = 30,
  colors = PALETTE,
}: Props) {
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const dist = 70 + Math.random() * 120;
        return {
          kind: i % 5 === 0 ? "heart" : i % 3 === 0 ? "confetti" : "star",
          dx: Math.cos(angle) * dist,
          dy: Math.sin(angle) * dist - 26,
          rot: Math.random() * 520 - 260,
          delay: Math.random() * 0.28,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: 8 + Math.random() * 14,
        };
      }),
    [count, colors],
  );

  return (
    <div
      className="pointer-events-none absolute z-20"
      style={{ left: `${xPercent}%`, top: `${yPercent}%` }}
      aria-hidden="true"
    >
      <div
        className="spark-flash absolute rounded-full"
        style={{
          width: 220,
          height: 220,
          background:
            "radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(158,201,255,0.4) 35%, transparent 70%)",
        }}
      />
      <div
        className="spark-ring absolute rounded-full border-2"
        style={{
          width: 130,
          height: 130,
          borderColor: "rgba(255,214,107,0.75)",
        }}
      />
      <div
        className="spark-ring absolute rounded-full border"
        style={{
          width: 90,
          height: 90,
          borderColor: "rgba(255,123,169,0.7)",
          animationDelay: "0.12s",
        }}
      />
      {pieces.map((p, i) => (
        <span
          key={i}
          className="spark-piece absolute left-0 top-0"
          style={{
            color: p.color,
            width: p.size,
            height: p.size,
            ["--dx" as string]: `${p.dx}px`,
            ["--dy" as string]: `${p.dy}px`,
            ["--rot" as string]: `${p.rot}deg`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.kind === "heart" ? (
            <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
              <path d={HEART_PATH} />
            </svg>
          ) : p.kind === "star" ? (
            <svg viewBox="0 0 24 24" className="h-full w-full" fill="currentColor">
              <path d={SPARK_PATH} />
            </svg>
          ) : (
            <span
              className="block h-full w-full rounded-[3px]"
              style={{ background: p.color }}
            />
          )}
        </span>
      ))}
    </div>
  );
}
