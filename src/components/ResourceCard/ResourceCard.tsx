import { Link } from "react-router-dom";
import type { Resource } from "../../types";
import { Badge } from "../Badge/Badge";
import { DifficultyBadge } from "../Badge/DifficultyBadge";
import { ShareButton } from "../ShareButton/ShareButton";
import { absoluteAppUrl } from "../../utils/share";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const detailUrl = `/recurso/${resource.id}`;
  const shareUrl = absoluteAppUrl(detailUrl);
  const contributor = resource.contributorName?.trim();
  const tags = Array.isArray(resource.tags) ? resource.tags.slice(0, 3) : [];

  return (
    <article className="group flex min-h-[360px] flex-col overflow-hidden rounded-sm border border-line/90 bg-surface/90 transition duration-300 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-[0_18px_40px_-28px_rgba(28,45,39,0.45)]">
      <div className="relative h-36 w-full overflow-hidden bg-brand-100">
        <Link
          to={detailUrl}
          aria-label={`Ver detalle de ${resource.title}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <img
            src={resource.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </Link>
        <div className="pointer-events-none absolute left-3 top-3 z-20">
          <Badge tone="brand">{resource.type}</Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide text-muted">
          <span>{resource.platform}</span>
          <span className="text-brass/70" aria-hidden="true">
            /
          </span>
          <span>{resource.topic}</span>
        </div>

        <h3 className="font-display text-[1.35rem] font-semibold leading-snug tracking-tight text-ink">
          <Link
            to={detailUrl}
            className="transition hover:text-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {resource.title}
          </Link>
        </h3>

        {contributor && (
          <p className="text-[12px] text-muted">
            Por{" "}
            <span className="font-medium text-ink/80">{contributor}</span>
          </p>
        )}

        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={resource.difficulty} />
          <Badge tone="info">{resource.durationLabel}</Badge>
          <Badge tone="neutral">{resource.language}</Badge>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto flex items-center gap-2 pt-2">
          <Link
            to={detailUrl}
            className="flex flex-1 items-center justify-center rounded-sm bg-brand-800 px-3 py-2.5 text-sm font-medium tracking-wide text-surface transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Ver detalle
          </Link>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center rounded-sm border border-line bg-surface px-3 py-2.5 text-sm font-medium text-ink/80 transition hover:border-brand-400 hover:text-brand-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Abrir
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
