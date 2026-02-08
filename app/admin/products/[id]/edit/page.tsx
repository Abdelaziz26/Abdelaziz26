import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { updateProduct } from '../../actions';

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
      <form action={updateProduct.bind(null, product.id)} className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input defaultValue={product.title} name="title" placeholder="Title" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input defaultValue={product.brand} name="brand" placeholder="Brand" className="rounded-2xl border border-gray-200 px-4 py-3" required />
        </div>
        <textarea
          defaultValue={product.description}
          name="description"
          placeholder="Description"
          className="min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <div className="grid gap-4 md:grid-cols-3">
          <input defaultValue={product.price} name="price" placeholder="Price" type="number" step="0.01" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input defaultValue={product.currency} name="currency" placeholder="Currency" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input defaultValue={product.category} name="category" placeholder="Category" className="rounded-2xl border border-gray-200 px-4 py-3" required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input defaultValue={product.stock} name="stock" placeholder="Stock" type="number" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input defaultValue={product.rating} name="rating" placeholder="Rating" type="number" step="0.1" className="rounded-2xl border border-gray-200 px-4 py-3" />
        </div>
        <input
          defaultValue={(product.images as string[]).join(', ')}
          name="images"
          placeholder="Image URLs (comma separated)"
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <input
          defaultValue={(product.tags as string[] | null)?.join(', ') ?? ''}
          name="tags"
          placeholder="Tags (comma separated)"
          className="rounded-2xl border border-gray-200 px-4 py-3"
        />
        <button className="rounded-full bg-ink-900 px-6 py-3 text-sm text-white">Save changes</button>
      </form>
    </div>
  );
}
