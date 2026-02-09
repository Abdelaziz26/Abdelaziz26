'use client';

import { Button } from '@/components/ui/Button';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="container-padded flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-gray-500">
        {error.message || 'An unexpected error occurred. Please try again.'}
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
