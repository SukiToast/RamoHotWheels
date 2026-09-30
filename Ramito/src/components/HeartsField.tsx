import { useMemo } from "react";
import { CAR_SHAPES, HEART_PATH } from "../lib/cars";

/** Icono de corazón reutilizable */
export function HeartIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-full w-full ${className}`}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d={HEART_PATH} />
    </svg>
  );
}

interface Props {
  count?: number;
  className?: string;
  minSize?: number;
  maxSize?: number;
  dist?: string;
  durMin?: number;
  durMax?: number;
  colors?: string[];
}

const PALETTE = [
  "#FF7BA9",
  "#5EB0FF",
  "#FFFFFF",
  "#FFB3CC",
  "#FFD86B",
];

/** Capa de corazones flotando lentamente */
export default function HeartsField({
  count = 14,
  className = "",
  minSize = 12,
  maxSize = 30,
  dist = "-110vh",
  durMin = 10,
  durMax = 20,
  colors = PALETTE,
}: Props) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        bottom: -6 - Math.random() * 16,
        size: minSize + Math.random() * (maxSize - minSize),
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.random() * 90 - 45,
        dur: durMin + Math.random() * (durMax - durMin),
        delay: -Math.random() * durMax,
      })),
    [count, minSize, maxSize, durMin, durMax, colors],
  );

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {hearts.map((h, i) => (
        <span
          key={i}
          className="heart-float absolute"
          style={{
            left: `${h.left}%`,
            bottom: `${h.bottom}%`,
            width: h.size,
            height: h.size,
            color: h.color,
            ["--dx" as string]: `${h.dx}px`,
            ["--dist" as string]: dist,
            animationDuration: `${h.dur}s`,
            animationDelay: `${h.delay}s`,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-full w-full"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={HEART_PATH} />
          </svg>
        </span>
      ))}
    </div>
  );
}

/** Estrellas parpadeando en el fondo */
export function StarField({ count = 16 }: { count?: number }) {
  const stars = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        top: Math.random() * 85,
        size: 2 + Math.random() * 2.6,
        dur: 2.4 + Math.random() * 2.8,
        delay: Math.random() * 4,
      })),
    [count],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    >
      {stars.map((s, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite`,
            boxShadow: "0 0 6px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}

/** Autos de fondo */
export function CarSilhouettes() {
  const cars = useMemo(
    () => [
      {
        tipo: "deportivo" as const,
        top: "12%",
        dur: 56,
        delay: -6,
        opacity: 0.07,
        width: 190,
      },
      {
        tipo: "muscle" as const,
        top: "30%",
        dur: 74,
        delay: -22,
        opacity: 0.05,
        width: 230,
      },
      {
        tipo: "clasico" as const,
        top: "48%",
        dur: 64,
        delay: -40,
        opacity: 0.06,
        width: 170,
      },
      {
        tipo: "deportivo" as const,
        top: "64%",
        dur: 82,
        delay: -12,
        opacity: 0.05,
        width: 210,
      },
      {
        tipo: "muscle" as const,
        top: "78%",
        dur: 70,
        delay: -50,
        opacity: 0.06,
        width: 180,
      },
    ],
    [],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {cars.map((c, i) => (
        <svg
          key={i}
          viewBox="0 0 64 26"
          className="absolute left-0"
          style={{
            top: c.top,
            width: c.width,
            opacity: c.opacity,
            animation: `drift-right ${c.dur}s linear ${c.delay}s infinite`,
            filter: "drop-shadow(0 0 10px rgba(94,168,255,0.5))",
          }}
          aria-hidden="true"
        >
          <path d={CAR_SHAPES[c.tipo].body} fill="#9EC9FF" />
        </svg>
      ))}
    </div>
  );
}
