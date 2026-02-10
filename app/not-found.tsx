import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="container-padded flex min-h-[60vh] flex-col items-center justify-center gap-4 py-16 text-center">
      <h1 className="text-3xl font-semibold">Page not found</h1>
      <p className="max-w-md text-sm text-gray-500">The page you are looking for doesn’t exist.</p>
      <Link href="/">
        <Button>Return home</Button>
      </Link>
    </div>
  );
}
