'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useUIStore((state) => state.locale);
  const currency = useUIStore((state) => state.currency);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    document.cookie = `aurum-locale=${locale}; path=/; max-age=31536000`;
    document.cookie = `aurum-currency=${currency}; path=/; max-age=31536000`;
    window.localStorage.setItem('aurum-locale', locale);
    window.localStorage.setItem('aurum-currency', currency);
  }, [locale, currency]);

  return <>{children}</>;
}
