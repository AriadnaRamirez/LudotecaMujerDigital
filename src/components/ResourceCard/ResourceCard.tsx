import { Link } from "react-router-dom";
import type { Resource } from "../../types";
import { Badge } from "../Badge/Badge";
import { DifficultyBadge } from "../Badge/DifficultyBadge";
import { ShareButton } from "../ShareButton/ShareButton";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const detailUrl = `/recurso/${resource.id}`;
  const shareUrl = `${window.location.origin}${detailUrl}`;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden bg-slate-100">
        <Link
          to={detailUrl}
          aria-label={`Ver detalle de ${resource.title}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <img
            src={resource.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute right-2 top-2 z-20">
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
          <Link
            to={detailUrl}
            className="rounded-sm transition hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {resource.title}
          </Link>
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

        <div className="mt-auto flex items-center gap-2 pt-2">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Ver recurso
          </a>
          <ShareButton
            title={resource.title}
            text={resource.description}
            url={shareUrl}
            size="sm"
          />
        </div>
      </div>
    </article>
  );
}
