import type { VizinhoBairro, VizinhoRecomendacao } from '../types/vizinho';
import { CATEGORIA_LABELS } from '../data/categorias';
import Carousel, { CarouselSlide } from './Carousel';

interface VizinhoCardProps {
  rec: VizinhoRecomendacao;
  index: number;
}

function VizinhoCard({ rec, index }: VizinhoCardProps) {
  return (
    <article className="card-swiss flex h-full flex-col p-4 sm:p-6">
      <div className="mb-4 flex items-start justify-between">
        <span className="swiss-label border border-swiss-black px-2 py-1">
          {CATEGORIA_LABELS[rec.categoria]}
        </span>
        <span className="font-mono text-xs text-swiss-gray-400">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <span className="mb-3 inline-block w-fit border-b-2 border-swiss-red pb-0.5 text-[10px] font-bold uppercase tracking-widest text-swiss-red">
        Vizinho
      </span>
      <h3 className="text-xl font-bold tracking-tight">{rec.nome}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-swiss-gray-600">
        {rec.endereco}
      </p>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-swiss-gray-600">
        {rec.descricao}
      </p>
      <p className="mt-4 border-l-2 border-swiss-red pl-3 text-xs text-swiss-gray-600">
        <span className="font-bold uppercase tracking-wider text-swiss-black">Dica — </span>
        {rec.dica}
      </p>
      <div className="mt-6 flex flex-col gap-2 border-t border-swiss-gray-200 pt-4 sm:flex-row sm:flex-wrap">
        <a href={rec.instagram} target="_blank" rel="noopener noreferrer" className="btn-swiss w-full py-2 px-4 text-[10px] sm:w-auto">
          Instagram
        </a>
        {rec.maps && (
          <a href={rec.maps} target="_blank" rel="noopener noreferrer" className="btn-swiss-outline w-full py-2 px-4 text-[10px] sm:w-auto">
            Mapa
          </a>
        )}
      </div>
    </article>
  );
}

interface VizinhosCarouselProps {
  bairro: VizinhoBairro;
}

export default function VizinhosCarousel({ bairro }: VizinhosCarouselProps) {
  return (
    <Carousel ariaLabel={`Carrossel ${bairro.bairro}`}>
      {bairro.recomendacoes.map((rec, i) => (
        <CarouselSlide key={rec.slug}>
          <VizinhoCard rec={rec} index={i} />
        </CarouselSlide>
      ))}
    </Carousel>
  );
}
