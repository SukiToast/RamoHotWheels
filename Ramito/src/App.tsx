import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

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

const HEART_COLORS = [
  "#FF7BA9",
  "#5EB0FF",
  "#FFFFFF",
  "#FFB3CC",
  "#FFD86B",
];

/** Tamaño de la escena del ramo. */
const SCENE_STYLE: React.CSSProperties = {
  width: "min(92vw, 400px)",
  height: "min(78vh, 560px)",
  aspectRatio: "360 / 560",
};
