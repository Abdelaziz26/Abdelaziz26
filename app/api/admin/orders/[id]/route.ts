import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function GET(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const order = await prisma.order.findUnique({
    where: { id: context.params.id },
    include: { items: true }
  });

  if (!order) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(order);
}

export async function PATCH(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const body = await request.json();

  if (!body.status) {
    return NextResponse.json({ error: 'Status required' }, { status: 400 });
  }

  const order = await prisma.order.update({
    where: { id: context.params.id },
    data: { status: body.status }
  });

  return NextResponse.json(order);
}
