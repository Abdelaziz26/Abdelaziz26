import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { formatPrice } from '@/lib/format';
import { updateOrderStatus } from '../actions';

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: { items: true }
  });

  if (!order) {
    notFound();
  }

  const customer = order.customer as { name?: string; email?: string; address?: string };

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
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm text-gray-500">
                <div>
                  <p className="text-ink-900">{item.title}</p>
                  <p className="text-xs text-gray-400">Qty {item.quantity}</p>
                </div>
                <p>{formatPrice(item.price * item.quantity, order.currency as 'USD' | 'EUR', 'en')}</p>
              </div>
            ))}
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
          <form action={updateOrderStatus.bind(null, order.id)} className="rounded-3xl border border-gray-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Status</h2>
            <select
              name="status"
              defaultValue={order.status}
              className="mt-4 w-full rounded-2xl border border-gray-200 px-4 py-3"
            >
              {['pending', 'paid', 'shipped', 'cancelled'].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button className="mt-4 w-full rounded-full bg-ink-900 px-6 py-3 text-sm text-white">Update status</button>
          </form>
        </div>
      </div>
    </div>
  );
}
