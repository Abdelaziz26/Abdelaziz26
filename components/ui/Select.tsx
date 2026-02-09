import { SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export function Select({ className, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        'w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-ink-900 focus:outline-none',
        className
      )}
      {...props}
    />
  );
}
