export type Difficulty = "Principiante" | "Intermedio" | "Avanzado";
export type Language = "Español" | "Inglés";
export type Price = "Gratis" | "Pago";

/**
 * Entrada del catálogo. El contrato completo (límites, enums, URLs)
 * está en `src/data/resource-schema.json` y `GUIA-ESQUEMA-JSON.md`.
 */
export interface Resource {
  id: string;
  title: string;
  description: string;
  /** Nombre completo de la participante que comparte el recurso. */
  contributorName?: string;
  /** Respuestas obligatorias de la convocatoria, escritas por la participante. */
  discoveryContext?: string;
  impactReflection?: string;
  recommendationReason?: string;
  /** URL HTTPS pública de la imagen (no data URI ni ruta local). */
  image: string;
  platform: string;
  topic: string;
  type: string;
  difficulty: Difficulty;
  /** Minutos; debe emparejar con durationLabel según el catálogo. */
  duration: number;
  durationLabel: string;
  language: Language;
  price: Price;
  certificate: boolean;
  tags: string[];
  /** URL HTTPS directa del recurso. */
  url: string;
  author?: string;
  publishedAt?: string;
  updatedAt?: string;
}

export type TimeBucket =
  | "lt15"
  | "15-30"
  | "30-60"
  | "60-120"
  | "gt120";

export type SortOption =
  | "recent"
  | "oldest"
  | "duration-asc"
  | "duration-desc"
  | "difficulty"
  | "name-asc"
  | "name-desc";

export interface FilterState {
  query: string;
  time: TimeBucket[];
  difficulty: Difficulty[];
  topic: string[];
  type: string[];
  platform: string[];
  language: Language[];
  price: Price[];
  certificate: ("si" | "no")[];
}

export const EMPTY_FILTERS: FilterState = {
  query: "",
  time: [],
  difficulty: [],
  topic: [],
  type: [],
  platform: [],
  language: [],
  price: [],
  certificate: [],
};
