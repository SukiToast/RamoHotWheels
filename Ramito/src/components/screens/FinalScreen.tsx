import { regalo } from "../../config/regalo";
import HeartsField, { HeartIcon } from "../HeartsField";

interface Props {
  onReplay: () => void;
}

export default function FinalScreen({ onReplay }: Props) {
  return (
    <div className="screen relative flex flex-col items-center justify-center overflow-hidden px-6 py-12 text-center">
      <HeartsField count={26} minSize={14} maxSize={40} durMin={8} durMax={16} />
      <HeartsField count={10} minSize={8} maxSize={18} durMin={5} durMax={10} dist="-95vh" />

      <div className="final-in relative z-10 flex flex-col items-center">
        {/* Corazón grande decorativo */}
        <div
          className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md"
          style={{ boxShadow: "0 0 40px rgba(255,123,169,0.35)" }}
        >
          <HeartIcon className="h-7 w-7 text-pink-400" />
        </div>

        {/* Mensaje final */}
        <h2
          className="font-script text-gradient leading-[1.25]"
          style={{
            fontSize: "clamp(2.6rem, 11vw, 5rem)",
            maxWidth: "14ch",
            textShadow: "0 0 70px rgba(255,123,169,0.35)",
          }}
        >
          {regalo.mensajeFinal}
        </h2>

        {/* Nombre */}
        <p
          className="font-script text-gradient-pink mt-4"
          style={{ fontSize: "clamp(1.9rem, 7vw, 2.8rem)" }}
        >
          {regalo.nombre}
        </p>

        {/* Fecha */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 backdrop-blur-md">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200/85">
            {regalo.fecha}
          </span>
        </div>

        {/* Botón volver a ver el ramo */}
        <button
          type="button"
          onClick={onReplay}
          className="btn-soft mt-9 rounded-full px-7 py-3.5 text-sm font-bold text-blue-50 sm:text-base"
        >
          {regalo.botonVolver}
        </button>
      </div>

      {/* Brillo decorativo */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[70vh] w-[70vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(94,168,255,0.18) 0%, rgba(255,123,169,0.12) 45%, transparent 70%)",
        }}
      />
    </div>
  );
}
