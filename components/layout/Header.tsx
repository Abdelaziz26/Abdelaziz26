'use client';

import Link from 'next/link';
import { Search, ShoppingBag, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import { locales } from '@/lib/i18n';
import { useTranslations } from '@/lib/useTranslations';
import { cn } from '@/lib/utils';

export function Header() {
  const { toggleCart, currency, setCurrency, locale, setLocale } = useUIStore((state) => state);
  const t = useTranslations();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="container-padded flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Aurum
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-gray-500 lg:flex">
          <Link href="/category/clothing" className="hover:text-ink-900">
            {t.nav.clothing}
          </Link>
          <Link href="/category/phones" className="hover:text-ink-900">
            {t.nav.phones}
          </Link>
          <Link href="/category/accessories" className="hover:text-ink-900">
            {t.nav.accessories}
          </Link>
          <motion.div whileHover={{ y: -2 }} className="relative group">
            <span className="cursor-pointer text-ink-900">{t.nav.shop}</span>
            <div className="absolute left-0 top-6 hidden w-72 rounded-2xl border border-gray-100 bg-white p-4 shadow-soft group-hover:block lg:block">
              <p className="text-xs text-gray-400">Mega menu</p>
              <div className="mt-3 grid gap-2 text-sm">
                <Link href="/category/clothing" className="rounded-xl px-3 py-2 hover:bg-gray-50">
                  New season apparel
                </Link>
                <Link href="/category/phones" className="rounded-xl px-3 py-2 hover:bg-gray-50">
                  Flagship smartphones
                </Link>
                <Link href="/category/accessories" className="rounded-xl px-3 py-2 hover:bg-gray-50">
                  Accessories & audio
                </Link>
              </div>
            </div>
          </motion.div>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-xs text-gray-500 lg:flex">
            <Search size={14} />
            <input
              placeholder={t.nav.search}
              className="w-40 bg-transparent text-xs outline-none placeholder:text-gray-400"
              aria-label="Search"
            />
          </div>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value as 'USD' | 'EUR')}
            className="rounded-full border border-gray-200 bg-white px-3 py-2 text-xs"
            aria-label="Currency"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
          <select
            value={locale}
            onChange={(event) => setLocale(event.target.value as (typeof locales)[number])}
            className={cn(
              'rounded-full border border-gray-200 bg-white px-3 py-2 text-xs',
              locale === 'ar' && 'font-semibold'
            )}
            aria-label="Language"
          >
            {locales.map((loc) => (
              <option key={loc} value={loc}>
                {loc.toUpperCase()}
              </option>
            ))}
          </select>
          <button
            onClick={toggleCart}
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs"
          >
            <ShoppingBag size={14} />
            {t.nav.cart}
          </button>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-xs"
          >
            <User size={14} />
            {t.nav.account}
          </Link>
        </div>
      </div>
    </header>
  );
}
