'use client';

import { useState, type FormEvent } from 'react';
import { Toast } from '@/components/ui/Toast';

type ProductFormValues = {
  id?: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  brand: string;
  stock: number;
  rating: number;
  images: string;
  tags: string;
  variants: string;
};

export function ProductForm({
  initialValues,
  mode
}: {
  initialValues: ProductFormValues;
  mode: 'create' | 'edit';
}) {
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [error, setError] = useState('');
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState('saving');
    setError('');

    const formData = new FormData(event.currentTarget);
    let parsedVariants: unknown = [];
    const variantsRaw = String(formData.get('variants') ?? '').trim();
    if (variantsRaw) {
      try {
        parsedVariants = JSON.parse(variantsRaw);
      } catch {
        setState('error');
        setError('Variants must be valid JSON.');
        setToast({ message: 'Invalid JSON in variants.', variant: 'error' });
        return;
      }
    }

    const payload = {
      title: String(formData.get('title') ?? ''),
      description: String(formData.get('description') ?? ''),
      price: Number(formData.get('price') ?? 0),
      currency: String(formData.get('currency') ?? 'USD'),
      category: String(formData.get('category') ?? 'clothing'),
      brand: String(formData.get('brand') ?? ''),
      stock: Number(formData.get('stock') ?? 0),
      rating: Number(formData.get('rating') ?? 4.5),
      images: String(formData.get('images') ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      tags: String(formData.get('tags') ?? '')
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      variants: parsedVariants
    };

    if (!payload.title || Number.isNaN(payload.price) || !payload.currency || !payload.category) {
      setState('error');
      setError('Please fill all required fields.');
      return;
    }

    try {
      const response = await fetch(
        mode === 'create' ? '/api/admin/products' : `/api/admin/products/${initialValues.id}`,
        {
          method: mode === 'create' ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      );

      if (!response.ok) {
        throw new Error('Failed');
      }

      setState('saved');
      setToast({ message: 'Product saved.', variant: 'success' });
      if (mode === 'create') {
        window.location.href = '/admin/products';
      }
    } catch (err) {
      setState('error');
      setError('Unable to save product.');
      setToast({ message: 'Unable to save product.', variant: 'error' });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="title"
          placeholder="Title"
          defaultValue={initialValues.title}
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <input
          name="brand"
          placeholder="Brand"
          defaultValue={initialValues.brand}
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
      </div>
      <textarea
        name="description"
        placeholder="Description"
        defaultValue={initialValues.description}
        className="min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3"
        required
      />
      <div className="grid gap-4 md:grid-cols-3">
        <input
          name="price"
          placeholder="Price"
          type="number"
          step="0.01"
          defaultValue={initialValues.price}
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <input
          name="currency"
          placeholder="Currency (USD/EUR)"
          defaultValue={initialValues.currency}
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <input
          name="category"
          placeholder="Category"
          defaultValue={initialValues.category}
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <input
          name="stock"
          placeholder="Stock"
          type="number"
          defaultValue={initialValues.stock}
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <input
          name="rating"
          placeholder="Rating"
          type="number"
          step="0.1"
          defaultValue={initialValues.rating}
          className="rounded-2xl border border-gray-200 px-4 py-3"
        />
      </div>
      <input
        name="images"
        placeholder="Image URLs (comma separated)"
        defaultValue={initialValues.images}
        className="rounded-2xl border border-gray-200 px-4 py-3"
        required
      />
      <input
        name="tags"
        placeholder="Tags (comma separated)"
        defaultValue={initialValues.tags}
        className="rounded-2xl border border-gray-200 px-4 py-3"
      />
      <textarea
        name="variants"
        placeholder='Variants JSON (e.g. [{"name":"Size","options":["S","M"]}])'
        defaultValue={initialValues.variants}
        className="min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3 font-mono text-xs"
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
      {state === 'saved' ? <p className="text-sm text-emerald-500">Saved.</p> : null}
      <button
        className="rounded-full bg-ink-900 px-6 py-3 text-sm text-white"
        type="submit"
        disabled={state === 'saving'}
      >
        {state === 'saving' ? 'Saving...' : mode === 'create' ? 'Create product' : 'Save changes'}
      </button>
      {toast ? (
        <Toast message={toast.message} variant={toast.variant} onDismiss={() => setToast(null)} />
      ) : null}
    </form>
  );
}
