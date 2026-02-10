'use client';

import { useEffect } from 'react';
import { cn } from '@/lib/utils';

type ToastProps = {
  message: string;
  variant?: 'success' | 'error';
  onDismiss?: () => void;
};

export function Toast({ message, variant = 'success', onDismiss }: ToastProps) {
  useEffect(() => {
    if (!onDismiss) return;
    const timer = window.setTimeout(onDismiss, 3000);
    return () => window.clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div
      role="status"
      className={cn(
        'fixed bottom-6 right-6 z-50 rounded-2xl px-4 py-3 text-sm shadow-soft',
        variant === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
      )}
    >
      {message}
    </div>
  );
}
