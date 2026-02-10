import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        'w-full rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-gray-400 focus:border-ink-900 focus:outline-none',
        className
      )}
      {...props}
    />
  )
);

Input.displayName = 'Input';
