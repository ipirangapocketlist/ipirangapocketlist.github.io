import type { Place } from '../types/lugar';
import { CATEGORIA_LABELS, getCategoriaColor } from '../data/categorias';

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  return (
    <a
      href={`/lugares/${place.slug}`}
      className="group flex flex-col rounded-2xl border border-ipiranga-warm bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-ipiranga-amber focus:ring-offset-2"
    >
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {place.categorias.map((cat) => (
          <span
            key={cat}
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoriaColor(cat)}`}
          >
            {CATEGORIA_LABELS[cat]}
          </span>
        ))}
        {place.entorno && (
          <span className="rounded-full bg-ipiranga-green/10 px-2.5 py-0.5 text-xs font-medium text-ipiranga-green">
            Entorno
          </span>
        )}
      </div>
      <h3 className="font-display mb-1 text-lg font-semibold text-ipiranga-green group-hover:text-ipiranga-green-light">
        {place.nome}
      </h3>
      <p className="text-sm text-ipiranga-muted">{place.bairro}</p>
      <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-ipiranga-text">
        {place.descricao.split('\n\n')[0]}
      </p>
      <span className="mt-4 text-sm font-medium text-ipiranga-amber group-hover:text-ipiranga-amber-light">
        Ver detalhes &rarr;
      </span>
    </a>
  );
}
