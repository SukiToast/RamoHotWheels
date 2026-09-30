import { useCallback, useEffect, useRef, useState } from "react";
import Background from "./components/Background";
import Bouquet, { RAMO_ANIM_MS } from "./components/Bouquet";
import { HeartIcon } from "./components/HeartsField";
import IntroScreen from "./components/screens/IntroScreen";
import MessageOverlay from "./components/screens/MessageOverlay";
import FinalScreen from "./components/screens/FinalScreen";

type Etapa = "intro" | "regalo" | "mensaje" | "final";

interface HeartBurstItem {
  ox: number;
  oy: number;
  dx: number;
  rise: number;
  size: number;
  color: string;
  delay: number;
}

interface Chispa {
  id: number;
  x: number;
  y: number;
  hearts: HeartBurstItem[];
}

const HEART_COLORS = ["#FF7BA9", "#5EB0FF", "#FFFFFF", "#FFB3CC", "#FFD86B"];

/** Tamaño de la escena del ramo. */
const SCENE_STYLE: React.CSSProperties = {
  width: "min(92vw, 400px, 41vh)",
  aspectRatio: "360 / 560",
};

export default function App() {
  const [etapa, setEtapa] = useState<Etapa>("intro");
  const [runId, setRunId] = useState(0);
  const [listo, setListo] = useState(false);
  const [bouncingIndex, setBouncingIndex] = useState<number | null>(null);
  const [bounceSeq, setBounceSeq] = useState(0);
  const [showNameIndex, setShowNameIndex] = useState<number | null>(null);
  const [chispas, setChispas] = useState<Chispa[]>([]);

  const animTimerRef = useRef<number | null>(null);
  const bounceTimerRef = useRef<number | null>(null);
  const chispaSeq = useRef(0);

  // Limpieza global de temporizadores
  useEffect(() => {
    return () => {
      if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
      if (bounceTimerRef.current) window.clearTimeout(bounceTimerRef.current);
    };
  }, []);

  // Temporizador de la animación de entrada del ramo
  useEffect(() => {
    if (etapa !== "regalo") return;
    setListo(false);
    setBouncingIndex(null);
    setShowNameIndex(null);
    animTimerRef.current = window.setTimeout(() => setListo(true), RAMO_ANIM_MS);
    return () => {
      if (animTimerRef.current) window.clearTimeout(animTimerRef.current);
    };
  }, [etapa, runId]);

  /** Suelta una ráfaga de corazones en coordenadas de pantalla. */
  const soltarCorazones = useCallback((x: number, y: number, n: number) => {
    const id = ++chispaSeq.current;
    const hearts: HeartBurstItem[] = Array.from({ length: n }, () => ({
      ox: Math.random() * 44 - 22,
      oy: Math.random() * 44 - 22,
      dx: Math.random() * 84 - 42,
      rise: 46 + Math.random() * 72,
      size: 12 + Math.random() * 15,
      color: HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)],
      delay: Math.random() * 0.12,
    }));
    setChispas((prev) => [...prev.slice(-6), { id, x, y, hearts }]);
    window.setTimeout(() => {
      setChispas((prev) => prev.filter((c) => c.id !== id));
    }, 1800);
  }, []);

  /** PANTALLA 1 → 2/3: abrir el regalo. */
  const abrirRegalo = useCallback(
    (x: number, y: number) => {
      soltarCorazones(x, y, 12);
      setRunId((r) => r + 1);
      setEtapa("regalo");
    },
    [soltarCorazones],
  );

  /** Tocar un auto: rebote + nombre + brillo + corazones. */
  const handleAutoTap = useCallback(
    (index: number, x: number, y: number) => {
      if (bounceTimerRef.current) window.clearTimeout(bounceTimerRef.current);
      setBouncingIndex(index);
      setBounceSeq((s) => s + 1);
      setShowNameIndex(index);
      soltarCorazones(x, y, 7);
      bounceTimerRef.current = window.setTimeout(() => {
        setBouncingIndex(null);
        setShowNameIndex(null);
      }, 1950);
    },
    [soltarCorazones],
  );

  /** Tocar cualquier punto del ramo: corazones pequeños. */
  const handleSceneTap = useCallback(
    (x: number, y: number) => {
      soltarCorazones(x, y, 4);
    },
    [soltarCorazones],
  );

  /** PANTALLA 5 → 3: volver a ver el ramo */
  const replay = useCallback(() => {
    setRunId((r) => r + 1);
    setEtapa("regalo");
  }, []);

  return (
    <main className="screen relative w-full overflow-hidden">
      <Background />

      {/* Intro*/}
      {etapa === "intro" && <IntroScreen key="intro" onOpen={abrirRegalo} />}

      {/* ---------- PANTALLAS 2-3: RAMO ---------- */}
      {(etapa === "regalo" || etapa === "mensaje") && (
        <div
          key={`escena-${runId}`}
          className="screen relative flex flex-col items-center justify-center gap-5 px-4 py-5"
        >
          <div style={SCENE_STYLE} className="relative shrink-0">
            <Bouquet
              key={`ramo-${runId}`}
              listo={listo}
              bouncingIndex={bouncingIndex}
              bounceSeq={bounceSeq}
              showNameIndex={showNameIndex}
              onAutoTap={handleAutoTap}
              onSceneTap={handleSceneTap}
            />
          </div>

          {/* Pista + botón (aparecen cuando termina la animación) */}
          <div
            className={`flex flex-col items-center gap-3.5 transition-all duration-700 ${
              listo ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
            }`}
          >
            <p className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-center text-[11px] font-medium text-blue-100/85 backdrop-blur-md sm:text-xs">
              👆 Toca los autos — cada uno tiene su nombre
            </p>
            <button
              type="button"
              onClick={() => setEtapa("mensaje")}
              className="btn-gift btn-shimmer rounded-full px-8 py-4 text-base font-extrabold text-white"
            >
              <span className="relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                💙 Leer mensaje
              </span>
            </button>
          </div>
        </div>
      )}

      {/* ---------- PANTALLA 4: MENSAJE ---------- */}
      {etapa === "mensaje" && (
        <MessageOverlay onContinue={() => setEtapa("final")} />
      )}

      {/* ---------- PANTALLA 5: FINAL ---------- */}
      {etapa === "final" && <FinalScreen key="final" onReplay={replay} />}

      {/* ---------- CAPA GLOBAL DE CORAZONES AL TOCAR ---------- */}
      <div className="pointer-events-none fixed inset-0 z-[60]">
        {chispas.map((c) => (
          <div key={c.id}>
            {c.hearts.map((h, i) => (
              <span
                key={i}
                className="heart-burst absolute"
                style={{
                  left: c.x + h.ox,
                  top: c.y + h.oy,
                  width: h.size,
                  height: h.size,
                  color: h.color,
                  ["--dx" as string]: `${h.dx}px`,
                  ["--rise" as string]: `${h.rise}px`,
                  animationDelay: `${h.delay}s`,
                }}
              >
                <HeartIcon />
              </span>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}
