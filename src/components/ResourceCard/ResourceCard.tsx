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

  return (
    <article className="group flex min-h-[340px] flex-col overflow-hidden rounded-[6px] border border-[#dfe5e8] bg-white transition hover:border-brand-300 hover:shadow-[0_4px_14px_rgba(18,82,99,0.10)]">
      <div className="relative h-28 w-full overflow-hidden bg-[#e7f4f5]">
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
        <div className="pointer-events-none absolute left-2 top-2 z-20">
          <Badge tone="brand" className="bg-brand-500 text-white shadow-none">
            {resource.type}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex items-center gap-2 text-[11px] font-medium text-[#65808a]">
          <span>{resource.platform}</span>
          <span className="text-brand-400" aria-hidden="true">
            •
          </span>
          <span>{resource.topic}</span>
        </div>

        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#17546a]">
          <Link
            to={detailUrl}
            className="rounded-sm transition hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {resource.title}
          </Link>
        </h3>

        {contributor && (
          <p className="text-[11px] text-[#6b8088]">
            Compartido por{" "}
            <span className="font-semibold text-[#49636d]">{contributor}</span>
          </p>
        )}

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
                className="rounded bg-[#f1f5f6] px-2 py-0.5 text-[11px] text-[#607781]"
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
            className="flex flex-1 items-center justify-center gap-1.5 rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
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
