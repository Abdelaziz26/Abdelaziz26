import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function GET() {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(orders);
}
