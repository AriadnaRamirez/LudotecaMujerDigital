export function SkeletonCard() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-sm border border-line bg-surface"
      aria-hidden="true"
    >
      <div className="h-36 w-full animate-skeleton bg-brand-100" />
      <div className="flex min-h-[220px] flex-1 flex-col gap-3 p-4">
        <div className="h-3 w-1/3 animate-skeleton rounded-sm bg-brand-100" />
        <div className="h-6 w-4/5 animate-skeleton rounded-sm bg-brand-100" />
        <div className="h-3 w-1/2 animate-skeleton rounded-sm bg-brand-100" />
        <div className="mt-auto flex gap-2 pt-2">
          <div className="h-10 flex-1 animate-skeleton rounded-sm bg-brand-100" />
          <div className="h-10 w-16 animate-skeleton rounded-sm bg-brand-100" />
          <div className="h-10 w-10 animate-skeleton rounded-sm bg-brand-100" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      role="status"
      aria-label="Cargando recursos"
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
      <span className="sr-only">Cargando recursos…</span>
    </div>
  );
}

export function Spinner({ label = "Cargando…" }: { label?: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center justify-center gap-3 py-16 text-muted"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border border-line border-t-brand-700"
        aria-hidden="true"
      />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
