import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAllResources, getResourceById } from "../../hooks/useResources";
import { DifficultyBadge } from "../../components/Badge/DifficultyBadge";
import { Badge } from "../../components/Badge/Badge";
import { ShareButton } from "../../components/ShareButton/ShareButton";
import { ResourceCard } from "../../components/ResourceCard/ResourceCard";
import { formatDate } from "../../utils/format";

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const resource = id ? getResourceById(id) : undefined;

  const related = useMemo(() => {
    if (!resource) return [];
    return getAllResources()
      .filter((item) => item.id !== resource.id && item.topic === resource.topic)
      .slice(0, 3);
  }, [resource]);

  const relatedFallback = useMemo(() => {
    if (!resource || related.length >= 3) return [];
    return getAllResources()
      .filter(
        (item) =>
          item.id !== resource.id &&
          item.topic !== resource.topic &&
          !related.includes(item)
      )
      .slice(0, 3 - related.length);
  }, [resource, related]);

  if (!resource) {
    return <Navigate to="/" replace />;
  }

  const shareUrl = `${window.location.origin}/recurso/${resource.id}`;
  const relatedResources = [...related, ...relatedFallback];

  return (
    <div className="mx-auto max-w-[1100px] px-4 py-6 sm:px-7">
      <nav aria-label="Migas de pan" className="mb-4 text-sm text-[#687e87]">
        <Link to="/" className="font-medium text-brand-600 hover:underline">
          ← Volver a recursos
        </Link>
      </nav>

      <article className="overflow-hidden rounded-[7px] border border-[#e0e5e8] bg-white shadow-[0_1px_3px_rgba(20,55,70,0.05)]">
        <div className="relative h-52 w-full overflow-hidden bg-[#e7f4f5] sm:h-64">
          <img src={resource.image} alt="" className="h-full w-full object-cover" />
        </div>

        <div className="p-5 sm:p-7">
          <div className="flex items-center gap-2 text-sm font-medium text-[#66808a]">
            <span>{resource.platform}</span>
            <span aria-hidden="true">•</span>
            <span>{resource.topic}</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-[#174554] sm:text-3xl">
            {resource.title}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={resource.difficulty} />
            <Badge tone="info">⏱ {resource.durationLabel}</Badge>
            <Badge tone="neutral">{resource.type}</Badge>
            <Badge tone="neutral">{resource.language}</Badge>
            <Badge tone={resource.price === "Gratis" ? "success" : "warning"}>
              {resource.price}
            </Badge>
            {resource.certificate && <Badge tone="brand">🎓 Certificado</Badge>}
          </div>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#596f78]">
            {resource.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Abrir recurso <span aria-hidden="true">↗</span>
            </a>
            <ShareButton
              title={resource.title}
              text={resource.description}
              url={shareUrl}
              variant="full"
            />
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-[#e8ecee] pt-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem label="Autor" value={resource.author ?? "No especificado"} />
            <InfoItem label="Categoría" value={resource.topic} />
            <InfoItem label="Duración" value={resource.durationLabel} />
            <InfoItem label="Nivel" value={resource.difficulty} />
            <InfoItem label="Idioma" value={resource.language} />
            <InfoItem label="Certificado" value={resource.certificate ? "Sí" : "No"} />
            <InfoItem label="Precio" value={resource.price} />
            <InfoItem label="Fecha de publicación" value={formatDate(resource.publishedAt)} />
            <InfoItem label="Fecha de actualización" value={formatDate(resource.updatedAt)} />
          </dl>
        </div>
      </article>

      {relatedResources.length > 0 && (
        <section aria-labelledby="related-title" className="mt-10">
          <h2 id="related-title" className="text-lg font-bold text-[#183f4e]">
            Recursos relacionados
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-[#82939a]">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-[#294f5c]">{value}</dd>
    </div>
  );
}
