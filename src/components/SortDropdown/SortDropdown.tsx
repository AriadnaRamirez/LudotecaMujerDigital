import type { SortOption } from "../../types";
import { SORT_OPTIONS } from "../../utils/constants";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium text-[#5c727b] whitespace-nowrap">
        Ordenar por
      </label>
      <select
        id="sort-select"
        value={value}
        onChange={(event) => onChange(event.target.value as SortOption)}
        className="rounded border border-[#b8c4ca] bg-white py-2 pl-3 pr-8 text-sm text-[#536a73] focus-visible:border-brand-500 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-brand-500"
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
