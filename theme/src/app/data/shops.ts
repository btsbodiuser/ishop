export interface ShopInfo {
  id: string;
  name: string;
  nameMn: string;
  description: string;
  descriptionMn: string;
  color: string;
  bgColor: string;
  categories: string[];
}

export const shops: ShopInfo[] = [
  {
    id: 'emart',
    name: 'E-mart',
    nameMn: 'И-март',
    description: 'Korea\'s largest retailer for home appliances and groceries',
    descriptionMn: 'Солонгосын хамгийн том гэр ахуйн бараа, хүнсний бүтээгдэхүүний сүлжээ',
    color: 'text-red-600',
    bgColor: 'bg-red-50',
    categories: ['home-appliance', 'supplement'],
  },
  {
    id: 'costco',
    name: 'Costco',
    nameMn: 'Костко',
    description: 'Premium wholesale products and appliances',
    descriptionMn: 'Дэлхийн түвшний чанартай бөөний худалдааны бүтээгдэхүүн',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    categories: ['home-appliance', 'supplement'],
  },
  {
    id: 'lotte',
    name: 'Lotte Mart',
    nameMn: 'Лотте Март',
    description: 'Global brands and premium products',
    descriptionMn: 'Дэлхийн брэндүүд болон дээд зэрэглэлийн бүтээгдэхүүн',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    categories: ['home-appliance', 'beauty', 'supplement'],
  },
  {
    id: 'olive-young',
    name: 'Olive Young',
    nameMn: 'Олив Янг',
    description: 'Korea\'s #1 beauty and health store',
    descriptionMn: 'Солонгосын #1 гоо сайхан, эрүүл мэндийн дэлгүүр',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    categories: ['beauty', 'supplement'],
  },
  {
    id: 'gs25',
    name: 'GS25',
    nameMn: 'ЖиЭс25',
    description: 'Convenience store chain with everyday essentials',
    descriptionMn: 'Өдөр тутмын хэрэгцээт бүтээгдэхүүний сүлжээ дэлгүүр',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    categories: ['supplement'],
  },
  {
    id: 'homeplus',
    name: 'Homeplus',
    nameMn: 'Хоумплас',
    description: 'Major retailer for home and lifestyle products',
    descriptionMn: 'Гэр ахуй болон амьдралын хэв маягийн бүтээгдэхүүний том сүлжээ',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    categories: ['home-appliance', 'beauty'],
  },
  {
    id: 'coupang',
    name: 'Coupang',
    nameMn: 'Купанг',
    description: 'Korea\'s leading e-commerce platform',
    descriptionMn: 'Солонгосын тэргүүлэх цахим худалдааны платформ',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50',
    categories: ['home-appliance', 'beauty', 'supplement'],
  },
  {
    id: 'daiso',
    name: 'Daiso',
    nameMn: 'Дайсо',
    description: 'Affordable quality products for daily life',
    descriptionMn: 'Өдөр тутмын амьдралд зориулсан боломжийн үнэтэй чанартай бараа',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50',
    categories: ['home-appliance', 'beauty'],
  },
];

export const getShopInfo = (shopId: string): ShopInfo | undefined => {
  return shops.find(s => s.id === shopId);
};

export const getShopsByCategory = (category: string): ShopInfo[] => {
  return shops.filter(s => s.categories.includes(category));
};