import type { Categoria } from '../types/lugar';

export interface CategoriaInfo {
  id: Categoria | 'todos';
  label: string;
  color: string;
}

export const CATEGORIAS: CategoriaInfo[] = [
  { id: 'todos', label: 'Todos', color: 'bg-ipiranga-green text-white' },
  { id: 'comida', label: 'Comida', color: 'bg-orange-100 text-orange-800' },
  { id: 'cultura', label: 'Cultura', color: 'bg-purple-100 text-purple-800' },
  { id: 'lazer', label: 'Lazer', color: 'bg-blue-100 text-blue-800' },
  { id: 'esporte', label: 'Esporte', color: 'bg-green-100 text-green-800' },
  { id: 'compras', label: 'Compras', color: 'bg-pink-100 text-pink-800' },
  { id: 'saude', label: 'Saúde', color: 'bg-teal-100 text-teal-800' },
  { id: 'evento', label: 'Evento', color: 'bg-amber-100 text-amber-800' },
];

export const CATEGORIA_LABELS: Record<Categoria, string> = {
  comida: 'Comida',
  cultura: 'Cultura',
  lazer: 'Lazer',
  esporte: 'Esporte',
  compras: 'Compras',
  saude: 'Saúde',
  evento: 'Evento',
};

export function getCategoriaColor(categoria: Categoria): string {
  const info = CATEGORIAS.find((c) => c.id === categoria);
  return info?.color ?? 'bg-gray-100 text-gray-800';
}
