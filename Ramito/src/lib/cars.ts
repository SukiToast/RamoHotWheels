import type { TipoAuto } from "../config/regalo";


export interface CarShape {
  /** Contorno del auto. */
  body: string;
  /** Ventanilla. */
  window: string;
  /** Línea de puerta. */
  doorLine: string;
  /** Posiciones [x, y] de las ruedas. */
  wheels: [number, number][];
  /** Radio de las ruedas. */
  wheelR: number;
}

export const CAR_SHAPES: Record<TipoAuto, CarShape> = {
  deportivo: {
    body: "M2,20.4 C2,15.4 4.6,12.8 9.6,12.1 L18.8,7.6 C23.2,4 28.8,2.6 35.8,2.9 C43.6,3.3 50.8,6.6 56.4,11.1 L60.4,12.9 C63,13.9 64,15.6 64,18 L64,20.6 C64,21.7 63.2,22.5 62,22.6 L4.2,22.6 C3,22.6 2,21.6 2,20.4 Z",
    window: "M22,11.3 L27.6,7.3 C30.6,5.3 34.6,4.9 38.6,5.7 L45.6,11.3 Z",
    doorLine: "M30,12.4 L30,20.6",
    wheels: [
      [17, 20],
      [47.5, 20],
    ],
    wheelR: 4.6,
  },
  muscle: {
    body: "M2,20.6 L2,15.2 C2,13.1 3.6,11.9 6.1,11.7 L15.6,11.3 L22.1,6.1 C26.1,3.1 33.1,2.7 39.1,4.5 L46.6,10.9 L57.1,12.1 C61.1,12.7 63.5,14.3 63.8,17.1 L64,20.6 C64,21.7 63.2,22.5 62,22.6 L4.2,22.6 C3,22.6 2,21.7 2,20.6 Z",
    window: "M24.6,10.7 L30.1,6.7 C33.1,5.1 37.1,5.1 40.6,6.5 L45.6,10.7 Z",
    doorLine: "M33,11.8 L33,20.6",
    wheels: [
      [15, 20],
      [49, 20],
    ],
    wheelR: 4.8,
  },
  clasico: {
    body: "M4.5,20.2 C4.5,14.7 7.1,12.1 13.1,11.1 L19.6,10.9 L26.1,5.3 C30.6,2.1 39.1,1.9 44.6,5.1 L51.1,10.9 L57.6,11.9 C62.1,12.7 64,14.7 64,17.6 L64,20.2 C64,21.5 63.2,22.4 61.8,22.5 L6.2,22.5 C5,22.5 4.5,21.4 4.5,20.2 Z",
    window: "M27.6,10.3 L32.6,6.1 C35.6,3.9 40.1,3.9 43.1,6.1 L47.6,10.3 Z",
    doorLine: "M36,11.4 L36,20.4",
    wheels: [
      [16, 19.8],
      [46, 19.8],
    ],
    wheelR: 4.4,
  },
};

/** Hoja decorativa. */
export const LEAF_PATH =
  "M0,0 C5,-8 15,-13 24,-11 C21,-2 10,5 0,0 Z";
export const LEAF_MIDRIB = "M1,-1 C8,-4 16,-7 22,-9";

/** Pétalo de flor. */
export const PETAL_PATH = "M0,-2 C4,-9 4,-16 0,-19 C-4,-16 -4,-9 0,-2 Z";

/** Corazón SVG. */
export const HEART_PATH =
  "M12 21s-6.7-4.3-9.3-8.1C.7 10 1.2 6.4 4 4.9c2-1.1 4.4-.6 5.9 1l.9 1 .9-1c1.5-1.6 3.9-2.1 5.9-1 2.8 1.5 3.3 5.1 1.3 7.9C18.7 16.7 12 21 12 21z";

/** Estrella de 4 puntas. */
export const SPARK_PATH =
  "M12 0 C13.2 7 17 10.8 24 12 C17 13.2 13.2 17 12 24 C10.8 17 7 13.2 0 12 C7 10.8 10.8 7 12 0 Z";
