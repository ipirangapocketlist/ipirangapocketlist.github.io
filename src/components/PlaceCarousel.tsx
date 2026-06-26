import { useEffect, useMemo, useState } from 'react';
import type { Place, Categoria } from '../types/lugar';
import CategoryFilter from './CategoryFilter';
import PlaceCard from './PlaceCard';
import Carousel, { CarouselSlide } from './Carousel';

interface PlaceCarouselProps {
  places: Place[];
}

function filterPlaces(places: Place[], categoria: Categoria | 'todos'): Place[] {
  if (categoria === 'todos') return places;
  return places.filter((p) => p.categoria === categoria);
}

export default function PlaceCarousel({ places }: PlaceCarouselProps) {
  const [active, setActive] = useState<Categoria | 'todos'>('todos');
  const [carouselKey, setCarouselKey] = useState(0);

  const filtered = useMemo(() => filterPlaces(places, active), [places, active]);

  useEffect(() => {
    setCarouselKey((k) => k + 1);
  }, [active]);

  return (
    <div>
      <CategoryFilter active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p className="mt-12 text-center text-sm text-swiss-gray-600">
          Nenhum lugar nesta categoria.
        </p>
      ) : (
        <div className="mt-8" key={carouselKey}>
          <Carousel ariaLabel="Carrossel de lugares">
            {filtered.map((place, i) => (
              <CarouselSlide key={place.slug}>
                <PlaceCard place={place} index={i} />
              </CarouselSlide>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
