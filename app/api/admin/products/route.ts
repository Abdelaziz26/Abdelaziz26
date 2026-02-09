import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { stringifyJson } from '@/lib/serialization';

export async function GET() {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const products = await prisma.product.findMany({ orderBy: { createdAt: 'desc' } });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if ('status' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }
  const body = await request.json();

  if (!body.title || body.price === undefined || !body.currency || !body.category) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      title: body.title,
      description: body.description ?? '',
      price: Number(body.price),
      currency: body.currency,
      category: body.category,
      brand: body.brand ?? '',
      stock: Number(body.stock ?? 0),
      rating: Number(body.rating ?? 4.5),
      images: stringifyJson(body.images ?? []),
      tags: stringifyJson(body.tags ?? []),
      variants: stringifyJson(body.variants ?? [])
    }
  });

  return NextResponse.json(product, { status: 201 });
}
