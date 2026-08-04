import type { FilterState, Resource } from "../types";
import { TIME_BUCKET_RANGES } from "./constants";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function matchesQuery(resource: Resource, query: string): boolean {
  const q = normalize(query.trim());
  if (!q) return true;

  const haystacks = [
    resource.title,
    resource.platform,
    resource.topic,
    resource.author ?? "",
    resource.contributorName ?? "",
    resource.description,
    ...resource.tags,
  ].map(normalize);

  return haystacks.some((field) => field.includes(q));
}

export function matchesFilters(
  resource: Resource,
  filters: FilterState
): boolean {
  if (!matchesQuery(resource, filters.query)) return false;

  if (filters.time.length > 0) {
    const inAnyBucket = filters.time.some((bucket) => {
      const [min, max] = TIME_BUCKET_RANGES[bucket];
      return resource.duration >= min && resource.duration <= max;
    });
    if (!inAnyBucket) return false;
  }

  if (
    filters.difficulty.length > 0 &&
    !filters.difficulty.includes(resource.difficulty)
  ) {
    return false;
  }

  if (filters.topic.length > 0 && !filters.topic.includes(resource.topic)) {
    return false;
  }

  if (filters.type.length > 0 && !filters.type.includes(resource.type)) {
    return false;
  }

  if (
    filters.platform.length > 0 &&
    !filters.platform.includes(resource.platform)
  ) {
    return false;
  }

  if (
    filters.language.length > 0 &&
    !filters.language.includes(resource.language)
  ) {
    return false;
  }

  if (filters.price.length > 0 && !filters.price.includes(resource.price)) {
    return false;
  }

  if (filters.certificate.length > 0) {
    const wantsYes = filters.certificate.includes("si");
    const wantsNo = filters.certificate.includes("no");
    if (wantsYes && !wantsNo && !resource.certificate) return false;
    if (wantsNo && !wantsYes && resource.certificate) return false;
  }

  return true;
}

export function filterResources(
  resources: Resource[],
  filters: FilterState
): Resource[] {
  return resources.filter((resource) => matchesFilters(resource, filters));
}

export function countActiveFilters(filters: FilterState): number {
  return (
    filters.time.length +
    filters.difficulty.length +
    filters.topic.length +
    filters.type.length +
    filters.platform.length +
    filters.language.length +
    filters.price.length +
    filters.certificate.length
  );
}
