import type { FilterState } from "../../types";
import {
  DIFFICULTY_OPTIONS,
  LANGUAGE_OPTIONS,
  PLATFORM_OPTIONS,
  PRICE_OPTIONS,
  TIME_OPTIONS,
  TOPIC_OPTIONS,
  TYPE_OPTIONS,
} from "../../utils/constants";
import { countActiveFilters } from "../../utils/filterResources";
import { CheckboxGroup } from "./CheckboxGroup";

type MultiKey =
  | "time"
  | "difficulty"
  | "topic"
  | "type"
  | "platform"
  | "language"
  | "certificate";

interface FiltersProps {
  filters: FilterState;
  onToggle: (key: MultiKey, value: string) => void;
  onTogglePrice: (value: FilterState["price"][number]) => void;
  onClear: () => void;
}

function Section({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details
      open={defaultOpen}
      className="group border-b border-slate-100 py-4 first:pt-0 last:border-b-0"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-slate-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
        {title}
        <span className="text-slate-400 transition group-open:rotate-180" aria-hidden="true">
          ▾
        </span>
      </summary>
      <div className="mt-3">{children}</div>
    </details>
  );
}

export function Filters({
  filters,
  onToggle,
  onTogglePrice,
  onClear,
}: FiltersProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-bold text-slate-900">Filtros</h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-brand-600 transition hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Limpiar todo ({activeCount})
          </button>
        )}
      </div>

      <Section title="Tiempo">
        <CheckboxGroup
          legend="Tiempo"
          name="time"
          options={TIME_OPTIONS.map((o) => ({ value: o.value, label: o.label }))}
          selected={filters.time}
          onToggle={(value) => onToggle("time", value)}
        />
      </Section>

      <Section title="Nivel">
        <CheckboxGroup
          legend="Nivel"
          name="difficulty"
          options={DIFFICULTY_OPTIONS.map((d) => ({ value: d, label: d }))}
          selected={filters.difficulty}
          onToggle={(value) => onToggle("difficulty", value)}
        />
      </Section>

      <Section title="Tema">
        <CheckboxGroup
          legend="Tema"
          name="topic"
          options={TOPIC_OPTIONS.map((t) => ({ value: t, label: t }))}
          selected={filters.topic}
          onToggle={(value) => onToggle("topic", value)}
        />
      </Section>

      <Section title="Tipo" defaultOpen={false}>
        <CheckboxGroup
          legend="Tipo"
          name="type"
          options={TYPE_OPTIONS.map((t) => ({ value: t, label: t }))}
          selected={filters.type}
          onToggle={(value) => onToggle("type", value)}
        />
      </Section>

      <Section title="Plataforma" defaultOpen={false}>
        <CheckboxGroup
          legend="Plataforma"
          name="platform"
          options={PLATFORM_OPTIONS.map((p) => ({ value: p, label: p }))}
          selected={filters.platform}
          onToggle={(value) => onToggle("platform", value)}
        />
      </Section>

      <Section title="Idioma" defaultOpen={false}>
        <CheckboxGroup
          legend="Idioma"
          name="language"
          options={LANGUAGE_OPTIONS.map((l) => ({ value: l, label: l }))}
          selected={filters.language}
          onToggle={(value) => onToggle("language", value)}
        />
      </Section>

      <Section title="Precio" defaultOpen={false}>
        <CheckboxGroup
          legend="Precio"
          name="price"
          options={PRICE_OPTIONS.map((p) => ({ value: p, label: p }))}
          selected={filters.price}
          onToggle={(value) => onTogglePrice(value as FilterState["price"][number])}
        />
      </Section>

      <Section title="Certificado" defaultOpen={false}>
        <CheckboxGroup
          legend="Certificado"
          name="certificate"
          options={[
            { value: "si", label: "Sí" },
            { value: "no", label: "No" },
          ]}
          selected={filters.certificate}
          onToggle={(value) => onToggle("certificate", value)}
        />
      </Section>
    </div>
  );
}
