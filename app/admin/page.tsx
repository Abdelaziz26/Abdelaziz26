import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import Link from 'next/link';

export default async function AdminDashboard() {
  const [orders, products, lowStock] = await Promise.all([
    prisma.order.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
    prisma.product.findMany({ take: 5 }),
    prisma.product.findMany({ where: { stock: { lt: 5 } }, take: 5 })
  ]);
  const totalOrders = await prisma.order.count();
  const totalRevenue = await prisma.order.aggregate({ _sum: { total: true } });
  const totalProducts = await prisma.product.count();

  return (
    <div className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Overview</p>
        <h1 className="mt-3 text-3xl font-semibold">Dashboard</h1>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {[
          { label: 'Total orders', value: totalOrders },
          { label: 'Revenue', value: formatPrice(totalRevenue._sum.total ?? 0, 'USD', 'en') },
          { label: 'Total products', value: totalProducts }
        ].map((card) => (
          <div key={card.label} className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-400">{card.label}</p>
            <p className="mt-3 text-2xl font-semibold text-ink-900">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Recent orders</h2>
          <div className="mt-4 space-y-3 text-sm text-gray-500">
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between rounded-2xl border border-gray-100 p-4">
                  <div>
                    <p className="text-sm font-medium text-ink-900">#{order.id.slice(0, 6)}</p>
                    <p className="text-xs text-gray-400">{order.status.toUpperCase()}</p>
                  </div>
                  <p>{formatPrice(order.total, order.currency as 'USD' | 'EUR', 'en')}</p>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Top products</h2>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              {products.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <p>{product.title}</p>
                  <p className="text-ink-900">
                    {formatPrice(product.price, product.currency as 'USD' | 'EUR', 'en')}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Low stock</h2>
              <Link href="/admin/products" className="text-xs text-gray-400">
                View all
              </Link>
            </div>
            <div className="mt-4 space-y-3 text-sm text-gray-500">
              {lowStock.length === 0 ? (
                <p>All products are healthy.</p>
              ) : (
                lowStock.map((product) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <p>{product.title}</p>
                    <p className="text-ink-900">{product.stock} left</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
