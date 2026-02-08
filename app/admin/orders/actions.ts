'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function updateOrderStatus(orderId: string, formData: FormData) {
  const status = String(formData.get('status') ?? 'pending');
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as 'pending' | 'paid' | 'shipped' | 'cancelled' }
  });

  redirect(`/admin/orders/${orderId}`);
}
