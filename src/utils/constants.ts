import type { Difficulty, Language, Price, SortOption, TimeBucket } from "../types";

export const TIME_OPTIONS: { value: TimeBucket; label: string }[] = [
  { value: "lt15", label: "Menos de 15 minutos" },
  { value: "15-30", label: "15–30 minutos" },
  { value: "30-60", label: "30–60 minutos" },
  { value: "60-120", label: "1–2 horas" },
  { value: "gt120", label: "Más de 2 horas" },
];

/** Catálogo cerrado de duraciones (minutos + etiqueta). Debe coincidir con resource-schema.json */
export const DURATION_OPTIONS: {
  hours: number;
  duration: number;
  durationLabel: string;
}[] = [
  { hours: 0.25, duration: 15, durationLabel: "15 min" },
  { hours: 0.5, duration: 30, durationLabel: "30 min" },
  { hours: 0.75, duration: 45, durationLabel: "45 min" },
  { hours: 1, duration: 60, durationLabel: "1 h" },
  { hours: 1.5, duration: 90, durationLabel: "1.5 h" },
  { hours: 2, duration: 120, durationLabel: "2 h" },
  { hours: 2.5, duration: 150, durationLabel: "2.5 h" },
  { hours: 3, duration: 180, durationLabel: "3 h" },
  { hours: 4, duration: 240, durationLabel: "4 h" },
  { hours: 5, duration: 300, durationLabel: "5 h" },
  { hours: 6, duration: 360, durationLabel: "6 h" },
];

export const DIFFICULTY_OPTIONS: Difficulty[] = [
  "Principiante",
  "Intermedio",
  "Avanzado",
];

export const LANGUAGE_OPTIONS: Language[] = ["Español", "Inglés"];

export const PRICE_OPTIONS: Price[] = ["Gratis", "Pago"];

export const TOPIC_OPTIONS = [
  "Organización y técnicas de estudio",
  "Bienestar emocional",
  "Finanzas personales",
  "Aprendizaje de idiomas",
  "Creatividad y diseño gráfico",
  "Productividad",
  "Habilidades de comunicación",
  "Tecnología avanzada",
  "Desarrollo de hábitos",
  "Ciberseguridad",
  "Redes",
  "Linux",
  "Cloud",
  "Python",
  "IA",
  "Soft Skills",
  "Empleabilidad",
  "Desarrollo Web",
] as const;

export const TYPE_OPTIONS = [
  "Libro",
  "Podcast",
  "Canal de YouTube",
  "Curso",
  "Comunidad",
  "Blog",
  "Herramienta digital",
  "Aplicación",
  "Plantilla",
  "PDF",
  "Laboratorio",
  "Video",
  "Artículo",
  "Cheat Sheet",
] as const;

export const PLATFORM_OPTIONS = [
  "YouTube",
  "Coursera",
  "Cisco",
  "TryHackMe",
  "Hack The Box",
  "AWS Skill Builder",
  "Microsoft Learn",
  "Google",
  "Udemy",
  "edX",
  "LinkedIn Learning",
  "Spotify",
  "Notion",
  "Medium",
  "GitHub",
  "Otro",
] as const;

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
