import { Product } from '@/lib/types';

export const mapProduct = (product: {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  images: unknown;
  stock: number;
  tags: unknown;
  rating: number;
  brand: string;
  variants: unknown;
}): Product => ({
  id: product.id,
  title: product.title,
  description: product.description,
  category: product.category as Product['category'],
  price: product.price,
  currency: product.currency as 'USD' | 'EUR',
  images: product.images as string[],
  stock: product.stock,
  tags: (product.tags as string[]) ?? [],
  rating: product.rating,
  brand: product.brand,
  variants: (product.variants as Product['variants']) ?? []
});
