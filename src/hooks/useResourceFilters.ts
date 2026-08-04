import { useCallback, useMemo, useState } from "react";
import { EMPTY_FILTERS, type FilterState } from "../types";

type MultiKey =
  | "time"
  | "difficulty"
  | "topic"
  | "type"
  | "platform"
  | "language"
  | "certificate";

function toggleInArray<T>(list: T[], value: T): T[] {
  return list.includes(value)
    ? list.filter((item) => item !== value)
    : [...list, value];
}

export function useResourceFilters() {
  const [filters, setFilters] = useState<FilterState>(EMPTY_FILTERS);

  const setQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, query }));
  }, []);

  const toggle = useCallback((key: MultiKey, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: toggleInArray(prev[key] as string[], value),
    }));
  }, []);

  const togglePrice = useCallback((value: FilterState["price"][number]) => {
    setFilters((prev) => ({ ...prev, price: toggleInArray(prev.price, value) }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters((prev) => ({ ...EMPTY_FILTERS, query: prev.query }));
  }, []);

  const clearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
  }, []);

  const isDirty = useMemo(() => {
    return JSON.stringify({ ...filters, query: "" }) !== JSON.stringify({ ...EMPTY_FILTERS, query: "" });
  }, [filters]);

  return {
    filters,
    setQuery,
    toggle,
    togglePrice,
    clearFilters,
    clearAll,
    isDirty,
  };
}
