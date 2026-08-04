import type { Difficulty } from "../../types";
import { Badge } from "./Badge";

const TONE_BY_DIFFICULTY: Record<Difficulty, "success" | "warning" | "brand"> = {
  Principiante: "success",
  Intermedio: "warning",
  Avanzado: "brand",
};

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return <Badge tone={TONE_BY_DIFFICULTY[difficulty]}>{difficulty}</Badge>;
}
