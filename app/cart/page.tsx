'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PageTransition } from '@/components/layout/PageTransition';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { formatPrice } from '@/lib/format';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslations } from '@/lib/useTranslations';

export default function CartPage() {
  const { items, updateQuantity, removeItem } = useCartStore((state) => state);
  const currency = useUIStore((state) => state.currency);
  const t = useTranslations();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{t.section.cart}</p>
            <h1 className="mt-3 text-4xl font-semibold">{t.section.cart}</h1>
          </div>
          {items.length === 0 ? (
            <div className="rounded-3xl border border-gray-100 p-10 text-center text-sm text-gray-500">
              <p>{t.cart.empty}</p>
              <Link href="/">
                <Button variant="secondary" className="mt-4">
                  {t.cart.cta}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-6 rounded-3xl border border-gray-100 p-6">
                    <div className="relative h-28 w-24 overflow-hidden rounded-2xl bg-gray-50">
                      <Image src={item.product.images[0]} alt={item.product.title} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-base font-medium">{item.product.title}</h2>
                          <p className="text-xs text-gray-400">{item.product.brand}</p>
                        </div>
                        <button onClick={() => removeItem(item.product.id)} className="text-xs text-gray-400">
                          Remove
                        </button>
                      </div>
                      <p className="text-sm text-gray-500">{formatPrice(item.product.price, currency)}</p>
                      <div className="mt-2 flex items-center gap-3">
                        <Button
                          variant="secondary"
                          onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                        >
                          -
                        </Button>
                        <span className="text-sm">{item.quantity}</span>
                        <Button variant="secondary" onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-6 rounded-3xl border border-gray-100 p-6">
                <div>
                  <h3 className="text-lg font-semibold">Order Summary</h3>
                  <p className="mt-1 text-xs text-gray-400">Review totals and apply a coupon.</p>
                </div>
                <Input placeholder="Coupon code" />
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total, currency)}</span>
                  </div>
                </div>
                <Link href="/checkout">
                  <Button className="w-full">Proceed to checkout</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageTransition>
  );
}
