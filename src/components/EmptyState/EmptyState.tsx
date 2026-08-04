interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "Sin resultados",
  message = "Prueba con otros filtros o una búsqueda distinta.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 border border-dashed border-line bg-canvas/40 px-6 py-20 text-center"
    >
      <div>
        <p className="font-display text-2xl font-semibold text-ink">{title}</p>
        <p className="mt-2 text-sm text-muted">{message}</p>
      </div>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-sm bg-brand-800 px-4 py-2 text-sm font-medium text-surface transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
