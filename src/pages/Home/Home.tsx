import { useEffect, useMemo, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Filters } from "../../components/Filters/Filters";
import { FiltersDrawer } from "../../components/Filters/FiltersDrawer";
import { ResourceCard } from "../../components/ResourceCard/ResourceCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { SkeletonGrid } from "../../components/Loading/Loading";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import { ResourceCounter, ShowingCounter } from "../../components/ResourceCounter/ResourceCounter";
import { useResources } from "../../hooks/useResources";
import { useResourceFilters } from "../../hooks/useResourceFilters";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { filterResources, countActiveFilters } from "../../utils/filterResources";
import { sortResources } from "../../utils/sortResources";
import type { SortOption } from "../../types";

const PAGE_SIZE = 12;

export function Home() {
  const { resources, isLoading } = useResources();
  const {
    filters,
    setQuery,
    toggle,
    togglePrice,
    clearFilters,
    clearAll,
  } = useResourceFilters();
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const debouncedQuery = useDebouncedValue(filters.query, 250);
  const effectiveFilters = useMemo(
    () => ({ ...filters, query: debouncedQuery }),
    [filters, debouncedQuery]
  );

  const filtered = useMemo(
    () => filterResources(resources, effectiveFilters),
    [resources, effectiveFilters]
  );

  const sorted = useMemo(() => sortResources(filtered, sortBy), [filtered, sortBy]);
  const visible = sorted.slice(0, visibleCount);
  const activeFilterCount = countActiveFilters(effectiveFilters);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [effectiveFilters, sortBy]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <section aria-labelledby="hero-title" className="mb-6">
        <h1 id="hero-title" className="text-2xl font-bold text-slate-900 sm:text-3xl">
          Encuentra tu próximo recurso de aprendizaje
        </h1>
        <p className="mt-1 text-sm text-slate-500 sm:text-base">
          Cursos, videos, laboratorios y más para estudiantes de tecnología y ciberseguridad.
        </p>
      </section>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex-1">
          <SearchBar value={filters.query} onChange={setQuery} />
        </div>
        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 lg:hidden"
        >
          <span aria-hidden="true">🎛️</span>
          Filtros
          {activeFilterCount > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-600 px-1 text-xs font-semibold text-white">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
        <aside
          aria-label="Filtros de búsqueda"
          className="hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block lg:h-fit lg:sticky lg:top-24"
        >
          <Filters
            filters={filters}
            onToggle={toggle}
            onTogglePrice={togglePrice}
            onClear={clearAll}
          />
        </aside>

        <main id="main-content" className="min-w-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <ResourceCounter total={isLoading ? 0 : filtered.length} />
            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {isLoading ? (
            <SkeletonGrid count={8} />
          ) : filtered.length === 0 ? (
            <EmptyState onClearFilters={activeFilterCount > 0 ? clearFilters : undefined} />
          ) : (
            <>
              <div
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                role="list"
              >
                {visible.map((resource) => (
                  <div role="listitem" key={resource.id}>
                    <ResourceCard resource={resource} />
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col items-center gap-3">
                <ShowingCounter shown={visible.length} total={filtered.length} />
                {visibleCount < filtered.length && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
                    className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                  >
                    Cargar más recursos
                  </button>
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <FiltersDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        resultsCount={filtered.length}
      >
        <Filters
          filters={filters}
          onToggle={toggle}
          onTogglePrice={togglePrice}
          onClear={clearAll}
        />
      </FiltersDrawer>
    </div>
  );
}
