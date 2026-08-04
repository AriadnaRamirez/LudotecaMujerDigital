export type Difficulty = "Principiante" | "Intermedio" | "Avanzado";
export type Language = "Español" | "Inglés";
export type Price = "Gratis" | "Pago";

export interface Resource {
  id: string;
  title: string;
  description: string;
  image: string;
  platform: string;
  topic: string;
  type: string;
  difficulty: Difficulty;
  duration: number; // minutos
  durationLabel: string;
  language: Language;
  price: Price;
  certificate: boolean;
  tags: string[];
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

export type ResourceStatus = "all" | "favorites" | "completed";

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
  status: ResourceStatus;
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
  status: "all",
};
