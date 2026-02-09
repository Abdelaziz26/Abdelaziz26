import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { stringifyJson } from '@/lib/serialization';
import { productSchema } from '@/lib/adminValidation';

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
  const parsed = productSchema.safeParse({
    ...body,
    price: Number(body.price),
    stock: Number(body.stock ?? 0),
    rating: Number(body.rating ?? 4.5)
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const product = await prisma.product.update({
    where: { id: context.params.id },
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      price: parsed.data.price,
      currency: parsed.data.currency,
      category: parsed.data.category,
      brand: parsed.data.brand,
      stock: parsed.data.stock,
      rating: parsed.data.rating,
      images: stringifyJson(parsed.data.images),
      tags: stringifyJson(parsed.data.tags),
      variants: stringifyJson(parsed.data.variants)
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
