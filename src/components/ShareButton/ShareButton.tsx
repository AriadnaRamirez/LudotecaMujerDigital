import { useState } from "react";
import { shareResource } from "../../utils/share";

interface ShareButtonProps {
  title: string;
  text?: string;
  url: string;
  className?: string;
  size?: "sm" | "md";
  variant?: "icon" | "full";
}

export function ShareButton({
  title,
  text,
  url,
  className = "",
  size = "md",
  variant = "icon",
}: ShareButtonProps) {
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleShare(event: React.MouseEvent) {
    event.preventDefault();
    event.stopPropagation();

    const result = await shareResource({ title, text, url });

    if (result.method === "web-share" && result.success) {
      setFeedback("¡Compartido!");
    } else if (result.method === "clipboard" && result.success) {
      setFeedback("Enlace copiado al portapapeles");
    } else if (result.method !== "web-share") {
      setFeedback("No se pudo compartir el enlace");
    } else {
      return;
    }

    window.setTimeout(() => setFeedback(null), 2500);
  }

  const sizeClasses = size === "sm" ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl";

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Compartir recurso"
        title="Compartir recurso"
        className={
          variant === "icon"
            ? `inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition hover:border-brand-200 hover:text-brand-600 ${sizeClasses} ${className}`
            : `inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-brand-200 hover:text-brand-600 ${className}`
        }
      >
        <span aria-hidden="true">🔗</span>
        {variant === "full" && <span>Compartir</span>}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {feedback}
      </span>
      {feedback && (
        <span
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white shadow-lg"
          aria-hidden="true"
        >
          {feedback}
        </span>
      )}
    </div>
  );
}
