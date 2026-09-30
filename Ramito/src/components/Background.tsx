import { StarField, CarSilhouettes } from "./HeartsField";

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#040A1E]">
      {/* Degradado base azul marino */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #17408F 0%, #0C2158 38%, #060F2E 72%, #040A1E 100%)",
        }}
      />

      {/* Orbe azul (arriba-izquierda) */}
      <div
        className="absolute -left-[20vw] -top-[24vh] h-[70vw] w-[70vw] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(46,124,246,0.5) 0%, transparent 65%)",
          animation: "orb-float 18s ease-in-out infinite",
        }}
      />

      {/* Orbe rosa (abajo-derecha) */}
      <div
        className="absolute -bottom-[26vh] -right-[22vw] h-[80vw] w-[80vw] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(255,123,169,0.4) 0%, transparent 65%)",
          animation: "orb-float 22s ease-in-out infinite reverse",
        }}
      />

      {/* Orbe azul claro central suave */}
      <div
        className="absolute left-1/2 top-[38%] h-[90vw] w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(94,168,255,0.16) 0%, transparent 60%)",
        }}
      />

      {/* Autos silueteados conduciendo lentamente */}
      <CarSilhouettes />

      {/* Estrellas parpadeando */}
      <StarField count={18} />

      {/* Grano de textura */}
      <div className="grain absolute inset-0" />

      {/* Viñeta */}
      <div className="vignette absolute inset-0" />
    </div>
  );
}
