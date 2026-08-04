import { useToggleIdSet } from "./useToggleIdSet";

export function useFavorites() {
  const { ids, idSet, has, toggle, add, remove } =
    useToggleIdSet("trh:favorites");

  return {
    favoriteIds: ids,
    favoriteIdSet: idSet,
    isFavorite: has,
    toggleFavorite: toggle,
    addFavorite: add,
    removeFavorite: remove,
  };
}
