import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Place, Categoria } from '../types/lugar';
import CategoryFilter from './CategoryFilter';
import PlaceCard from './PlaceCard';

interface PlaceGridProps {
  places: Place[];
}

function filterPlaces(places: Place[], categoria: Categoria | 'todos'): Place[] {
  if (categoria === 'todos') return places;
  return places.filter((p) => p.categorias.includes(categoria));
}

export default function PlaceGrid({ places }: PlaceGridProps) {
  const [active, setActive] = useState<Categoria | 'todos'>('todos');
  const shouldReduceMotion = useReducedMotion();

  const filtered = useMemo(() => filterPlaces(places, active), [places, active]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    show: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: shouldReduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: -8, transition: { duration: 0.15 } },
  };

  return (
    <div>
      <CategoryFilter active={active} onChange={setActive} />
      <motion.div
        key={active}
        className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((place) => (
            <motion.div
              key={place.slug}
              layout={!shouldReduceMotion}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <PlaceCard place={place} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {filtered.length === 0 && (
        <p className="mt-8 text-center text-ipiranga-muted">
          Nenhum lugar nesta categoria.
        </p>
      )}
    </div>
  );
}
