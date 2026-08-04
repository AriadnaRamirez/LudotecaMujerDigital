import type { Difficulty, Language, Price, SortOption, TimeBucket } from "../types";

export const TIME_OPTIONS: { value: TimeBucket; label: string }[] = [
  { value: "lt15", label: "Menos de 15 minutos" },
  { value: "15-30", label: "15–30 minutos" },
  { value: "30-60", label: "30–60 minutos" },
  { value: "60-120", label: "1–2 horas" },
  { value: "gt120", label: "Más de 2 horas" },
];

export const DIFFICULTY_OPTIONS: Difficulty[] = [
  "Principiante",
  "Intermedio",
  "Avanzado",
];

export const TOPIC_OPTIONS: string[] = [
  "Ciberseguridad",
  "Redes",
  "Linux",
  "Cloud",
  "Python",
  "IA",
  "Soft Skills",
  "Empleabilidad",
  "Desarrollo Web",
];

export const TYPE_OPTIONS: string[] = [
  "Curso",
  "Video",
  "Laboratorio",
  "Artículo",
  "PDF",
  "Cheat Sheet",
  "Podcast",
];

export const PLATFORM_OPTIONS: string[] = [
  "Cisco",
  "YouTube",
  "TryHackMe",
  "Hack The Box",
  "Coursera",
  "AWS Skill Builder",
  "Microsoft Learn",
  "Google",
];

export const LANGUAGE_OPTIONS: Language[] = ["Español", "Inglés"];

export const PRICE_OPTIONS: Price[] = ["Gratis", "Pago"];

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "recent", label: "Más recientes" },
  { value: "oldest", label: "Más antiguos" },
  { value: "duration-asc", label: "Menor duración" },
  { value: "duration-desc", label: "Mayor duración" },
  { value: "difficulty", label: "Nivel" },
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
];

export const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  Principiante: 0,
  Intermedio: 1,
  Avanzado: 2,
};

export const TIME_BUCKET_RANGES: Record<TimeBucket, [number, number]> = {
  lt15: [0, 14],
  "15-30": [15, 30],
  "30-60": [31, 60],
  "60-120": [61, 120],
  gt120: [121, Infinity],
};
