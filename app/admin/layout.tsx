import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== 'admin') {
    redirect('/sign-in');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white">
        <div className="container-padded flex items-center justify-between py-4">
          <Link href="/admin" className="text-lg font-semibold">
            Aurum Admin
          </Link>
          <nav className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/admin" className="hover:text-ink-900">
              Dashboard
            </Link>
            <Link href="/admin/products" className="hover:text-ink-900">
              Products
            </Link>
            <Link href="/admin/orders" className="hover:text-ink-900">
              Orders
            </Link>
            <Link href="/" className="hover:text-ink-900">
              View store
            </Link>
          </nav>
        </div>
      </div>
      <main className="container-padded py-10">{children}</main>
    </div>
  );
}
