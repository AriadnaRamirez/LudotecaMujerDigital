import { useEffect, useMemo, useState } from "react";
import { SearchBar } from "../../components/SearchBar/SearchBar";
import { Filters } from "../../components/Filters/Filters";
import { FiltersDrawer } from "../../components/Filters/FiltersDrawer";
import { ResourceCard } from "../../components/ResourceCard/ResourceCard";
import { EmptyState } from "../../components/EmptyState/EmptyState";
import { SkeletonGrid } from "../../components/Loading/Loading";
import { SortDropdown } from "../../components/SortDropdown/SortDropdown";
import {
  ResourceCounter,
  ShowingCounter,
} from "../../components/ResourceCounter/ResourceCounter";
import { useResources } from "../../hooks/useResources";
import { useResourceFilters } from "../../hooks/useResourceFilters";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import {
  filterResources,
  countActiveFilters,
} from "../../utils/filterResources";
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

  const filterOptions = useMemo(
    () => ({
      topics: [...new Set(resources.map(({ topic }) => topic))].sort((a, b) =>
        a.localeCompare(b, "es")
      ),
      types: [...new Set(resources.map(({ type }) => type))].sort((a, b) =>
        a.localeCompare(b, "es")
      ),
      platforms: [...new Set(resources.map(({ platform }) => platform))].sort(
        (a, b) => a.localeCompare(b, "es")
      ),
    }),
    [resources]
  );

  const debouncedQuery = useDebouncedValue(filters.query, 250);
  const effectiveFilters = useMemo(
    () => ({ ...filters, query: debouncedQuery }),
    [filters, debouncedQuery]
  );

  const filtered = useMemo(
    () => filterResources(resources, effectiveFilters),
    [resources, effectiveFilters]
  );

  const sorted = useMemo(
    () => sortResources(filtered, sortBy),
    [filtered, sortBy]
  );
  const visible = sorted.slice(0, visibleCount);
  const activeFilterCount = countActiveFilters(effectiveFilters);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [effectiveFilters, sortBy]);

  return (
    <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-7 sm:py-10">
      <section aria-labelledby="hero-title" className="mb-8 animate-rise">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-brass">
          Ludoteca Digital
        </p>
        <h1
          id="hero-title"
          className="mt-2 max-w-2xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl"
        >
          Recursos para crecer con criterio
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
          Un catálogo curado de cursos, laboratorios y herramientas para
          avanzar en tecnología y habilidades digitales.
        </p>
      </section>

      <section
        aria-labelledby="catalog-title"
        className="rounded-sm border border-line bg-surface/90 p-4 shadow-[0_20px_50px_-36px_rgba(23,27,26,0.4)] sm:p-6"
      >
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="catalog-title"
              className="font-display text-2xl font-semibold text-ink"
            >
              Catálogo
            </h2>
            <p className="mt-1 text-sm text-muted">
              Filtra, ordena y abre el detalle de cada aportación.
            </p>
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="flex-1">
            <SearchBar value={filters.query} onChange={setQuery} />
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center justify-center gap-2 rounded-sm border border-line bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-brand-400 hover:text-brand-800 lg:hidden"
          >
            Filtros
            {activeFilterCount > 0 && (
              <span className="min-w-5 rounded-sm bg-brand-800 px-1.5 text-center text-xs font-semibold text-surface">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[230px_1fr]">
          <aside
            aria-label="Filtros de búsqueda"
            className="hidden border-r border-line pr-5 lg:block lg:h-fit"
          >
            <Filters
              filters={filters}
              onToggle={toggle}
              onTogglePrice={togglePrice}
              onClear={clearAll}
              topicOptions={filterOptions.topics}
              typeOptions={filterOptions.types}
              platformOptions={filterOptions.platforms}
            />
          </aside>

          <main id="main-content" className="min-w-0">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <ResourceCounter total={isLoading ? 0 : filtered.length} />
              <SortDropdown value={sortBy} onChange={setSortBy} />
            </div>

            {isLoading ? (
              <SkeletonGrid count={6} />
            ) : filtered.length === 0 ? (
              <EmptyState
                onClearFilters={
                  activeFilterCount > 0 ? clearFilters : undefined
                }
              />
            ) : (
              <>
                <div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
                  role="list"
                >
                  {visible.map((resource, index) => (
                    <div
                      role="listitem"
                      key={resource.id}
                      className="animate-rise"
                      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                    >
                      <ResourceCard resource={resource} />
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-col items-center gap-3">
                  <ShowingCounter
                    shown={visible.length}
                    total={filtered.length}
                  />
                  {visibleCount < filtered.length && (
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleCount((count) => count + PAGE_SIZE)
                      }
                      className="rounded-sm border border-brand-700 bg-surface px-6 py-2.5 text-sm font-medium tracking-wide text-brand-800 transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
                    >
                      Cargar más
                    </button>
                  )}
                </div>
              </>
            )}
          </main>
        </div>
      </section>

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
          topicOptions={filterOptions.topics}
          typeOptions={filterOptions.types}
          platformOptions={filterOptions.platforms}
        />
      </FiltersDrawer>
    </div>
  );
}
