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
        className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-[#7d9098]"
        aria-hidden="true"
      >
        <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none">
          <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="m13 13 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <input
        id="search-input"
        type="search"
        role="searchbox"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Buscar por título, plataforma, categoría, etiquetas o autor…"
        className="w-full rounded border border-[#b8c4ca] bg-white py-2.5 pl-9 pr-9 text-sm text-[#294d5a] transition placeholder:text-[#87969c] focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-500"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Limpiar búsqueda"
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-[#819198] transition hover:text-brand-700"
        >
          ✕
        </button>
      )}
    </div>
  );
}
