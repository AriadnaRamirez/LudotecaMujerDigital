import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  resultsCount: number;
}

export function FiltersDrawer({
  isOpen,
  onClose,
  children,
  resultsCount,
}: FiltersDrawerProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div
        className="absolute inset-0 bg-[#173e4b]/45"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Filtros de búsqueda"
        className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-[#dfe5e8] px-4 py-3">
          <h2 className="text-base font-bold text-[#183f4e]">Filtros</h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cerrar filtros"
            className="flex h-9 w-9 items-center justify-center rounded text-[#667d86] transition hover:bg-brand-50"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">{children}</div>
        <div className="border-t border-[#dfe5e8] p-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Ver {resultsCount} {resultsCount === 1 ? "resultado" : "resultados"}
          </button>
        </div>
      </div>
    </div>
  );
}
