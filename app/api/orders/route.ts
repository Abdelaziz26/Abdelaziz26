import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { stringifyJson } from '@/lib/serialization';

export async function POST(request: Request) {
  const body = await request.json();
  const { customer, items, currency } = body as {
    customer: { name: string; email: string; address: string };
    items: Array<{ productId: string; title: string; quantity: number; price: number; options?: Record<string, string> }>;
    currency: string;
  };

  if (!items || items.length === 0) {
    return NextResponse.json({ error: 'No items provided' }, { status: 400 });
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const order = await prisma.order.create({
    data: {
      status: 'pending',
      currency,
      total,
      customer: stringifyJson(customer),
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          title: item.title,
          quantity: item.quantity,
          price: item.price,
          options: stringifyJson(item.options ?? {})
        }))
      }
    }
  });

  return NextResponse.json({ id: order.id });
}
