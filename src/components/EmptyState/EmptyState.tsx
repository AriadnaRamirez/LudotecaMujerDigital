interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

export function EmptyState({
  title = "No encontramos recursos.",
  message = "Prueba con otros filtros.",
  onClearFilters,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-300 bg-white/60 px-6 py-16 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-3xl" aria-hidden="true">
        🔍
      </div>
      <div>
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-500">{message}</p>
      </div>
      {onClearFilters && (
        <button
          type="button"
          onClick={onClearFilters}
          className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}
