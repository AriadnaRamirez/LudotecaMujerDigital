import type { Resource, SortOption } from "../types";
import { DIFFICULTY_WEIGHT } from "./constants";

export function sortResources(
  resources: Resource[],
  sortBy: SortOption
): Resource[] {
  const copy = [...resources];

  switch (sortBy) {
    case "recent":
      return copy.sort((a, b) =>
        (b.publishedAt ?? "").localeCompare(a.publishedAt ?? "")
      );
    case "oldest":
      return copy.sort((a, b) =>
        (a.publishedAt ?? "").localeCompare(b.publishedAt ?? "")
      );
    case "duration-asc":
      return copy.sort((a, b) => a.duration - b.duration);
    case "duration-desc":
      return copy.sort((a, b) => b.duration - a.duration);
    case "difficulty":
      return copy.sort(
        (a, b) => DIFFICULTY_WEIGHT[a.difficulty] - DIFFICULTY_WEIGHT[b.difficulty]
      );
    case "name-asc":
      return copy.sort((a, b) => a.title.localeCompare(b.title, "es"));
    case "name-desc":
      return copy.sort((a, b) => b.title.localeCompare(a.title, "es"));
    default:
      return copy;
  }
}
