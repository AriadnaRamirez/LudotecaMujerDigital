import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAllResources, getResourceById } from "../../hooks/useResources";
import { DifficultyBadge } from "../../components/Badge/DifficultyBadge";
import { Badge } from "../../components/Badge/Badge";
import { ShareButton } from "../../components/ShareButton/ShareButton";
import { ResourceCard } from "../../components/ResourceCard/ResourceCard";
import { formatDate } from "../../utils/format";
import { absoluteAppUrl } from "../../utils/share";

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

  const shareUrl = absoluteAppUrl(`/recurso/${resource.id}`);
  const relatedResources = [...related, ...relatedFallback];
  const tags = Array.isArray(resource.tags) ? resource.tags : [];

  return (
    <div className="mx-auto max-w-[1080px] px-4 py-8 sm:px-7 animate-rise">
      <nav aria-label="Migas de pan" className="mb-6">
        <Link
          to="/"
          className="text-sm font-medium tracking-wide text-muted transition hover:text-brand-700"
        >
          Volver al catálogo
        </Link>
      </nav>

      <article className="overflow-hidden rounded-sm border border-line bg-surface/95 shadow-[0_24px_60px_-40px_rgba(23,27,26,0.45)]">
        <div className="relative h-56 w-full overflow-hidden bg-brand-100 sm:h-72">
          <img
            src={resource.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
        </div>

        <div className="p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.12em] uppercase text-muted">
            <span>{resource.platform}</span>
            <span aria-hidden="true" className="text-brass/80">
              /
            </span>
            <span>{resource.topic}</span>
            <span aria-hidden="true" className="text-brass/80">
              /
            </span>
            <span>{resource.type}</span>
          </div>

          <p className="mt-3 text-sm text-muted">
            Compartido por{" "}
            <span className="font-medium text-ink">
              {resource.contributorName?.trim() || "—"}
            </span>
          </p>

          <h1 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
            {resource.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <DifficultyBadge difficulty={resource.difficulty} />
            <Badge tone="info">{resource.durationLabel}</Badge>
            <Badge tone="neutral">{resource.language}</Badge>
            <Badge tone={resource.price === "Gratis" ? "success" : "warning"}>
              {resource.price}
            </Badge>
            <Badge tone="brand">
              {resource.certificate ? "Con certificado" : "Sin certificado"}
            </Badge>
          </div>

          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
            {resource.description}
          </p>

          {tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-1" aria-label="Etiquetas">
              {tags.map((tag) => (
                <span key={tag} className="text-xs tracking-wide text-muted">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-brand-800 px-5 py-2.5 text-sm font-medium tracking-wide text-surface transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Abrir recurso
            </a>
            <ShareButton
              title={resource.title}
              text={resource.description}
              url={shareUrl}
              variant="full"
            />
          </div>

          <section
            aria-labelledby="contribution-title"
            className="mt-10 border-t border-line pt-8"
          >
            <h2
              id="contribution-title"
              className="font-display text-2xl font-semibold text-ink"
            >
              Aportación
            </h2>
            <p className="mt-1 text-sm text-muted">
              Reflexión de quien comparte este recurso
            </p>

            <dl className="mt-6 grid gap-6">
              <ContributionAnswer
                question="Recurso compartido"
                answer={resource.title}
              />
              <ContributionAnswer
                question="Cómo lo descubrió"
                answer={resource.discoveryContext}
              />
              <ContributionAnswer
                question="Impacto personal o profesional"
                answer={resource.impactReflection}
              />
              <ContributionAnswer
                question="Por qué lo recomienda"
                answer={resource.recommendationReason}
              />
            </dl>
          </section>

          <section
            aria-labelledby="specs-title"
            className="mt-10 border-t border-line pt-8"
          >
            <h2
              id="specs-title"
              className="font-display text-2xl font-semibold text-ink"
            >
              Ficha completa
            </h2>
            <p className="mt-1 text-sm text-muted">
              Todos los campos de la entrada en el catálogo
            </p>

            <dl className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem label="Identificador" value={resource.id} />
              <InfoItem
                label="Participante"
                value={resource.contributorName?.trim() || "—"}
              />
              <InfoItem label="Autor" value={resource.author?.trim() || "—"} />
              <InfoItem label="Plataforma" value={resource.platform} />
              <InfoItem label="Tema" value={resource.topic} />
              <InfoItem label="Tipo" value={resource.type} />
              <InfoItem label="Nivel" value={resource.difficulty} />
              <InfoItem
                label="Duración"
                value={`${resource.durationLabel} (${resource.duration} min)`}
              />
              <InfoItem label="Idioma" value={resource.language} />
              <InfoItem label="Precio" value={resource.price} />
              <InfoItem
                label="Certificado"
                value={resource.certificate ? "Sí" : "No"}
              />
              <InfoItem label="Etiquetas" value={tags.join(", ") || "—"} />
              <InfoItem
                label="Publicación"
                value={formatDate(resource.publishedAt)}
              />
              <InfoItem
                label="Actualización"
                value={formatDate(resource.updatedAt)}
              />
              <InfoItem label="Enlace" value={resource.url} />
              <InfoItem label="Imagen" value={resource.image} />
              <InfoItem
                label="Descripción"
                value={resource.description}
                className="sm:col-span-2 lg:col-span-3"
              />
            </dl>
          </section>
        </div>
      </article>

      {relatedResources.length > 0 && (
        <section aria-labelledby="related-title" className="mt-12">
          <h2
            id="related-title"
            className="font-display text-2xl font-semibold text-ink"
          >
            Relacionados
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedResources.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoItem({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
        {label}
      </dt>
      <dd className="mt-1 break-words text-sm leading-relaxed text-ink">
        {value}
      </dd>
    </div>
  );
}

function ContributionAnswer({
  question,
  answer,
}: {
  question: string;
  answer?: string;
}) {
  return (
    <div className="border-l border-brass/50 pl-4">
      <dt className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted">
        {question}
      </dt>
      <dd className="mt-1.5 text-sm leading-relaxed text-ink/90">
        {answer?.trim() || "—"}
      </dd>
    </div>
  );
}
