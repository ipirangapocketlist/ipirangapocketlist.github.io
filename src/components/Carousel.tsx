import { useCallback, useEffect, useState, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface CarouselProps {
  children: ReactNode;
  ariaLabel: string;
}

export default function Carousel({ children, ariaLabel }: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: false,
  });

  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [snapCount, setSnapCount] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-swiss-black pt-6">
        <div className="flex items-center gap-3" aria-label={ariaLabel}>
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canPrev}
            className="carousel-btn"
            aria-label="Anterior"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M19 12H5M11 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canNext}
            className="carousel-btn"
            aria-label="Próximo"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        {snapCount > 1 && (
          <div className="flex items-center gap-2">
            <span className="swiss-label tabular-nums">
              {String(selectedIndex + 1).padStart(2, '0')}
              <span className="text-swiss-gray-400"> / </span>
              {String(snapCount).padStart(2, '0')}
            </span>
            <div className="hidden h-px w-16 bg-swiss-gray-200 sm:block">
              <div
                className="h-full bg-swiss-red transition-all duration-300"
                style={{ width: `${((selectedIndex + 1) / snapCount) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function CarouselSlide({ children }: { children: ReactNode }) {
  return <div className="embla__slide">{children}</div>;
}
