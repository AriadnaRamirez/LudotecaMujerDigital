export function SkeletonCard() {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-[6px] border border-[#dfe5e8] bg-white"
      aria-hidden="true"
    >
      <div className="h-32 w-full animate-skeleton bg-[#e3edef]" />
      <div className="flex min-h-[420px] flex-1 flex-col gap-3 p-4">
        <div className="h-4 w-3/4 animate-skeleton rounded bg-slate-200" />
        <div className="h-3 w-full animate-skeleton rounded bg-slate-200" />
        <div className="h-3 w-5/6 animate-skeleton rounded bg-slate-200" />
        <div className="h-3 w-1/2 animate-skeleton rounded bg-slate-200" />
        <div className="flex gap-2">
          <div className="h-5 w-16 animate-skeleton rounded bg-slate-200" />
          <div className="h-5 w-16 animate-skeleton rounded bg-slate-200" />
          <div className="h-5 w-16 animate-skeleton rounded bg-slate-200" />
        </div>
        <div className="h-20 w-full animate-skeleton rounded bg-slate-200" />
        <div className="mt-auto flex gap-2 pt-2">
          <div className="h-9 flex-1 animate-skeleton rounded bg-slate-200" />
          <div className="h-9 w-20 animate-skeleton rounded bg-slate-200" />
          <div className="h-9 w-9 animate-skeleton rounded bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 8 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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
      className="flex flex-col items-center justify-center gap-3 py-16 text-slate-500"
    >
      <svg
        className="h-10 w-10 animate-spin text-brand-600"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
