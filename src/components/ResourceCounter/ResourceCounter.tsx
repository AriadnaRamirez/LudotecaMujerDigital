interface ResourceCounterProps {
  total: number;
}

export function ResourceCounter({ total }: ResourceCounterProps) {
  return (
    <p className="text-sm font-medium text-slate-600" aria-live="polite">
      <span className="text-lg font-bold text-slate-900">{total}</span>{" "}
      {total === 1 ? "recurso encontrado" : "recursos encontrados"}
    </p>
  );
}

interface ShowingCounterProps {
  shown: number;
  total: number;
}

export function ShowingCounter({ shown, total }: ShowingCounterProps) {
  return (
    <p className="text-center text-sm text-slate-500" aria-live="polite">
      Mostrando <span className="font-semibold text-slate-700">{shown}</span> de{" "}
      <span className="font-semibold text-slate-700">{total}</span> recursos
    </p>
  );
}
