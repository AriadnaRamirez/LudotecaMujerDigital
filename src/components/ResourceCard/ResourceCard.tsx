import { Link } from "react-router-dom";
import type { Resource } from "../../types";
import { Badge } from "../Badge/Badge";
import { DifficultyBadge } from "../Badge/DifficultyBadge";
import { ShareButton } from "../ShareButton/ShareButton";
import { absoluteAppUrl } from "../../utils/share";
import { formatDate } from "../../utils/format";

interface ResourceCardProps {
  resource: Resource;
}

function text(value: string | undefined): string {
  return value?.trim() || "—";
}

/** Muestra en tarjeta todos los campos del objeto Resource (JSON). */
export function ResourceCard({ resource }: ResourceCardProps) {
  const detailUrl = `/recurso/${resource.id}`;
  const shareUrl = absoluteAppUrl(detailUrl);
  const tags = Array.isArray(resource.tags) ? resource.tags : [];

  return (
    <article className="group flex min-h-[540px] flex-col overflow-hidden rounded-[6px] border border-[#dfe5e8] bg-white transition hover:border-brand-300 hover:shadow-[0_4px_14px_rgba(18,82,99,0.10)]">
      <div className="relative h-32 w-full overflow-hidden bg-[#e7f4f5]">
        <Link
          to={detailUrl}
          aria-label={`Ver detalle de ${resource.title}`}
          className="absolute inset-0 z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        >
          <img
            src={resource.image}
            alt={resource.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </Link>
        <div className="pointer-events-none absolute left-2 top-2 z-20 flex flex-wrap gap-1">
          <Badge tone="brand" className="bg-brand-500 text-white shadow-none">
            {resource.type}
          </Badge>
          <Badge
            tone={resource.price === "Gratis" ? "success" : "warning"}
            className="shadow-none"
          >
            {resource.price}
          </Badge>
          <Badge tone="neutral" className="shadow-none">
            {resource.certificate ? "Con certificado" : "Sin certificado"}
          </Badge>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-3.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-medium text-[#65808a]">
          <span>{resource.platform}</span>
          <span className="text-brand-400" aria-hidden="true">
            •
          </span>
          <span>{resource.topic}</span>
        </div>

        <p className="font-mono text-[10px] text-[#8a9aa2]" title="id">
          {resource.id}
        </p>

        <h3 className="line-clamp-2 text-[15px] font-bold leading-snug text-[#17546a]">
          <Link
            to={detailUrl}
            className="rounded-sm transition hover:text-brand-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            {resource.title}
          </Link>
        </h3>

        <p className="line-clamp-3 text-[12px] leading-relaxed text-[#5f747c]">
          {resource.description}
        </p>

        <p className="text-[11px] text-[#6b8088]">
          Compartido por{" "}
          <span className="font-semibold text-[#49636d]">
            {text(resource.contributorName)}
          </span>
          {resource.author?.trim() ? (
            <>
              {" "}
              · Autor{" "}
              <span className="font-semibold text-[#49636d]">
                {resource.author.trim()}
              </span>
            </>
          ) : null}
        </p>

        <div className="flex flex-wrap items-center gap-1.5">
          <DifficultyBadge difficulty={resource.difficulty} />
          <Badge tone="info">{resource.durationLabel}</Badge>
          <Badge tone="neutral">{`${resource.duration} min`}</Badge>
          <Badge tone="neutral">{resource.language}</Badge>
        </div>

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5" aria-label="tags">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-[#f1f5f6] px-2 py-0.5 text-[11px] text-[#607781]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 border-t border-[#eef2f4] pt-2 text-[11px]">
          <MetaItem label="Publicado" value={formatDate(resource.publishedAt)} />
          <MetaItem
            label="Actualizado"
            value={formatDate(resource.updatedAt)}
          />
        </dl>

        <div className="space-y-1.5 rounded border border-[#eef2f4] bg-[#f8fafb] p-2.5 text-[11px] leading-relaxed">
          <FieldPreview
            label="Cómo lo descubrió"
            value={text(resource.discoveryContext)}
          />
          <FieldPreview
            label="Impacto"
            value={text(resource.impactReflection)}
          />
          <FieldPreview
            label="Por qué lo recomienda"
            value={text(resource.recommendationReason)}
          />
        </div>

        <p className="truncate text-[10px] text-[#819198]" title={resource.url}>
          {resource.url}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-1">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-1.5 rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
          >
            Abrir recurso
          </a>
          <Link
            to={detailUrl}
            className="flex items-center justify-center rounded border border-brand-600 bg-white px-3 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
          >
            Detalle
          </Link>
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

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[9px] font-semibold uppercase tracking-wide text-[#90a0a7]">
        {label}
      </dt>
      <dd className="truncate font-medium text-[#325663]" title={value}>
        {value}
      </dd>
    </div>
  );
}

function FieldPreview({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-wide text-[#90a0a7]">
        {label}
      </p>
      <p className="line-clamp-2 text-[#5b717a]">{value}</p>
    </div>
  );
}
