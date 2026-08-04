interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  resultsCount?: number;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <label htmlFor="search-input" className="sr-only">
        Buscar recursos por título, plataforma, categoría, etiquetas o autor
      </label>
      <span
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400"
        aria-hidden="true"
      >
        🔍
      </span>
      <input
        id="search-input"
        type="search"
        role="searchbox"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por título, plataforma, categoría, etiquetas o autor…"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-11 text-sm text-slate-900 shadow-sm transition placeholder:text-slate-400 focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-400 transition hover:text-slate-600"
        >
          ✕
        </button>
      )}
    </div>
  );
}
