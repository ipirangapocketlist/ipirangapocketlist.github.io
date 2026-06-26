import type { Categoria } from './lugar';

export interface VizinhoRecomendacao {
  slug: string;
  nome: string;
  categoria: Categoria;
  endereco: string;
  horario: string;
  descricao: string;
  dica: string;
  instagram: string;
  site?: string | null;
  maps?: string;
}

export interface VizinhoBairro {
  slug: string;
  bairro: string;
  introducao: string;
  recomendacoes: VizinhoRecomendacao[];
}
