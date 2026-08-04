import { useCallback, useSyncExternalStore } from "react";
import { getLocalStore } from "../utils/localStore";

export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (updater: T | ((prev: T) => T)) => void] {
  const store = getLocalStore<T>(key, defaultValue);
  const value = useSyncExternalStore(store.subscribe, store.getSnapshot);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      store.setValue(updater);
    },
    [store]
  );

  return [value, setValue];
}
