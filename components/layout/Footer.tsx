import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-padded grid gap-12 py-16 lg:grid-cols-[2fr_1fr_1fr_1fr]">
        <div>
          <h3 className="text-xl font-semibold">Aurum</h3>
          <p className="mt-4 text-sm text-gray-500">
            A global commerce destination for refined essentials, precision technology, and curated accessories.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Company</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>
              <Link href="/account" className="hover:text-ink-900">
                Account
              </Link>
            </li>
            <li>
              <Link href="/checkout" className="hover:text-ink-900">
                Checkout
              </Link>
            </li>
            <li>
              <Link href="/cart" className="hover:text-ink-900">
                Cart
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Support</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>Shipping & returns</li>
            <li>Payment methods</li>
            <li>Customer care</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold">Social</h4>
          <ul className="mt-4 space-y-2 text-sm text-gray-500">
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        © 2024 Aurum Global Commerce. All rights reserved.
      </div>
    </footer>
  );
}
