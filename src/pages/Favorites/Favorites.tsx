import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useResources } from "../../hooks/useResources";
import { useFavorites } from "../../hooks/useFavorites";
import { ResourceCard } from "../../components/ResourceCard/ResourceCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { SkeletonGrid } from "../../components/Loading/Loading";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import { ResourceCounter } from "../../components/ResourceCounter/ResourceCounter";
import { sortResources } from "../../utils/sortResources";
import type { SortOption } from "../../types";

export function Favorites() {
  const { resources, isLoading } = useResources();
  const { favoriteIdSet } = useFavorites();
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const favoriteResources = useMemo(
    () => resources.filter((resource) => favoriteIdSet.has(resource.id)),
    [resources, favoriteIdSet]
  );

  const sorted = useMemo(
    () => sortResources(favoriteResources, sortBy),
    [favoriteResources, sortBy]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
          <span aria-hidden="true">❤️</span> Mis favoritos
        </h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Recursos que guardaste para revisar más tarde. Se mantienen incluso si cierras el navegador.
        </p>
      </section>

      {isLoading ? (
        <SkeletonGrid count={4} />
      ) : favoriteResources.length === 0 ? (
        <EmptyState
          title="Aún no tienes favoritos."
          message="Explora los recursos y presiona el corazón para guardarlos aquí."
        />
      ) : (
        <main id="main-content">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <ResourceCounter total={favoriteResources.length} />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" role="list">
            {sorted.map((resource) => (
              <div role="listitem" key={resource.id}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        </main>
      )}

      {favoriteResources.length === 0 && !isLoading && (
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm font-medium text-brand-600 hover:underline">
            ← Explorar recursos
          </Link>
        </div>
      )}
    </div>
  );
}
