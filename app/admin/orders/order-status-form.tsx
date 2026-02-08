'use client';

import { useState } from 'react';

const statuses = ['pending', 'paid', 'shipped', 'cancelled'] as const;

type OrderStatus = (typeof statuses)[number];

export function OrderStatusForm({ orderId, currentStatus }: { orderId: string; currentStatus: OrderStatus }) {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [state, setState] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  async function updateStatus(event: React.FormEvent) {
    event.preventDefault();
    setState('saving');
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Failed');
      }

      setState('saved');
    } catch (error) {
      setState('error');
    }
  }

  return (
    <form onSubmit={updateStatus} className="rounded-3xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold">Status</h2>
      <select
        name="status"
        value={status}
        onChange={(event) => setStatus(event.target.value as OrderStatus)}
        className="mt-4 w-full rounded-2xl border border-gray-200 px-4 py-3"
      >
        {statuses.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      {state === 'saved' ? <p className="mt-3 text-xs text-emerald-500">Status updated.</p> : null}
      {state === 'error' ? <p className="mt-3 text-xs text-red-500">Update failed.</p> : null}
      <button
        className="mt-4 w-full rounded-full bg-ink-900 px-6 py-3 text-sm text-white"
        type="submit"
        disabled={state === 'saving'}
      >
        {state === 'saving' ? 'Updating...' : 'Update status'}
      </button>
    </form>
  );
}
