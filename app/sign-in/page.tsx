'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export default function AdminSignInPage() {
  const [error, setError] = useState('');

  async function onSubmit(formData: FormData) {
    setError('');
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const result = await signIn('credentials', {
      redirect: true,
      callbackUrl: '/admin',
      email,
      password
    });

    if (result?.error) {
      setError('Invalid credentials.');
    }
  }

  return (
    <div className="section-space">
      <div className="container-padded max-w-lg">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-soft">
          <h1 className="text-2xl font-semibold">Admin Sign In</h1>
          <p className="mt-2 text-sm text-gray-500">Access the Aurum commerce control center.</p>
          <form action={onSubmit} className="mt-6 space-y-4">
            <Input name="email" type="email" placeholder="Email" required />
            <Input name="password" type="password" placeholder="Password" required />
            {error ? <p className="text-xs text-red-500">{error}</p> : null}
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
