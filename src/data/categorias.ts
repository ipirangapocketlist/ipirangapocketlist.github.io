import type { Categoria } from '../types/lugar';

export interface CategoriaInfo {
  id: Categoria | 'todos';
  label: string;
}

export const CATEGORIAS: CategoriaInfo[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'comida', label: 'Comida' },
  { id: 'cultura', label: 'Cultura' },
  { id: 'lazer', label: 'Lazer' },
  { id: 'esporte', label: 'Esporte' },
  { id: 'compras', label: 'Compras' },
  { id: 'saude', label: 'Saúde' },
  { id: 'evento', label: 'Evento' },
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

export function getCategoriaColor(_categoria: Categoria): string {
  return 'border border-swiss-black bg-swiss-white text-swiss-black';
}
