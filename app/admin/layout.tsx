import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { authOptions } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/account?next=/admin');
  }

  if (session.user.role !== 'admin') {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 border-r border-gray-200 bg-white lg:flex lg:flex-col">
          <div className="px-6 py-6">
            <Link href="/admin" className="text-lg font-semibold">
              Aurum Admin
            </Link>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-gray-400">Control center</p>
          </div>
          <nav className="flex flex-1 flex-col gap-2 px-4 text-sm text-gray-500">
            <Link href="/admin" className="rounded-xl px-3 py-2 hover:bg-gray-50 hover:text-ink-900">
              Dashboard
            </Link>
            <Link href="/admin/products" className="rounded-xl px-3 py-2 hover:bg-gray-50 hover:text-ink-900">
              Products
            </Link>
            <Link href="/admin/orders" className="rounded-xl px-3 py-2 hover:bg-gray-50 hover:text-ink-900">
              Orders
            </Link>
            <Link href="/" className="rounded-xl px-3 py-2 hover:bg-gray-50 hover:text-ink-900">
              View store
            </Link>
          </nav>
        </aside>
        <div className="flex-1">
          <div className="border-b border-gray-200 bg-white lg:hidden">
            <div className="container-padded flex items-center justify-between py-4">
              <Link href="/admin" className="text-lg font-semibold">
                Aurum Admin
              </Link>
              <Link href="/" className="text-sm text-gray-500">
                View store
              </Link>
            </div>
          </div>
          <main className="container-padded py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
