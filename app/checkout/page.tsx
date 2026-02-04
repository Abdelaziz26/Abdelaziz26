'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { PageTransition } from '@/components/layout/PageTransition';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTranslations } from '@/lib/useTranslations';

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
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<CheckoutValues>({ resolver: zodResolver(schema) });

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{t.section.checkout}</p>
            <h1 className="mt-3 text-4xl font-semibold">{t.section.checkout}</h1>
          </div>
          <form onSubmit={handleSubmit(() => undefined)} className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
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
              <Button type="submit" className="w-full">
                {isSubmitSuccessful ? 'Submitted' : t.checkout.placeOrder}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </PageTransition>
  );
}
