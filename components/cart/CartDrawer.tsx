'use client';

import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui';
import { useCartStore } from '@/store/cart';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/format';
import { useTranslations } from '@/lib/useTranslations';
import { normalizeImages } from '@/lib/normalizeImages';

export function CartDrawer() {
  const { isCartOpen, setCartOpen, currency, locale } = useUIStore((state) => state);
  const { items, removeItem } = useCartStore((state) => state);
  const t = useTranslations();

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex justify-end bg-black/40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.aside
            initial={{ x: 320 }}
            animate={{ x: 0 }}
            exit={{ x: 320 }}
            transition={{ duration: 0.3 }}
            className="flex h-full w-full max-w-md flex-col bg-white"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 className="text-lg font-semibold">{t.section.cart}</h3>
              <button onClick={() => setCartOpen(false)} aria-label="Close cart">
                <X />
              </button>
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-4 text-sm text-gray-500">
                  <p>{t.cart.empty}</p>
                  <Button variant="secondary" onClick={() => setCartOpen(false)}>
                    {t.cart.cta}
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 rounded-2xl border border-gray-100 p-4">
                    <div className="relative h-20 w-16 overflow-hidden rounded-xl">
                      <Image
                        src={normalizeImages(item.product.images)[0]}
                        alt={item.product.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{item.product.title}</p>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-xs text-gray-400"
                        >
                          Remove
                        </button>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Qty {item.quantity}</p>
                      <p className="mt-2 text-sm">{formatPrice(item.product.price, currency, locale)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-gray-100 px-6 py-4">
              <div className="flex items-center justify-between text-sm">
                <span>Total</span>
                <span>
                  {formatPrice(
                    items.reduce((total, item) => total + item.product.price * item.quantity, 0),
                    currency,
                    locale
                  )}
                </span>
              </div>
              <div className="mt-4 flex gap-3">
                <Link href="/cart" className="flex-1">
                  <Button variant="secondary" className="w-full" onClick={() => setCartOpen(false)}>
                    View cart
                  </Button>
                </Link>
                <Link href="/checkout" className="flex-1">
                  <Button className="w-full" onClick={() => setCartOpen(false)}>
                    Checkout
                  </Button>
                </Link>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
