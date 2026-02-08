import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import { deleteProduct } from './actions';

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
            <div
              key={product.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4"
            >
              <div>
                <p className="text-sm font-medium text-ink-900">{product.title}</p>
                <p className="text-xs text-gray-400">
                  {product.category} · {product.brand}
                </p>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span>{formatPrice(product.price, product.currency as 'USD' | 'EUR', 'en')}</span>
                <Link href={`/admin/products/${product.id}/edit`} className="text-ink-900">
                  Edit
                </Link>
                <form action={deleteProduct.bind(null, product.id)}>
                  <button className="text-red-500" type="submit">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
