import { useEffect, useState } from "react";
import type { Resource } from "../types";
import resourcesData from "../data/resources.json";

const RESOURCES = resourcesData as Resource[];

/**
 * Simula la obtención asíncrona de recursos (por ejemplo, desde una API)
 * a partir del JSON local, mostrando un breve estado de carga.
 */
export function useResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);

    const timer = window.setTimeout(() => {
      if (!cancelled) {
        setResources(RESOURCES);
        setIsLoading(false);
      }
    }, 500);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, []);

  return { resources, isLoading };
}

export function getResourceById(id: string): Resource | undefined {
  return RESOURCES.find((resource) => resource.id === id);
}

export function getAllResources(): Resource[] {
  return RESOURCES;
}
