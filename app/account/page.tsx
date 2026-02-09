'use client';

import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslations } from '@/lib/useTranslations';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState, type FormEvent } from 'react';

export default function AccountPage() {
  const t = useTranslations();
  const searchParams = useSearchParams();
  const [error, setError] = useState('');
  const message = searchParams.get('message');

  async function handleSignIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const next = searchParams.get('next') ?? '/admin';
    const result = await signIn('credentials', {
      redirect: false,
      callbackUrl: next,
      email,
      password
    });

    if (result?.error) {
      setError('Invalid credentials.');
      return;
    }

    window.location.href = next;
  }

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{t.section.account}</p>
            <h1 className="mt-3 text-4xl font-semibold">{t.section.account}</h1>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4 rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold">{t.account.signIn}</h2>
              {message === 'not-admin' ? (
                <p className="rounded-2xl bg-amber-50 px-4 py-3 text-xs text-amber-700">
                  Your account does not have admin access.
                </p>
              ) : null}
              <form onSubmit={handleSignIn} className="space-y-4">
                <Input name="email" placeholder="Email" type="email" required />
                <Input name="password" placeholder="Password" type="password" required />
                {error ? <p className="text-xs text-red-500">{error}</p> : null}
                <Button className="w-full" type="submit">
                  {t.account.signIn}
                </Button>
              </form>
              <p className="text-xs text-gray-400">
                Admin access requires credentials seeded in your environment.
              </p>
            </div>
            <div className="space-y-4 rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-semibold">{t.account.register}</h2>
              <Input placeholder="Full name" />
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
              <Button variant="secondary" className="w-full">
                {t.account.register}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
