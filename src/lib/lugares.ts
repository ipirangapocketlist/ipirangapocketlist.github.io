import type { Place } from '../types/lugar';

const modules = import.meta.glob<{ default: Place }>(
  '../content/lugares/*.json',
  { eager: true },
);

export function getAllLugares(): Place[] {
  return Object.values(modules)
    .map((mod) => mod.default)
    .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));
}

export function getLugarBySlug(slug: string): Place | undefined {
  return getAllLugares().find((lugar) => lugar.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllLugares().map((lugar) => lugar.slug);
}
