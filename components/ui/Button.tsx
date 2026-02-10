import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-ink-900 text-white hover:bg-ink-700',
  secondary: 'border border-ink-900 text-ink-900 hover:bg-ink-900 hover:text-white',
  ghost: 'text-ink-900 hover:bg-gray-100'
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({ className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition',
        variants[variant],
        className
      )}
      {...props}
    />
  );
}
