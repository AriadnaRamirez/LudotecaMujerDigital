import { Link } from "react-router-dom";
import type { Resource } from "../../types";
import { Badge } from "../Badge/Badge";
import { DifficultyBadge } from "../Badge/DifficultyBadge";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { ShareButton } from "../ShareButton/ShareButton";
import { useFavorites } from "../../hooks/useFavorites";
import { useCompleted } from "../../hooks/useCompleted";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompleted, toggleCompleted } = useCompleted();

  const favorite = isFavorite(resource.id);
  const completed = isCompleted(resource.id);
  const detailUrl = `/recurso/${resource.id}`;
  const shareUrl = `${window.location.origin}${detailUrl}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <Link
        to={detailUrl}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        aria-label={`Ver detalle de ${resource.title}`}
      />

      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        <img
          src={resource.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        {completed && (
          <span className="absolute left-2 top-2 z-20 inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white shadow">
            <span aria-hidden="true">✅</span> Completado
          </span>
        )}
        <div className="absolute right-2 top-2 z-20">
          <Badge tone="neutral" className="bg-white/90 backdrop-blur">
            {resource.type}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-4">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span>{resource.platform}</span>
          <span aria-hidden="true">•</span>
          <span>{resource.topic}</span>
        </div>

        <h3 className="line-clamp-2 text-base font-semibold text-slate-900">
          {resource.title}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={resource.difficulty} />
          <Badge tone="info">⏱ {resource.durationLabel}</Badge>
          <Badge tone="neutral">{resource.language}</Badge>
        </div>

        {resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-50 px-2 py-0.5 text-xs text-slate-500"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="relative z-20 mt-auto flex items-center gap-2 pt-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(event) => event.stopPropagation()}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Ver recurso
          </a>
          <FavoriteButton
            isFavorite={favorite}
            onToggle={() => toggleFavorite(resource.id)}
            size="sm"
          />
          <ShareButton
            title={resource.title}
            text={resource.description}
            url={shareUrl}
            size="sm"
          />
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleCompleted(resource.id);
            }}
            aria-pressed={completed}
            aria-label={completed ? "Desmarcar como completado" : "Marcar como completado"}
            title={completed ? "Desmarcar como completado" : "Marcar como completado"}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border text-lg transition ${
              completed
                ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                : "border-slate-200 bg-white text-slate-400 hover:border-emerald-200 hover:text-emerald-500"
            }`}
          >
            <span aria-hidden="true">{completed ? "✅" : "⬜"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
