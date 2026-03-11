export type ProductType = 'ready' | 'preorder';

export type Category = 'home-appliance' | 'beauty' | 'supplement';

export type Shop = 'emart' | 'costco' | 'lotte' | 'olive-young';

export type OrderStatus = 'pending' | 'confirmed' | 'shipping' | 'delivered' | 'cancelled';

export interface Product {
  id: string;
  name: string;
  nameMn: string;
  category: Category;
  shop: Shop;
  type: ProductType;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  descriptionMn: string;
  stock?: number;
  preorderDate?: string;
  rating: number;
  reviews: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  total: number;
  shippingFee: number;
  status: OrderStatus;
  shippingAddress: {
    name: string;
    phone: string;
    district: string;
    khoroo: string;
    address: string;
    detailAddress: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  phone: string;
  name: string;
  email?: string;
  addresses: Address[];
  orders: Order[];
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  district: string;
  khoroo: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
}

export interface District {
  id: string;
  name: string;
  khoroos: string[];
}