import { Product } from '@/lib/types';
import { normalizeImages } from '@/lib/normalizeImages';
import { parseJson } from '@/lib/serialization';

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
  images: normalizeImages(product.images),
  stock: product.stock,
  tags: parseJson<string[]>(product.tags as string | null, []),
  rating: product.rating,
  brand: product.brand,
  variants: parseJson<Product['variants']>(product.variants as string | null, [])
});
