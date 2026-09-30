import { regalo } from "../../config/regalo";
import { HeartIcon } from "../HeartsField";

interface Props {
  onContinue: () => void;
}

/** PANTALLA 4 — Tarjeta romántica con el mensaje. */
export default function MessageOverlay({ onContinue }: Props) {
  return (
    <div className="overlay-in fixed inset-0 z-40 flex items-center justify-center px-5 py-6">
      {/* Fondo difuminado para centrar la atención en la tarjeta */}
      <div className="absolute inset-0 bg-[#040A1E]/70 backdrop-blur-[3px]" />

      <div
        className="card-in relative w-full max-w-[560px] overflow-hidden rounded-[28px] border border-white/20 shadow-[0_30px_80px_rgba(2,6,20,0.65)]"
        style={{
          background:
            "linear-gradient(160deg, rgba(13,32,78,0.92) 0%, rgba(9,20,52,0.94) 55%, rgba(30,12,48,0.92) 100%)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          maxHeight: "88dvh",
          overflowY: "auto",
        }}
      >
        {/* Brillo superior de la tarjeta */}
        <div
          className="pointer-events-none absolute -left-16 -top-16 h-52 w-52 rounded-full blur-3xl"
          style={{ background: "rgba(94,168,255,0.35)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-16 h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(255,123,169,0.3)" }}
        />

        <div className="relative px-6 py-7 sm:px-9 sm:py-9">
          {/* Ornamento superior */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-blue-300/60" />
            <HeartIcon className="h-4 w-4 text-pink-400" />
            <HeartIcon className="h-3 w-3 text-blue-300" />
            <HeartIcon className="h-4 w-4 text-pink-400" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-blue-300/60" />
          </div>

          {/* Nombre */}
          <p
            className="font-script text-gradient-pink"
            style={{ fontSize: "clamp(2.1rem, 7.5vw, 3.1rem)", lineHeight: 1.2 }}
          >
            {regalo.nombre}
          </p>

          {/* Mensaje principal */}
          <p
            className="mx-auto mt-4 max-w-[34ch] font-medium leading-relaxed text-blue-50/95"
            style={{ fontSize: "clamp(0.98rem, 4.2vw, 1.16rem)" }}
          >
            {regalo.mensaje}
          </p>

          {/* Divisor */}
          <div className="my-4 flex items-center justify-center gap-2">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/25" />
            <span className="text-blue-200/70">✦</span>
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/25" />
          </div>

          {/* Mensaje secundario */}
          <p
            className="mx-auto max-w-[32ch] italic leading-relaxed text-pink-200/90"
            style={{ fontSize: "clamp(0.92rem, 4vw, 1.08rem)" }}
          >
            {regalo.mensajeSecundario}
          </p>

          {/* Fecha */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-blue-200/80">
              {regalo.fecha}
            </span>
          </div>

          {/* Botón continuar */}
          <div className="mt-6">
            <button
              type="button"
              onClick={onContinue}
              className="btn-gift btn-shimmer rounded-full px-8 py-4 text-base font-extrabold text-white sm:text-lg"
            >
              <span className="relative z-10 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
                {regalo.botonVerMensaje}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
