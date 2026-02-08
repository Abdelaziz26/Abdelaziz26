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
      className="group flex flex-col gap-4 rounded-3xl border border-gray-100 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-gray-50">
        <Image
          src={product.images[0]}
          alt={product.title}
          fill
          className="object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 opacity-0 transition group-hover:opacity-100" />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{product.category}</p>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-medium text-ink-900">{product.title}</h3>
          <Badge className="bg-gray-50 text-ink-700">{product.brand}</Badge>
        </div>
        <Rating value={product.rating} />
        <p className="text-base font-semibold text-ink-900">{formatPrice(product.price, currency)}</p>
      </div>
    </Link>
  );
}
