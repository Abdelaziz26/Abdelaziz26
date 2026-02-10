'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/lib/format';
import { Toast } from '@/components/ui/Toast';

type ProductRowProps = {
  id: string;
  title: string;
  category: string;
  brand: string;
  price: number;
  currency: string;
};

export function ProductRow({ id, title, category, brand, price, currency }: ProductRowProps) {
  const [status, setStatus] = useState<'idle' | 'deleting' | 'error'>('idle');
  const [toast, setToast] = useState<{ message: string; variant: 'success' | 'error' } | null>(null);

  async function handleDelete() {
    if (!window.confirm('Delete this product?')) return;
    setStatus('deleting');
    try {
      const response = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('Failed');
      }
      setToast({ message: 'Product deleted.', variant: 'success' });
      window.location.reload();
    } catch (error) {
      setStatus('error');
      setToast({ message: 'Delete failed.', variant: 'error' });
    }
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 p-4">
      <div>
        <p className="text-sm font-medium text-ink-900">{title}</p>
        <p className="text-xs text-gray-400">
          {category} · {brand}
        </p>
      </div>
      <div className="flex items-center gap-3 text-sm text-gray-500">
        <span>{formatPrice(price, currency as 'USD' | 'EUR', 'en')}</span>
        <Link href={`/admin/products/${id}/edit`} className="text-ink-900">
          Edit
        </Link>
        <button className="text-red-500" type="button" onClick={handleDelete} disabled={status === 'deleting'}>
          {status === 'deleting' ? 'Deleting...' : 'Delete'}
        </button>
      </div>
      {status === 'error' ? <p className="text-xs text-red-500">Delete failed.</p> : null}
      {toast ? <Toast message={toast.message} variant={toast.variant} onDismiss={() => setToast(null)} /> : null}
    </div>
  );
}
