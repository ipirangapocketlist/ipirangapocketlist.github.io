import type { VizinhoBairro } from '../../types/vizinho';

export const vilaMariana: VizinhoBairro = {
  slug: 'vila-mariana',
  bairro: 'Vila Mariana',
  introducao:
    'Colada ao Ipiranga, a Vila Mariana é vizinha de carteirinha — a poucos minutos de metrô ou ônibus. Bairro boêmio e residencial, mistura bares de rua, lanchonetes históricas e cafés que parecem sala de estar.',
  recomendacoes: [
    {
      slug: 'sao-carlos-lanches',
      nome: 'São Carlos Lanches',
      categoria: 'comida',
      endereco: 'Rua Major Maragliano, 433, Vila Mariana',
      horario: 'Diariamente, 17h30 às 22h30',
      descricao:
        'Hamburgueria tradicional da Vila Mariana. Salão na França Pinto e delivery na Major Maragliano — referência entre moradores da região.',
      dica: 'Peça pelo iFood ou retire pelo WhatsApp.',
      instagram: 'https://www.instagram.com/saocarloslanches/',
      site: 'https://www.saocarloslanches.com.br',
      maps: 'https://maps.google.com/?q=Rua+Major+Maragliano+433+Vila+Mariana',
    },
    {
      slug: 'bequinho-da-vm',
      nome: 'Bequinho da VM',
      categoria: 'comida',
      endereco: 'Rua Doutor Álvaro Alvim, 153, Vila Mariana',
      horario: 'Consulte horários no Instagram',
      descricao:
        '“Parece bar mas é lar” — cafés, bagels, drinks e ambiente acolhedor na Alvaro Alvim.',
      dica: 'Confira o link na bio do @bequinhodavm.',
      instagram: 'https://www.instagram.com/bequinhodavm/',
      site: 'https://linktr.ee/bequinhodavm',
      maps: 'https://maps.google.com/?q=Rua+Doutor+Alvaro+Alvim+153+Vila+Mariana',
    },
    {
      slug: 'belisco-vila-mariana',
      nome: 'Belisco',
      categoria: 'lazer',
      endereco: 'Rua Doutor Álvaro Alvim, 22, Vila Mariana',
      horario: 'Seg–Sex 11h–1h · Sáb 17h–0h',
      descricao:
        'Bar e restaurante com petiscos, parmegiana e pagode às quintas — ambiente descontraído e preços em conta.',
      dica: 'Quinta-feira é dia de pagode — chegue cedo.',
      instagram: 'https://www.instagram.com/beliscovilamariana/',
      site: 'https://linktr.ee/beliscovilamariana',
      maps: 'https://maps.google.com/?q=Rua+Doutor+Alvaro+Alvim+22+Vila+Mariana',
    },
  ],
};
