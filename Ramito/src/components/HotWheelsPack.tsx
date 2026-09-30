import { useMemo, useState } from "react";
import type { PointerEvent } from "react";
import { CAR_SHAPES } from "../lib/cars";
import type { AutoConfig } from "../config/regalo";

interface Props {
  auto: AutoConfig;
  index: number;
  entranceDelay: number;
  bouncing: boolean;
  bounceSeq: number;
  showName: boolean;
  onPointerDown: (e: PointerEvent<HTMLDivElement>) => void;
}

export default function HotWheelsPack({
  auto,
  index,
  entranceDelay,
  bouncing,
  bounceSeq,
  showName,
  onPointerDown,
}: Props) {
  const uid = useIdSafe();
  const [imgError, setImgError] = useState(false);

  const showSvg = !auto.imagen || imgError;

  const tiltExtra = auto.inclinacion >= 0 ? "7deg" : "-7deg";

  const bounceAnim = bouncing
    ? bounceSeq % 2 === 0
      ? "pack-bounce"
      : "pack-bounce-2"
    : "";

  return (
    <>
      {/* Tooltip del nombre */}
      <div
        className="pointer-events-none absolute bottom-[101%] left-1/2 z-30"
        style={{
          transform: `translateX(-50%) rotate(${-auto.inclinacion}deg)`,
        }}
      >
        <div
          key={`tip-${showName ? "on" : "off"}-${index}`}
          className={`whitespace-nowrap rounded-full border border-white/30 bg-[#0B1B3F]/85 px-3 py-1 font-semibold tracking-wide text-white shadow-lg backdrop-blur-md ${
            showName ? "tooltip-pop" : "opacity-0"
          }`}
          style={{
            fontSize: "clamp(10px, 2.6vw, 13px)",
          }}
        >
          🚗 {auto.nombre}
        </div>
      </div>

      {/* Animación entrada */}
      <div
        className="anim-pack-in h-full w-full"
        style={{
          animationDelay: `${entranceDelay}s`,
          ["--tilt-extra" as string]: tiltExtra,
        }}
      >
        {/* Rebote */}
        <div
          key={bouncing ? `bounce-${bounceSeq}` : `bounce-idle-${index}`}
          className={`h-full w-full ${bounceAnim}`}
        >

          {/* Empaque */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`Hot Wheels ${auto.nombre}`}
            onPointerDown={onPointerDown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onPointerDown(
                  e as unknown as PointerEvent<HTMLDivElement>,
                );
              }
            }}
            className={`pack-shine relative h-full w-full cursor-pointer overflow-hidden rounded-[7px] select-none ring-1 ring-white/25 ${
              showName ? "pack-shine-active" : ""
            }`}
            style={{
              ["--glint-delay" as string]: `${entranceDelay + 0.62}s`,
              filter:
                "drop-shadow(0 10px 14px rgba(2,8,30,0.55))",
              touchAction: "manipulation",
            }}
          >
            {showSvg ? (
              <PackSVG
                auto={auto}
                index={index}
                uid={uid}
              />
            ) : (
              <img
                src={auto.imagen}
                alt={auto.nombre}
                className="h-full w-full object-cover"
                draggable={false}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
        <div
          key={bouncing ? `bounce-${bounceSeq}` : `bounce-idle-${index}`}
          className={`h-full w-full ${bounceAnim ?? ""}`}
        >
          {/* Empaque */}
          <div
            role="button"
            tabIndex={0}
            aria-label={`Hot Wheels ${auto.nombre}`}
            onPointerDown={onPointerDown}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                onPointerDown(
                  e as unknown as PointerEvent<HTMLDivElement>,
                );
              }
            }}
            className={`pack-shine relative h-full w-full cursor-pointer overflow-hidden rounded-[7px] select-none ring-1 ring-white/25 ${
              showName ? "pack-shine-active" : ""
            }`}
            style={{
              ["--glint-delay" as string]: `${entranceDelay + 0.62}s`,
              filter: "drop-shadow(0 10px 14px rgba(2,8,30,0.55))",
              touchAction: "manipulation",
            }}
          >
            {showSvg ? (
              <PackSVG auto={auto} index={index} uid={uid} />
            ) : (
              <img
                src={auto.imagen}
                alt={auto.nombre}
                className="h-full w-full object-cover"
                draggable={false}
                onError={() => setImgError(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Genera un id seguro para evitar conflictos
 * entre gradientes SVG repetidos.
 */
function useIdSafe() {
  const raw = useMemo(
    () => `hw${Math.random().toString(36).slice(2, 9)}`,
    [],
  );

  return raw;
}

/**
 * Dibujo completo del empaque Hot Wheels en SVG.
 */
function PackSVG({
  auto,
  index,
  uid,
}: {
  auto: AutoConfig;
  index: number;
  uid: string;
}) {
  const tipo = auto.tipo ?? "deportivo";
  const shape = CAR_SHAPES[tipo];

  const cardId = `card-${uid}`;
  const carId = `car-${uid}`;
  const blisterId = `blister-${uid}`;

  return (
    <svg
      viewBox="0 0 104 137"
      className="h-full w-full"
      aria-hidden="true"
    >
            <defs>
        <linearGradient id={cardId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={auto.color1} />
          <stop offset="100%" stopColor={auto.color2} />
        </linearGradient>

        <linearGradient id={carId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={auto.colorAuto} />
          <stop offset="55%" stopColor={auto.colorAuto} />
          <stop
            offset="100%"
            stopColor="#000000"
            stopOpacity="0.45"
          />
        </linearGradient>

        <linearGradient id={blisterId} x1="0" y1="0" x2="1" y2="1">
          <stop
            offset="0%"
            stopColor="#FFFFFF"
            stopOpacity="0.32"
          />
          <stop
            offset="45%"
            stopColor="#FFFFFF"
            stopOpacity="0.1"
          />
          <stop
            offset="100%"
            stopColor="#FFFFFF"
            stopOpacity="0.22"
          />
        </linearGradient>

        <linearGradient
          id={`flame-${uid}`}
          x1="0"
          y1="0"
          x2="1"
          y2="1"
        >
          <stop offset="0%" stopColor="#FFD24A" />
          <stop offset="55%" stopColor="#FF8A1F" />
          <stop offset="100%" stopColor="#F43F1B" />
        </linearGradient>
      </defs>

      {/* Tarjeta del empaque */}
      <rect
        x="1.6"
        y="1.6"
        width="100.8"
        height="133.8"
        rx="7"
        fill={`url(#${cardId})`}
      />

      <rect
        x="1.6"
        y="1.6"
        width="100.8"
        height="133.8"
        rx="7"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.4"
      />

      {/* Barra superior Hot Wheels */}
      <rect
        x="8"
        y="7.5"
        width="88"
        height="21"
        rx="5.5"
        fill="#0B1B3F"
      />

      <rect
        x="8"
        y="7.5"
        width="88"
        height="21"
        rx="5.5"
        fill="none"
        stroke="rgba(255,255,255,0.25)"
      />

      {/* Llama */}
      <g transform="translate(11.5,8.8) scale(0.92)">
        <path
          d="M0.5,17.5 C-0.5,10.5 3,3 8.5,5 C7.8,0.8 13,-0.8 15,3.6 C17.8,0.4 22.4,3.2 20.6,8.2 C24,9.4 23.2,14.6 18.6,17 C14,19.6 3.5,20.2 0.5,17.5 Z"
          fill={`url(#flame-${uid})`}
        />

        <path
          d="M6,16.8 C5.4,12.6 7.6,8.4 10.8,9.6 C10.4,6.8 13.4,6 14.4,8.6 C16,6.8 18.6,8.4 17.6,11.2 C19.4,12 19,14.8 16.6,16.2 C14,17.8 8.2,18.4 6,16.8 Z"
          fill="#FFE9A8"
          opacity="0.9"
        />
      </g>

      <text
        x="40"
        y="22"
        fill="#FFFFFF"
        fontFamily="Poppins, sans-serif"
        fontSize="8.6"
        fontWeight="900"
        fontStyle="italic"
        letterSpacing="0.25"
        transform="skewX(-8) translate(5,0)"
      >
        HOT WHEELS
      </text>

      {/* Nombre del auto */}
      <rect
        x="8"
        y="31.5"
        width="88"
        height="13"
        rx="3.5"
        fill="rgba(0,0,0,0.32)"
      />

      <text
        x="52"
        y="40.6"
        textAnchor="middle"
        fill="#FFFFFF"
        fontFamily="Poppins, sans-serif"
        fontSize="7.6"
        fontWeight="700"
        letterSpacing="1.1"
      >
        {auto.nombre.toUpperCase().slice(0, 16)}
      </text>
