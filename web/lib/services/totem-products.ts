export type TotemProduct = {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
};

export type TotemCategory = {
  id: string;
  slug: string;
  name: string;
};

// Mocks para o MVP do totem (fase 3.2) focados em peças de ar-condicionado
export const TOG_MOCK_CATEGORIES: TotemCategory[] = [
  { id: "cat-1", slug: "refrigeracao", name: "Refrigeração" },
  { id: "cat-2", slug: "eletrica", name: "Elétrica" },
  { id: "cat-3", slug: "instalacao", name: "Instalação" },
];

export const TOG_MOCK_PRODUCTS: TotemProduct[] = [
  // Refrigeração
  {
    id: "p-1",
    name: 'Filtro Secador 1/4"',
    description:
      'Filtro secador para linha de cobre 1/4", indicado para splits e unidades condensadoras.',
    price: 29.9,
    category: "refrigeracao",
  },
  {
    id: "p-2",
    name: 'Válvula de Serviço 1/4"',
    description:
      "Válvula de serviço para unidades condensadoras, corpo em latão de alta durabilidade.",
    price: 42.5,
    category: "refrigeracao",
  },
  {
    id: "p-3",
    name: 'Tubo de Cobre 3/8" x 5m',
    description:
      'Tubo de cobre rígido 3/8" para linhas de refrigeração, fornecido em barra de 5 metros.',
    price: 159.0,
    category: "refrigeracao",
  },
  // Elétrica
  {
    id: "p-4",
    name: "Capacitor 35µF 440V",
    description:
      "Capacitor permanente para motores de ventilador e compressores de ar-condicionado.",
    price: 59.9,
    category: "eletrica",
  },
  {
    id: "p-5",
    name: "Capacitor 50µF 440V",
    description:
      "Capacitor permanente de alta confiabilidade para compressores monofásicos.",
    price: 74.9,
    category: "eletrica",
  },
  {
    id: "p-6",
    name: "Placa Eletrônica Universal Split",
    description:
      "Placa universal para splits até 24.000 BTUs, acompanha sensor e chicote padrão.",
    price: 289.0,
    category: "eletrica",
  },
  // Instalação
  {
    id: "p-7",
    name: "Suporte Condensadora 18.000 BTUs",
    description:
      "Suporte metálico reforçado com pintura epóxi para unidades condensadoras até 18.000 BTUs.",
    price: 89.9,
    category: "instalacao",
  },
  {
    id: "p-8",
    name: 'Mangueira Dreno 5/8" x 10m',
    description:
      "Mangueira corrugada para dreno de ar-condicionado, rolo com 10 metros.",
    price: 49.9,
    category: "instalacao",
  },
  {
    id: "p-9",
    name: 'Isolante Térmico 3/8" x 2m',
    description:
      'Isolante térmico em espuma elastomérica para tubos de cobre 3/8".',
    price: 24.9,
    category: "instalacao",
  },
];

