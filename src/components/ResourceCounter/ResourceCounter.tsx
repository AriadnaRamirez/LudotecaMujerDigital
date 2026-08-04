interface ResourceCounterProps {
  total: number;
}

export function ResourceCounter({ total }: ResourceCounterProps) {
  return (
    <p className="text-sm text-muted" aria-live="polite">
      <span className="font-semibold text-ink">{total}</span>{" "}
      {total === 1 ? "recurso" : "recursos"}
    </p>
  );
}

interface ShowingCounterProps {
  shown: number;
  total: number;
}

export function ShowingCounter({ shown, total }: ShowingCounterProps) {
  return (
    <p className="text-center text-sm text-muted" aria-live="polite">
      Mostrando <span className="font-medium text-ink">{shown}</span> de{" "}
      <span className="font-medium text-ink">{total}</span>
    </p>
  );
}
