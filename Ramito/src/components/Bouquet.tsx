import { useMemo, useRef, useState } from "react";
import { regalo, type AutoConfig } from "../config/regalo";
import { LEAF_MIDRIB, LEAF_PATH, PETAL_PATH } from "../lib/cars";
import HotWheelsPack from "./HotWheelsPack";
import SparkleBurst from "./SparkleBurst";
import HeartsField from "./HeartsField";


const VB_W = 360;
const VB_H = 560;

/** Punto donde se agrupan los tallos (escondido dentro del cono de papel). */
const GATHER = { x: 180, y: 440 };

/** Borde superior del papel (collarín de la envoltura). */
const PAPER_TOP = 292;

/** Altura del cuello: donde el cono se estrecha y se ata el lazo. */
const NECK_Y = 452;

/** Duración total de la animación de entrada (ms). */
export const RAMO_ANIM_MS = 5200;


interface LeafDef {
  x: number;
  y: number;
  rot: number;
  scale: number;
  flip: boolean;
  delay: number;
  dur: number;
}

interface FlowerDef {
  x: number;
  y: number;
  scale: number;
  delay: number;
  dur: number;
}

/** Punto de una cuadrática de Bézier (para colocar hojas sobre el tallo). */
function bezierPoint(
  p0: { x: number; y: number },
  p1: { x: number; y: number },
  p2: { x: number; y: number },
  t: number,
) {
  const mt = 1 - t;
  return {
    x: mt * mt * p0.x + 2 * mt * t * p1.x + t * t * p2.x,
    y: mt * mt * p0.y + 2 * mt * t * p1.y + t * t * p2.y,
  };
}

function buildLeaves(autos: AutoConfig[]): LeafDef[] {
  const leaves: LeafDef[] = [];
  autos.forEach((a, i) => {
    const anchor = { x: a.x, y: a.y };
    const ctrl = {
      x: GATHER.x + (a.x - GATHER.x) * 0.35,
      y: (GATHER.y + a.y) / 2 + 18,
    };
    // Tres hojas por tallo, en zonas visibles por encima del papel
    [0.55, 0.72, 0.85].forEach((t, j) => {
      const p = bezierPoint(GATHER, ctrl, anchor, t);
      if (p.y > PAPER_TOP + 8) return; // escondidas bajo el papel
      const flip = (i + j) % 2 === 0;
      leaves.push({
        x: p.x + (flip ? -6 : 6),
        y: p.y,
        rot: flip ? 195 + (i % 3) * 8 : -15 - (i % 3) * 8,
        scale: 0.85 + ((i + j) % 3) * 0.12,
        flip,
        delay: 1.12 + leaves.length * 0.07,
        dur: 4.4 + ((i * 7 + j * 3) % 5) * 0.6,
      });
    });
  });
  return leaves;
}

function buildFlowers(autos: AutoConfig[]): FlowerDef[] {
  // Flores azules decorativas entre los empaques + un pequeño ramito al centro
  const spots: { x: number; y: number; s: number }[] = [
    { x: 66, y: 196, s: 1 },
    { x: 150, y: 132, s: 0.85 },
    { x: 222, y: 134, s: 0.9 },
    { x: 300, y: 200, s: 1 },
    { x: 108, y: 252, s: 0.95 },
    { x: 252, y: 256, s: 0.9 },
    { x: 180, y: 248, s: 1.05 },
    { x: 42, y: 262, s: 0.8 },
    { x: 320, y: 264, s: 0.8 },
    { x: 122, y: 276, s: 0.75 },
    { x: 238, y: 278, s: 0.72 },
  ];
  // Solo flores por encima del borde del papel (las demás quedarían tapadas)
  return spots
    .filter((s) => s.y < PAPER_TOP - 6)
    .map((s, i) => ({
      x: s.x,
      y: s.y,
      scale: s.s,
      delay: 1.28 + i * 0.075,
      dur: 3.6 + (i % 4) * 0.7,
    }));
}


interface Props {
  /** true cuando la animación de entrada terminó (activa confeti). */
  listo: boolean;
  /** Índice del auto que está rebotando, o null. */
  bouncingIndex: number | null;
  /** Secuencia de rebote para reiniciar la animación en cada toque. */
  bounceSeq: number;
  /** Índice del auto mostrando su nombre, o null. */
  showNameIndex: number | null;
  /** Se llama al tocar un auto (índice, coordenadas de pantalla). */
  onAutoTap: (index: number, clientX: number, clientY: number) => void;
  /** Se llama al tocar cualquier punto del ramo (corazones). */
  onSceneTap: (clientX: number, clientY: number) => void;
}

export default function Bouquet({
  listo,
  bouncingIndex,
  bounceSeq,
  showNameIndex,
  onAutoTap,
  onSceneTap,
}: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const c = regalo.coloresRamo;
  const autos = regalo.autos;

  const leaves = useMemo(() => buildLeaves(autos), [autos]);
  const flowers = useMemo(() => buildFlowers(autos), [autos]);

  const handleScenePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    onSceneTap(e.clientX, e.clientY);
  };

  const handlePackTap = (
    index: number,
    e: React.PointerEvent<HTMLDivElement>,
  ) => {
    e.stopPropagation();
    onAutoTap(index, e.clientX, e.clientY);
  };

  return (
    <div
      ref={sceneRef}
      className="relative h-full w-full"
      onPointerDown={handleScenePointer}
      style={{ touchAction: "manipulation" }}
    >
      {/* Corazones de ambiente dentro de la escena */}
      <HeartsField
        count={11}
        minSize={10}
        maxSize={22}
        dist="-62vh"
        durMin={7}
        durMax={13}
        className="opacity-80"
      />

      {/* Flotación suave del ramo completo */}
      <div className="bouquet-float h-full w-full">
        <div className="relative h-full w-full">
          {/* ===================== SVG DEL RAMO ===================== */}
          <svg
            viewBox={`0 0 ${VB_W} ${VB_H}`}
            className="absolute inset-0 h-full w-full"
            aria-label="Ramo de Hot Wheels"
            role="img"
          >
            <defs>
              {/* Degradados del papel: luz a la izquierda, sombra a la derecha */}
              <linearGradient id="paperBack" x1="0" y1="0.1" x2="1" y2="0.55">
                <stop offset="0%" stopColor={c.papelClaro} />
                <stop offset="50%" stopColor={c.papel} />
                <stop offset="100%" stopColor={c.papelOscuro} />
              </linearGradient>
              <linearGradient id="paperFront" x1="0.05" y1="0" x2="0.95" y2="0.45">
                <stop offset="0%" stopColor={c.papelClaro} />
                <stop offset="58%" stopColor={c.papel} />
                <stop offset="100%" stopColor={c.papel} />
              </linearGradient>
              <linearGradient id="paperShade" x1="0" y1="0" x2="1" y2="0.6">
                <stop offset="0%" stopColor={c.papelOscuro} />
                <stop offset="100%" stopColor={c.papel} />
              </linearGradient>
              {/* Tallo */}
              <linearGradient id="stemGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor={c.talloOscuro} />
                <stop offset="100%" stopColor={c.tallo} />
              </linearGradient>
              {/* Hoja */}
              <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={c.tallo} />
                <stop offset="100%" stopColor={c.talloOscuro} />
              </linearGradient>
              {/* Flor */}
              <linearGradient id="petalGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={c.papelClaro} />
                <stop offset="100%" stopColor={c.flor} />
              </linearGradient>
              {/* Lazo */}
              <linearGradient id="ribbonGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={c.lazoClaro} />
                <stop offset="100%" stopColor={c.lazo} />
              </linearGradient>
              <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#020614" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* Papel */}
            <g
              className="anim-rise"
              style={{ animationDelay: "0.08s", transformBox: "fill-box", transformOrigin: "center" }}
              filter="url(#softShadow)"
            >
              <path
                d="M180,290 C130,292 86,306 58,340 C62,374 98,422 150,456 L128,522 L148,498 L160,532 L170,504 L180,538 L190,504 L200,532 L212,498 L232,522 L210,456 C262,422 298,374 302,340 C274,306 230,292 180,290 Z"
                fill="url(#paperBack)"
              />
              {/* Pliegues del cono */}
              <path
                d="M180,300 C138,324 108,372 120,420"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.4"
                fill="none"
              />
              <path
                d="M180,300 C222,324 252,372 240,420"
                stroke="rgba(0,0,0,0.18)"
                strokeWidth="1.4"
                fill="none"
              />
            </g>

            {/* tallos */}
            <g>
              {autos.map((a, i) => {
                const anchor = { x: a.x, y: a.y };
                const ctrl = {
                  x: GATHER.x + (a.x - GATHER.x) * 0.35,
                  y: (GATHER.y + a.y) / 2 + 18,
                };
                return (
                  <path
                    key={`stem-${i}`}
                    className="anim-draw"
                    d={`M${GATHER.x},${GATHER.y} Q${ctrl.x},${ctrl.y} ${anchor.x},${anchor.y}`}
                    pathLength={1}
                    stroke="url(#stemGrad)"
                    strokeWidth={3.6 - i * 0.12}
                    strokeLinecap="round"
                    fill="none"
                    style={{ animationDelay: `${0.5 + i * 0.055}s` }}
                  />
                );
              })}
            </g>

            {/* hojas */}
            <g>
              {leaves.map((l, i) => (
                <g
                  key={`leaf-${i}`}
                  className="anim-pop"
                  style={{ animationDelay: `${l.delay}s` }}
                >
                  <g
                    transform={`translate(${l.x},${l.y}) rotate(${l.rot}) scale(${l.scale * (l.flip ? -1 : 1)},${l.scale})`}
                  >
                    <g
                      className="sway-subtle"
                      style={{ animationDuration: `${l.dur}s`, animationDelay: `${(i % 5) * 0.4}s` }}
                    >
                      <path d={LEAF_PATH} fill="url(#leafGrad)" stroke={c.talloOscuro} strokeWidth="0.5" />
                      <path d={LEAF_MIDRIB} stroke="rgba(255,255,255,0.35)" strokeWidth="0.7" fill="none" />
                    </g>
                  </g>
                </g>
              ))}
            </g>

            {/* flores */}
            <g>
              {flowers.map((f, i) => (
                <g
                  key={`flower-${i}`}
                  className="anim-pop"
                  style={{ animationDelay: `${f.delay}s` }}
                >
                  <g transform={`translate(${f.x},${f.y}) scale(${f.scale})`}>
                    <g
                      className="sway"
                      style={{
                        animationDuration: `${f.dur}s`,
                        animationDelay: `${(i % 6) * 0.5}s`,
                        transformOrigin: "center",
                      }}
                    >
                      {[0, 72, 144, 216, 288].map((deg) => (
                        <path
                          key={deg}
                          d={PETAL_PATH}
                          fill="url(#petalGrad)"
                          stroke="rgba(255,255,255,0.4)"
                          strokeWidth="0.5"
                          transform={`rotate(${deg})`}
                        />
                      ))}
                      <circle r="4.4" fill={c.centroFlor} />
                      <circle r="2" fill="#FFFFFF" opacity="0.75" />
                    </g>
                  </g>
                </g>
              ))}
            </g>

            {/* papel delantero */}
            <g
              className="anim-rise"
              style={{ animationDelay: "0.16s", transformBox: "fill-box", transformOrigin: "center" }}
              filter="url(#softShadow)"
            >
              {/* cono inferior */}
              <path
                d="M180,306 C140,308 104,320 82,346 C86,372 112,412 154,444 L138,508 L154,488 L164,518 L173,494 L180,524 L187,494 L196,518 L206,488 L222,508 L206,444 C248,412 274,372 278,346 C256,320 220,308 180,306 Z"
                fill="url(#paperFront)"
                opacity="0.97"
              />
              {/* Sombra suave bajo el collarín */}
              <path
                d="M82,346 C104,320 140,308 180,306 C220,308 256,320 278,346 C256,336 220,330 180,328 C140,330 104,336 82,346 Z"
                fill={c.papelOscuro}
                opacity="0.16"
              />
              {/* Ribete doblado del collarín */}
              <path
                d="M82,346 C104,320 140,308 180,306 C220,308 256,320 278,346 C256,330 220,320 180,318 C140,320 104,330 82,346 Z"
                fill={c.papelClaro}
                opacity="0.9"
                stroke="rgba(255,255,255,0.32)"
                strokeWidth="0.8"
              />
              {/* Papel recogido en el cuello */}
              <ellipse cx={GATHER.x} cy={NECK_Y - 6} rx="28" ry="7" fill={c.papelClaro} opacity="0.55" />
            </g>

            {/* Lazo*/}
            <g
              className="anim-pop"
              style={{ animationDelay: "0.55s", transformBox: "fill-box", transformOrigin: "center" }}
            >
              <g transform={`translate(${GATHER.x},${NECK_Y})`}>
                {/* Lazos laterales */}
                <path
                  d="M0,0 C-26,-24 -60,-20 -54,2 C-50,20 -20,20 0,0 Z"
                  fill="url(#ribbonGrad)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
                <path
                  d="M0,0 C26,-24 60,-20 54,2 C50,20 20,20 0,0 Z"
                  fill="url(#ribbonGrad)"
                  stroke="rgba(255,255,255,0.4)"
                  strokeWidth="1"
                />
                {/* Cintas colgando */}
                <path
                  d="M-6,8 C-18,30 -30,46 -42,58 C-28,54 -12,38 -2,14 Z"
                  fill={c.lazo}
                  opacity="0.95"
                />
                <path
                  d="M6,8 C18,30 30,46 42,58 C28,54 12,38 2,14 Z"
                  fill={c.lazo}
                  opacity="0.95"
                />
                {/* Nudo */}
                <ellipse rx="13" ry="10" fill={c.lazoClaro} stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
                <ellipse rx="5" ry="3.6" fill="#FFFFFF" opacity="0.55" />
              </g>
            </g>
          </svg>

          {/* Empaques */}
          {autos.map((a, i) => {
            const packH = a.tamano * (137 / 104);
            return (
              <div
                key={`pack-${i}`}
                className="absolute"
                style={{
                  left: `${(a.x / VB_W) * 100}%`,
                  top: `${((a.y - packH) / VB_H) * 100}%`,
                  width: `${(a.tamano / VB_W) * 100}%`,
                  aspectRatio: "104 / 137",
                  transform: `translateX(-50%) rotate(${a.inclinacion}deg)`,
                  transformOrigin: "50% 100%",
                  zIndex: 10 + Math.round((VB_H - a.y) / 4),
                }}
              >
                <HotWheelsPack
                  auto={a}
                  index={i}
                  entranceDelay={0.9 + i * 0.22}
                  bouncing={bouncingIndex === i}
                  bounceSeq={bounceSeq}
                  showName={showNameIndex === i}
                  onPointerDown={(e) => handlePackTap(i, e)}
                />
              </div>
            );
          })}

          {/* Confeti */}
          {listo && <SparkleBurst xPercent={50} yPercent={40} count={32} />}

          {/* Brillo sobre el ramo */}
          <div
            className="pointer-events-none absolute inset-0 z-30 rounded-[40px] opacity-40"
            style={{
              background:
                "radial-gradient(60% 40% at 50% 22%, rgba(158,201,255,0.16) 0%, transparent 70%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/** Export */
export { VB_W, VB_H, GATHER };
