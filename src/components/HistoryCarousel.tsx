import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface HistoryCarouselProps {
  paragraphs: string[];
}

export default function HistoryCarousel({ paragraphs }: HistoryCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: true }),
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
    <div>
      <div className="embla__viewport overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {paragraphs.map((p, i) => (
            <div key={i} className="min-w-0 flex-[0_0_100%]">
              <p className={`text-lg leading-relaxed sm:text-xl ${i === 0 ? 'font-medium text-swiss-black' : 'text-swiss-gray-600'}`}>
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
