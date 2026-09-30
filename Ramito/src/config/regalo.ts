/**
 * Tipo de carrocería dibujada para el empaque.
 */
export type TipoAuto = "deportivo" | "muscle" | "clasico";

/**
 * Un auto dentro del ramo.
 */
export interface AutoConfig {
  /** Nombre del auto */
  nombre: string;

  imagen?: string;

  /** Tipo de carrocería dibujada */
  tipo?: TipoAuto;

  x: number;
  y: number;

  /** Tamaño del empaque (ancho en píxeles del lienzo). 80 - 110 se ve bien. */
  tamano: number;

  /** Inclinación en grados. Negativo = inclinado a la izquierda. (-30 a 30) */
  inclinacion: number;

  /** Color SUPERIOR del empaque. */
  color1: string;

  /** Color INFERIOR del empaque. */
  color2: string;

  /** Color del auto de metal. */
  colorAuto: string;
}

/**
 * Colores de todo el ramo.
 */
export interface ColoresRamo {
  /** Papel de envoltura (tono principal azul). */
  papel: string;

  /** Papel — luz / brillo. */
  papelClaro: string;

  /** Papel — sombra / profundidad. */
  papelOscuro: string;

  /** Tallos verdes. */
  tallo: string;
  talloOscuro: string;

  /** Flores decorativas. */
  flor: string;

  /** Centro de las flores. */
  centroFlor: string;

  /** Lazo / cinta. */
  lazo: string;
  lazoClaro: string;
}

export const regalo = {
  nombre: "Mi amor",

  fecha: "30 de septiembre de 2026",

  /* Pantalla 1 */
  tituloIntro: "Tengo un pequeño regalo para ti...",

  /** Línea pequeña debajo del título. */
  subtituloIntro:
    "Preparado con mucho cariño... y con un poco de gasolina 💙",

  /** Texto del botón. */
  botonIntro: "Abrir regalo",

  /* Pantalla 4 */
  mensaje:
    "Te hice este pequeño ramo, porque por algo tienes una novia que sabe programar ❤️",

  /** Mensaje secundario (aparece en rosa, debajo). */
  mensajeSecundario:
    "Espero que te guste tanto como a mí me gustó hacerlo para ti. 💙",

  /** Botón para pasar a la pantalla final. */
  botonVerMensaje: "Para ti ❤️",

  /* Pantalla 5 */
  mensajeFinal: "Para ti, con mucho todo el amor del mundo ❤️",

  /** Botón para volver a ver el ramo */
  botonVolver: "Volver a ver el ramo 💙",

  coloresRamo: {
    papel: "#2563EB",
    papelClaro: "#5EA8FF",
    papelOscuro: "#0E2F86",
    tallo: "#3FA34D",
    talloOscuro: "#2A7A38",
    flor: "#5EB0FF",
    centroFlor: "#FFD86B",
    lazo: "#FF7BA9",
    lazoClaro: "#FFB3CC",
  } as ColoresRamo,

  autos: [
    // Centro
    {
      nombre: "Ocean Blue",
      imagen: "",
      tipo: "deportivo",
      x: 180,
      y: 152,
      tamano: 108,
      inclinacion: 0,
      color1: "#1D4ED8",
      color2: "#0B2A75",
      colorAuto: "#4DA3FF",
    },

    // Segunda fila
    {
      nombre: "Red Thunder",
      imagen: "",
      tipo: "muscle",
      x: 100,
      y: 164,
      tamano: 100,
      inclinacion: -13,
      color1: "#DC2626",
      color2: "#7F1414",
      colorAuto: "#F4B942",
    },

    {
      nombre: "Turbo Rose",
      imagen: "",
      tipo: "deportivo",
      x: 260,
      y: 164,
      tamano: 100,
      inclinacion: 13,
      color1: "#DB2777",
      color2: "#831843",
      colorAuto: "#FF7BA9",
    },

    {
      nombre: "Cyan Drift",
      imagen: "",
      tipo: "deportivo",
      x: 136,
      y: 208,
      tamano: 94,
      inclinacion: -6,
      color1: "#0891B2",
      color2: "#155E75",
      colorAuto: "#67E8F9",
    },

    {
      nombre: "Magenta GT",
      imagen: "",
      tipo: "muscle",
      x: 224,
      y: 208,
      tamano: 94,
      inclinacion: 6,
      color1: "#7C3AED",
      color2: "#4C1D95",
      colorAuto: "#F0ABFC",
    },

    // Tercera fila (los de los extremos)
    {
      nombre: "Night Shark",
      imagen: "",
      tipo: "muscle",
      x: 46,
      y: 218,
      tamano: 88,
      inclinacion: -26,
      color1: "#111827",
      color2: "#000000",
      colorAuto: "#9CA3AF",
    },

    {
      nombre: "Sunset RS",
      imagen: "",
      tipo: "deportivo",
      x: 314,
      y: 218,
      tamano: 88,
      inclinacion: 26,
      color1: "#EA580C",
      color2: "#9A3412",
      colorAuto: "#FDE047",
    },

    // Cuarta fila (los más pequeños, al frente y abajo)
    {
      nombre: "Mini Runner",
      imagen: "",
      tipo: "clasico",
      x: 74,
      y: 284,
      tamano: 78,
      inclinacion: -16,
      color1: "#059669",
      color2: "#064E3B",
      colorAuto: "#6EE7B7",
    },

    {
      nombre: "Baby Blue",
      imagen: "",
      tipo: "clasico",
      x: 286,
      y: 284,
      tamano: 78,
      inclinacion: 16,
      color1: "#2563EB",
      color2: "#1E3A8A",
      colorAuto: "#BFDBFE",
    },
  ] as AutoConfig[],
};
