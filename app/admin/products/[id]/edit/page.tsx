import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { ProductForm } from '../../product-form';

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({ where: { id: params.id } });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Catalog</p>
        <h1 className="mt-3 text-3xl font-semibold">Edit product</h1>
      </div>
      <ProductForm
        mode="edit"
        initialValues={{
          id: product.id,
          title: product.title,
          description: product.description,
          price: product.price,
          currency: product.currency,
          category: product.category,
          brand: product.brand,
          stock: product.stock,
          rating: product.rating,
          images: (product.images as string[]).join(', '),
          tags: (product.tags as string[] | null)?.join(', ') ?? ''
        }}
      />
    </div>
  );
}
