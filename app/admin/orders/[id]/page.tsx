import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import { parseJson } from '@/lib/serialization';
import { OrderStatusForm } from '../order-status-form';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true }
  });

  if (!order) {
    notFound();
  }

  const customer = parseJson<{ name?: string; email?: string; address?: string }>(order.customer, {});

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Order</p>
        <h1 className="mt-3 text-3xl font-semibold">#{order.id.slice(0, 6)}</h1>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold">Items</h2>
          <div className="mt-4 space-y-3">
            {order.items.map((item) => {
              const options = parseJson<Record<string, string>>(item.options, {});
              return (
                <div key={item.id} className="flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <p className="text-ink-900">{item.title}</p>
                    <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                    {Object.keys(options).length > 0 ? (
                      <p className="text-xs text-gray-400">
                        {Object.entries(options)
                          .map(([key, value]) => `${key}: ${value}`)
                          .join(' · ')}
                      </p>
                    ) : null}
                  </div>
                  <p>{formatPrice(item.price * item.quantity, order.currency as 'USD' | 'EUR', 'en')}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-6 flex items-center justify-between text-sm font-semibold">
            <span>Total</span>
            <span>{formatPrice(order.total, order.currency as 'USD' | 'EUR', 'en')}</span>
          </div>
        </div>
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Customer</h2>
            <div className="mt-4 space-y-2 text-sm text-gray-500">
              <p>{customer.name}</p>
              <p>{customer.email}</p>
              <p>{customer.address}</p>
            </div>
          </div>
          <OrderStatusForm orderId={order.id} currentStatus={order.status} />
        </div>
      </div>
    </div>
  );
}
