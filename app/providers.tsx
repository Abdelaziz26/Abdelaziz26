'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/store/ui';

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useUIStore((state) => state.locale);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  return <>{children}</>;
}
