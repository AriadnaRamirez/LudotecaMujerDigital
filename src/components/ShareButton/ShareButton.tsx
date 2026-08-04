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
      setFeedback("Compartido");
    } else if (result.method === "clipboard" && result.success) {
      setFeedback("Enlace copiado");
    } else if (result.method !== "web-share") {
      setFeedback("No se pudo compartir");
    } else {
      return;
    }

    window.setTimeout(() => setFeedback(null), 2500);
  }

  const sizeClasses = size === "sm" ? "h-10 w-10" : "h-10 w-10";

  return (
    <div className="relative inline-flex">
      <button
        type="button"
        onClick={handleShare}
        aria-label="Compartir recurso"
        title="Compartir recurso"
        className={
          variant === "icon"
            ? `inline-flex items-center justify-center rounded-sm border border-line bg-surface text-muted transition hover:border-brand-400 hover:text-brand-800 ${sizeClasses} ${className}`
            : `inline-flex items-center justify-center gap-2 rounded-sm border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink/80 transition hover:border-brand-400 hover:text-brand-800 ${className}`
        }
      >
        <svg
          viewBox="0 0 20 20"
          className="h-4 w-4"
          fill="none"
          aria-hidden="true"
        >
          <circle cx="5" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15" cy="5" r="2" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="15" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="m6.8 9.1 6.4-3.2M6.8 10.9l6.4 3.2"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
        {variant === "full" && <span>Compartir</span>}
      </button>
      <span role="status" aria-live="polite" className="sr-only">
        {feedback}
      </span>
      {feedback && (
        <span
          className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-ink px-2.5 py-1 text-xs font-medium text-surface"
          aria-hidden="true"
        >
          {feedback}
        </span>
      )}
    </div>
  );
}
