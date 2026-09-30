import React, { useEffect } from "react";
import { regalo } from "../../config/regalo";
import HeartsField from "../HeartsField";

interface Props {
  onOpen: (clientX: number, clientY: number) => void;
}

/** Pantalla de introducción */
export default function IntroScreen({ onOpen }: Props) {
  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    onOpen(e.clientX, e.clientY);
  };

  return (
    <div className="screen relative flex flex-col items-center justify-center overflow-hidden px-6 py-10 text-center">
      <HeartsField count={16} minSize={12} maxSize={30} />

      {/* Etiqueta superior */}
      <div
        className="fade-up relative z-10 mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 backdrop-blur-md"
        style={{ animationDelay: "0.15s" }}
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-blue-200/90">
          Hecho a mano · Con todo mi amor
        </span>
      </div>

      {/* Título */}
      <h1
        className="fade-up relative z-10 font-script text-gradient leading-[1.15]"
        style={{
          animationDelay: "0.3s",
          fontSize: "clamp(2.7rem, 11.5vw, 5.2rem)",
          maxWidth: "15ch",
          textShadow: "0 0 60px rgba(94,168,255,0.35)",
        }}
      >
        <span
          className="mr-1 align-middle"
          style={{ fontSize: "0.55em" }}
        >
          💙
        </span>

        {regalo.tituloIntro}

        <span
          className="ml-1 align-middle"
          style={{ fontSize: "0.55em" }}
        >
          💙
        </span>
      </h1>

      {/* Subtítulo */}
      <p
        className="fade-up relative z-10 mt-5 max-w-[30ch] text-sm leading-relaxed text-blue-100/75 sm:text-base"
        style={{ animationDelay: "0.5s" }}
      >
        {regalo.subtituloIntro}
      </p>

      {/* Botón abrir regalo */}
      <button
        type="button"
        onClick={handleOpen}
        className="btn-gift btn-shimmer fade-up relative z-10 mt-10 rounded-full px-9 py-5 text-lg font-extrabold tracking-wide text-white sm:px-12 sm:py-6 sm:text-xl"
        style={{ animationDelay: "0.7s" }}
      >
        <span className="relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
          🎁 {regalo.botonIntro}
        </span>
      </button>

      {/* Pista pequeña */}
      <p
        className="fade-up relative z-10 mt-6 text-xs italic text-blue-200/60"
        style={{ animationDelay: "0.9s" }}
      >
        toca el botón cuando estés listo ❤️
      </p>

      {/* Brillo decorativo detrás del botón */}
      <div
        className="pointer-events-none absolute left-1/2 top-[62%] -z-0 h-[42vh] w-[42vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,123,169,0.28) 0%, transparent 68%)",
        }}
      />
    </div>
  );
}
