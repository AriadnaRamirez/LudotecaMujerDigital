import { useToggleIdSet } from "./useToggleIdSet";

export function useCompleted() {
  const { ids, idSet, has, toggle, add, remove } =
    useToggleIdSet("trh:completed");

  return {
    completedIds: ids,
    completedIdSet: idSet,
    isCompleted: has,
    toggleCompleted: toggle,
    markCompleted: add,
    unmarkCompleted: remove,
  };
}
