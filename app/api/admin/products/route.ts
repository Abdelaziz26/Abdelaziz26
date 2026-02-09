import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/admin';
import { stringifyJson } from '@/lib/serialization';
import { productSchema } from '@/lib/adminValidation';

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
  const parsed = productSchema.safeParse({
    ...body,
    price: Number(body.price),
    stock: Number(body.stock ?? 0),
    rating: Number(body.rating ?? 4.5)
  });
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const product = await prisma.product.create({
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

  return NextResponse.json(product, { status: 201 });
}
