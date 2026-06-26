import type { Categoria } from '../types/lugar';
import { CATEGORIAS } from '../data/categorias';

interface CategoryFilterProps {
  active: Categoria | 'todos';
  onChange: (categoria: Categoria | 'todos') => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      className="filter-scroll flex gap-0 overflow-x-auto border-b border-swiss-black scrollbar-hide"
      role="tablist"
      aria-label="Filtrar por categoria"
    >
      {CATEGORIAS.map((cat) => {
        const isActive = active === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id as Categoria | 'todos')}
            className={`relative shrink-0 px-3 py-3 text-[11px] font-semibold uppercase tracking-widest transition-colors focus:outline-none focus:ring-2 focus:ring-swiss-red focus:ring-inset sm:px-6 sm:text-xs ${
              isActive
                ? 'bg-swiss-black text-swiss-white'
                : 'text-swiss-gray-600 hover:bg-swiss-gray-100 hover:text-swiss-black'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
