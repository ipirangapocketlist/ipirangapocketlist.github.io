import type { VizinhoBairro } from '../types/vizinho';
import { vilaMariana } from '../data/vizinhos/vila-mariana';

export function getAllVizinhosBairros(): VizinhoBairro[] {
  return [vilaMariana];
}
