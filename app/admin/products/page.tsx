import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { ProductRow } from './product-row';

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Catalog</p>
          <h1 className="mt-3 text-3xl font-semibold">Products</h1>
        </div>
        <Link href="/admin/products/new" className="rounded-full bg-ink-900 px-6 py-3 text-sm text-white">
          Add product
        </Link>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="grid gap-4">
          {products.map((product) => (
            <ProductRow
              key={product.id}
              id={product.id}
              title={product.title}
              category={product.category}
              brand={product.brand}
              price={product.price}
              currency={product.currency}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
