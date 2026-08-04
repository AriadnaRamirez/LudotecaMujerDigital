interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  legend: string;
  options: Option[];
  selected: string[];
  onToggle: (value: string) => void;
  name: string;
}

export function CheckboxGroup({
  legend,
  options,
  selected,
  onToggle,
  name,
}: CheckboxGroupProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-slate-800">{legend}</legend>
      <div className="mt-2 flex flex-col gap-1.5">
        {options.map((option) => {
          const inputId = `${name}-${option.value}`;
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              htmlFor={inputId}
              className="flex cursor-pointer items-center gap-2.5 rounded-lg px-1.5 py-1 text-sm text-slate-600 transition hover:bg-slate-50"
            >
              <input
                id={inputId}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={() => onToggle(option.value)}
                className="h-4 w-4 rounded border-slate-300 text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
