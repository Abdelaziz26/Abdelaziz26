'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageTransition } from '@/components/layout/PageTransition';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTranslations } from '@/lib/useTranslations';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';
import { useState } from 'react';

const schema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email required'),
  address: z.string().min(4, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  country: z.string().min(2, 'Country is required')
});

type CheckoutValues = z.infer<typeof schema>;

export default function CheckoutPage() {
  const t = useTranslations();
  const { items, clear } = useCartStore((state) => state);
  const { currency } = useUIStore((state) => state);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<CheckoutValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: CheckoutValues) => {
    setStatus('submitting');
    const payload = {
      customer: {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        address: `${values.address}, ${values.city}, ${values.country}`
      },
      currency,
      items: items.map((item) => ({
        productId: item.product.id,
        title: item.product.title,
        quantity: item.quantity,
        price: item.product.price,
        options: item.selectedOptions
      }))
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      clear();
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{t.section.checkout}</p>
            <h1 className="mt-3 text-4xl font-semibold">{t.section.checkout}</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8 rounded-3xl border border-gray-100 p-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t.checkout.shipping}</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Input placeholder="First name" {...register('firstName')} />
                    {errors.firstName ? (
                      <p className="mt-2 text-xs text-red-500">{errors.firstName.message}</p>
                    ) : null}
                  </div>
                  <div>
                    <Input placeholder="Last name" {...register('lastName')} />
                    {errors.lastName ? (
                      <p className="mt-2 text-xs text-red-500">{errors.lastName.message}</p>
                    ) : null}
                  </div>
                </div>
                <div>
                  <Input placeholder="Email" {...register('email')} />
                  {errors.email ? <p className="mt-2 text-xs text-red-500">{errors.email.message}</p> : null}
                </div>
                <div>
                  <Input placeholder="Street address" {...register('address')} />
                  {errors.address ? <p className="mt-2 text-xs text-red-500">{errors.address.message}</p> : null}
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Input placeholder="City" {...register('city')} />
                    {errors.city ? <p className="mt-2 text-xs text-red-500">{errors.city.message}</p> : null}
                  </div>
                  <div>
                    <Input placeholder="Country" {...register('country')} />
                    {errors.country ? (
                      <p className="mt-2 text-xs text-red-500">{errors.country.message}</p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t.checkout.delivery}</h2>
                <div className="space-y-3 text-sm text-gray-500">
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
                    <input type="radio" name="delivery" defaultChecked />
                    Express 48h · Complimentary
                  </label>
                  <label className="flex items-center gap-3 rounded-2xl border border-gray-100 p-4">
                    <input type="radio" name="delivery" />
                    Standard 3-5 days · $25
                  </label>
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">{t.checkout.payment}</h2>
                <div className="rounded-2xl border border-gray-100 p-4 text-sm text-gray-500">
                  Secure payment placeholder. Connect your payment provider to enable transactions.
                </div>
              </div>
            </div>
            <div className="space-y-4 rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold">Order confirmation</h2>
              <p className="text-sm text-gray-500">
                Review your order and submit when ready. This is a UI-only checkout.
              </p>
              {status === 'success' ? (
                <p className="text-sm text-emerald-500">Order created. Check admin for details.</p>
              ) : null}
              {status === 'error' ? (
                <p className="text-sm text-red-500">Unable to create order. Try again.</p>
              ) : null}
              <Button type="submit" className="w-full" disabled={items.length === 0 || status === 'submitting'}>
                {status === 'success' || isSubmitSuccessful ? 'Submitted' : t.checkout.placeOrder}
              </Button>
              {items.length === 0 ? (
                <p className="text-xs text-gray-400">Add items to your cart before checking out.</p>
              ) : null}
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
