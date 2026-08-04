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
      className="flex flex-col items-center justify-center gap-4 rounded-[6px] border border-dashed border-[#bdc9ce] bg-[#f8fafb] px-6 py-16 text-center"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50 text-2xl" aria-hidden="true">
        🔍
      </div>
      <div>
        <p className="text-lg font-semibold text-[#183f4e]">{title}</p>
        <p className="mt-1 text-sm text-[#6f838b]">{message}</p>
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
