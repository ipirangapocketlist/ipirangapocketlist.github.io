export type Categoria =
  | 'comida'
  | 'cultura'
  | 'lazer'
  | 'esporte'
  | 'compras'
  | 'saude'
  | 'evento';

export type Preco = '$' | '$$' | '$$$' | 'gratuito' | 'variavel';

export interface Place {
  slug: string;
  nome: string;
  categorias: Categoria[];
  tags: string[];
  endereco: string;
  cep: string;
  bairro: string;
  entorno: boolean;
  horario: string;
  preco: Preco;
  telefone: string | null;
  site: string | null;
  descricao: string;
  dica: string;
  links: {
    maps: string;
  };
}
