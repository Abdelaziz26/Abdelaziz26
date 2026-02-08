import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';

export default async function OrdersPage() {
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Operations</p>
        <h1 className="mt-3 text-3xl font-semibold">Orders</h1>
      </div>
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4"
            >
              <div>
                <p className="text-sm font-medium text-ink-900">#{order.id.slice(0, 6)}</p>
                <p className="text-xs text-gray-400">{order.status.toUpperCase()}</p>
              </div>
              <p className="text-sm text-gray-500">{formatPrice(order.total, order.currency as 'USD' | 'EUR', 'en')}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
