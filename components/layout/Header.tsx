'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, Search, ShoppingBag, User, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import { locales } from '@/lib/i18n';
import { useTranslations } from '@/lib/useTranslations';
import { cn } from '@/lib/utils';

export function Header() {
  const { toggleCart, currency, setCurrency, locale, setLocale } = useUIStore((state) => state);
  const t = useTranslations();
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!megaRef.current) return;
      if (!megaRef.current.contains(event.target as Node)) {
        setMegaOpen(false);
      }
    }

    if (megaOpen) {
      document.addEventListener('mousedown', handleClick);
    }

    return () => document.removeEventListener('mousedown', handleClick);
  }, [megaOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="container-padded flex items-center justify-between py-5">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Aurum
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-gray-500 lg:flex">
          <Link href="/category/clothing" className="hover:text-ink-900">
            {t.nav.clothing}
          </Link>
          <Link href="/category/phones" className="hover:text-ink-900">
            {t.nav.phones}
          </Link>
          <Link href="/category/accessories" className="hover:text-ink-900">
            {t.nav.accessories}
          </Link>
          <div className="relative" ref={megaRef}>
            <button
              onClick={() => setMegaOpen((open) => !open)}
              className="inline-flex items-center gap-2 text-ink-900"
              aria-expanded={megaOpen}
              aria-controls="mega-menu"
            >
              {t.nav.shop}
            </button>
            <AnimatePresence>
              {megaOpen ? (
                <motion.div
                  id="mega-menu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-10 z-50 w-[520px] rounded-3xl border border-gray-100 bg-white p-6 shadow-soft"
                >
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Collections</p>
                      <div className="mt-4 grid gap-2 text-sm text-gray-500">
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
                    <div className="rounded-2xl bg-gray-50 p-4 text-xs text-gray-500">
                      <p className="text-ink-900">Aurum Private</p>
                      <p className="mt-2">Exclusive capsule drops, concierge sourcing, and white-glove delivery.</p>
                      <Link href="/category/clothing" className="mt-4 inline-flex text-ink-900">
                        Explore the edit →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </nav>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-xs lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={16} />
          </button>
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
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ duration: 0.25 }}
              className="h-full w-[280px] bg-white p-6 shadow-soft"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">Aurum</p>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>
              <div className="mt-6 space-y-4 text-sm text-gray-500">
                <Link href="/category/clothing" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
                  {t.nav.clothing}
                </Link>
                <Link href="/category/phones" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
                  {t.nav.phones}
                </Link>
                <Link href="/category/accessories" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
                  {t.nav.accessories}
                </Link>
                <Link href="/account" className="block rounded-xl px-3 py-2 hover:bg-gray-50">
                  {t.nav.account}
                </Link>
              </div>
              <div className="mt-6 rounded-2xl border border-gray-100 p-4 text-xs text-gray-500">
                Global shipping · 24/7 concierge · Curated drops
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
