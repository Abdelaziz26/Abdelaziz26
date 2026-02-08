import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';

export async function GET(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const product = await prisma.product.findUnique({ where: { id: context.params.id } });

  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(product);
}

export async function PUT(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const body = await request.json();

  const product = await prisma.product.update({
    where: { id: context.params.id },
    data: {
      title: body.title,
      description: body.description ?? '',
      price: Number(body.price),
      currency: body.currency,
      category: body.category,
      brand: body.brand ?? '',
      stock: Number(body.stock ?? 0),
      rating: Number(body.rating ?? 4.5),
      images: body.images ?? [],
      tags: body.tags ?? [],
      variants: body.variants ?? []
    }
  });

  return NextResponse.json(product);
}

export async function DELETE(request: Request, context: { params: { id: string } }) {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  await prisma.product.delete({ where: { id: context.params.id } });
  return NextResponse.json({ status: 'ok' });
}
