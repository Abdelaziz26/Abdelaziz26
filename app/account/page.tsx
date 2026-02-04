'use client';

import { PageTransition } from '@/components/layout/PageTransition';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTranslations } from '@/lib/useTranslations';

export default function AccountPage() {
  const t = useTranslations();

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
              <Input placeholder="Email" />
              <Input placeholder="Password" type="password" />
              <Button className="w-full">{t.account.signIn}</Button>
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
