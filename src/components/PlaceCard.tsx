import type { Place } from '../types/lugar';
import { CATEGORIA_LABELS } from '../data/categorias';

interface PlaceCardProps {
  place: Place;
  index?: number;
}

export default function PlaceCard({ place, index }: PlaceCardProps) {
  return (
    <article className="card-swiss group flex h-full flex-col p-6">
      <div className="mb-4 flex items-start justify-between gap-3">
        <span className="swiss-label border border-swiss-black px-2 py-1">
          {CATEGORIA_LABELS[place.categoria]}
        </span>
        {index !== undefined && (
          <span className="font-mono text-xs text-swiss-gray-400">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      {place.entorno && (
        <span className="mb-3 inline-block w-fit border-b-2 border-swiss-red pb-0.5 text-[10px] font-bold uppercase tracking-widest text-swiss-red">
          Entorno
        </span>
      )}

      <h3 className="text-xl font-bold leading-tight tracking-tight">
        <a href={`/lugares/${place.slug}`} className="hover:text-swiss-red focus:outline-none focus:ring-2 focus:ring-swiss-red focus:ring-offset-2">
          {place.nome}
        </a>
      </h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-swiss-gray-600">
        {place.bairro}
      </p>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-swiss-gray-600">
        {place.descricao.split('\n\n')[0]}
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-swiss-gray-200 pt-4">
        <a
          href={`/lugares/${place.slug}`}
          className="text-xs font-semibold uppercase tracking-widest hover:text-swiss-red focus:outline-none focus:ring-2 focus:ring-swiss-red focus:ring-offset-2"
        >
          Ver detalhes →
        </a>
        {place.links.instagram && (
          <a
            href={place.links.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-swiss px-4 py-2 text-[10px]"
          >
            Instagram
          </a>
        )}
      </div>
    </article>
  );
}
