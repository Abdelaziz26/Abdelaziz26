export type Currency = 'USD' | 'EUR';

export type ProductVariant = {
  name: string;
  options: string[];
};

export type Product = {
  id: string;
  title: string;
  category: 'clothing' | 'phones' | 'accessories';
  price: number;
  currency: Currency;
  images: string[];
  stock: number;
  tags: string[];
  rating: number;
  brand: string;
  variants: ProductVariant[];
};

export type CartItem = {
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
};
