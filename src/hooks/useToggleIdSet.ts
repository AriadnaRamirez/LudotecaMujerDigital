import { useCallback, useMemo } from "react";
import { useLocalStorage } from "./useLocalStorage";

/**
 * Persiste una lista de ids (favoritos, completados, etc.) en LocalStorage
 * y expone helpers para consultar y alternar su estado.
 */
export function useToggleIdSet(storageKey: string) {
  const [ids, setIds] = useLocalStorage<string[]>(storageKey, []);

  const idSet = useMemo(() => new Set(ids), [ids]);

  const has = useCallback((id: string) => idSet.has(id), [idSet]);

  const toggle = useCallback(
    (id: string) => {
      setIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    },
    [setIds]
  );

  const add = useCallback(
    (id: string) => {
      setIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    },
    [setIds]
  );

  const remove = useCallback(
    (id: string) => {
      setIds((prev) => prev.filter((item) => item !== id));
    },
    [setIds]
  );

  return { ids, idSet, has, toggle, add, remove };
}
