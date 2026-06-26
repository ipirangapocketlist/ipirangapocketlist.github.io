import { CATEGORIAS } from '../data/categorias';
import type { Categoria } from '../types/lugar';

interface CategoryFilterProps {
  active: Categoria | 'todos';
  onChange: (categoria: Categoria | 'todos') => void;
}

export default function CategoryFilter({ active, onChange }: CategoryFilterProps) {
  return (
    <div
      className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin"
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
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-ipiranga-amber focus:ring-offset-2 ${
              isActive
                ? 'bg-ipiranga-green text-white shadow-sm'
                : 'bg-white text-ipiranga-muted hover:bg-ipiranga-warm hover:text-ipiranga-text'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
