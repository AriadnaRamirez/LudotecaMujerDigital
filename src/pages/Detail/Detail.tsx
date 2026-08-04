import { useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { getAllResources, getResourceById } from "../../hooks/useResources";
import { useFavorites } from "../../hooks/useFavorites";
import { useCompleted } from "../../hooks/useCompleted";
import { DifficultyBadge } from "../../components/Badge/DifficultyBadge";
import { Badge } from "../../components/Badge/Badge";
import { FavoriteButton } from "../../components/FavoriteButton/FavoriteButton";
import { ShareButton } from "../../components/ShareButton/ShareButton";
import { ResourceCard } from "../../components/ResourceCard/ResourceCard";
import { formatDate } from "../../utils/format";

export function Detail() {
  const { id } = useParams<{ id: string }>();
  const resource = id ? getResourceById(id) : undefined;
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isCompleted, toggleCompleted } = useCompleted();

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

  const favorite = isFavorite(resource.id);
  const completed = isCompleted(resource.id);
  const shareUrl = `${window.location.origin}/recurso/${resource.id}`;
  const relatedResources = [...related, ...relatedFallback];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <nav aria-label="Migas de pan" className="mb-4 text-sm text-slate-500">
        <Link to="/" className="font-medium text-brand-600 hover:underline">
          ← Volver a recursos
        </Link>
      </nav>

      <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="relative h-56 w-full overflow-hidden bg-slate-100 sm:h-72">
          <img src={resource.image} alt="" className="h-full w-full object-cover" />
          {completed && (
            <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white shadow">
              <span aria-hidden="true">✅</span> Completado
            </span>
          )}
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <span>{resource.platform}</span>
            <span aria-hidden="true">•</span>
            <span>{resource.topic}</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
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

          <p className="mt-5 text-base leading-relaxed text-slate-600">
            {resource.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-700"
            >
              Abrir recurso <span aria-hidden="true">↗</span>
            </a>
            <FavoriteButton isFavorite={favorite} onToggle={() => toggleFavorite(resource.id)} />
            <ShareButton
              title={resource.title}
              text={resource.description}
              url={shareUrl}
              variant="full"
            />
            <button
              type="button"
              onClick={() => toggleCompleted(resource.id)}
              aria-pressed={completed}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition ${
                completed
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
              }`}
            >
              <span aria-hidden="true">{completed ? "✅" : "⬜"}</span>
              {completed ? "Completado" : "Marcar como completado"}
            </button>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-x-6 gap-y-4 border-t border-slate-100 pt-6 sm:grid-cols-2 lg:grid-cols-3">
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
          <h2 id="related-title" className="text-xl font-bold text-slate-900">
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
      <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm font-medium text-slate-800">{value}</dd>
    </div>
  );
}
