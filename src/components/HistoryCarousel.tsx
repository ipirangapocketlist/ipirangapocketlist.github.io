import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface HistoryCarouselProps {
  paragraphs: string[];
}

const AUTOPLAY_DELAY_MS = 14000;

export default function HistoryCarousel({ paragraphs }: HistoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: AUTOPLAY_DELAY_MS, stopOnInteraction: true }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="min-w-0 w-full">
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {paragraphs.map((p, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%] pr-1">
              <p
                className={`text-[clamp(0.9375rem,2.8vw,1.25rem)] leading-relaxed break-words hyphens-auto ${i === 0 ? 'font-medium text-swiss-black' : 'text-swiss-gray-600'}`}
                lang="pt-BR"
              >
                {p}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex gap-2">
        {paragraphs.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Parágrafo ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-1 flex-1 transition-colors ${
              i === selectedIndex ? 'bg-swiss-red' : 'bg-swiss-gray-200 hover:bg-swiss-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
