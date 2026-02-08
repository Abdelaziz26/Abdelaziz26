'use client';

import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/format';
import { useUIStore } from '@/store/ui';

export function PriceTag({ product }: { product: Product }) {
  const currency = useUIStore((state) => state.currency);
  const locale = useUIStore((state) => state.locale);

  return <p className="text-2xl font-semibold">{formatPrice(product.price, currency, locale)}</p>;
}
