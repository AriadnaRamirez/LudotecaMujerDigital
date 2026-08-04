import type { FilterState } from "../../types";
import {
  DIFFICULTY_OPTIONS,
  LANGUAGE_OPTIONS,
  PRICE_OPTIONS,
  TIME_OPTIONS,
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
  topicOptions: string[];
  typeOptions: string[];
  platformOptions: string[];
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
      className="group border-b border-line py-3 first:pt-0 last:border-b-0"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600">
        {title}
        <span
          className="text-muted transition group-open:rotate-180"
          aria-hidden="true"
        >
          v
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
  topicOptions,
  typeOptions,
  platformOptions,
}: FiltersProps) {
  const activeCount = countActiveFilters(filters);

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">
          Filtros
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="text-sm font-medium text-brand-700 transition hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Limpiar ({activeCount})
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

      <Section title="Área de impacto">
        <CheckboxGroup
          legend="Área de impacto"
          name="topic"
          options={topicOptions.map((topic) => ({ value: topic, label: topic }))}
          selected={filters.topic}
          onToggle={(value) => onToggle("topic", value)}
        />
      </Section>

      <Section title="Formato" defaultOpen={false}>
        <CheckboxGroup
          legend="Formato"
          name="type"
          options={typeOptions.map((type) => ({ value: type, label: type }))}
          selected={filters.type}
          onToggle={(value) => onToggle("type", value)}
        />
      </Section>

      <Section title="Plataforma / fuente" defaultOpen={false}>
        <CheckboxGroup
          legend="Plataforma o fuente"
          name="platform"
          options={platformOptions.map((platform) => ({
            value: platform,
            label: platform,
          }))}
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
