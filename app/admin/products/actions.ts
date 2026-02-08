'use server';

import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export async function createProduct(formData: FormData) {
  const images = String(formData.get('images') ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.product.create({
    data: {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      price: Number(formData.get('price') ?? 0),
      currency: String(formData.get('currency') ?? 'USD'),
      category: String(formData.get('category') ?? 'clothing'),
      brand: String(formData.get('brand') ?? ''),
      stock: Number(formData.get('stock') ?? 0),
      rating: Number(formData.get('rating') ?? 4.5),
      images,
      tags: String(formData.get('tags') ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      variants: []
    }
  });

  redirect('/admin/products');
}

export async function updateProduct(productId: string, formData: FormData) {
  const images = String(formData.get('images') ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  await prisma.product.update({
    where: { id: productId },
    data: {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      price: Number(formData.get('price') ?? 0),
      currency: String(formData.get('currency') ?? 'USD'),
      category: String(formData.get('category') ?? 'clothing'),
      brand: String(formData.get('brand') ?? ''),
      stock: Number(formData.get('stock') ?? 0),
      rating: Number(formData.get('rating') ?? 4.5),
      images,
      tags: String(formData.get('tags') ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }
  });

  redirect('/admin/products');
}

export async function deleteProduct(productId: string) {
  await prisma.product.delete({ where: { id: productId } });
  redirect('/admin/products');
}
