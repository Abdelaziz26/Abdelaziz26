'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Rating } from './Rating';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/format';
import { useUIStore } from '@/store/ui';

export function ProductCard({ product }: { product: Product }) {
  const currency = useUIStore((state) => state.currency);

  return (
    <Link
      href={`/product/${product.id}`}
      className="group flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-5 transition hover:shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-medium text-ink-900">{product.title}</h3>
          <Badge>{product.brand}</Badge>
        </div>
        <Rating value={product.rating} />
        <p className="text-sm text-gray-500">{formatPrice(product.price, currency)}</p>
      </div>
    </Link>
  );
}
