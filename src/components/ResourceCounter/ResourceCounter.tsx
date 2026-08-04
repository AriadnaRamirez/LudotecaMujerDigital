interface ResourceCounterProps {
  total: number;
}

export function ResourceCounter({ total }: ResourceCounterProps) {
  return (
    <p className="text-sm font-medium text-[#607781]" aria-live="polite">
      <span className="text-base font-bold text-[#183f4e]">{total}</span>{" "}
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
    <p className="text-center text-sm text-[#71858d]" aria-live="polite">
      Mostrando <span className="font-semibold text-[#345762]">{shown}</span> de{" "}
      <span className="font-semibold text-[#345762]">{total}</span> recursos
    </p>
  );
}
