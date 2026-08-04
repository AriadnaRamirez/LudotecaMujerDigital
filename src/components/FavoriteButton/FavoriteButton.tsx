interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  className?: string;
  size?: "sm" | "md";
}

export function FavoriteButton({
  isFavorite,
  onToggle,
  className = "",
  size = "md",
}: FavoriteButtonProps) {
  const sizeClasses = size === "sm" ? "h-9 w-9 text-lg" : "h-11 w-11 text-xl";

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onToggle();
      }}
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      title={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
      className={`inline-flex items-center justify-center rounded-lg border transition ${sizeClasses} ${
        isFavorite
          ? "border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100"
          : "border-slate-200 bg-white text-slate-400 hover:border-rose-200 hover:text-rose-500"
      } ${className}`}
    >
      <span aria-hidden="true">{isFavorite ? "❤️" : "🤍"}</span>
    </button>
  );
}
