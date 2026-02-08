'use client';

import { useUIStore } from '@/store/ui';
import { translations } from '@/lib/i18n';

export const useTranslations = () => {
  const locale = useUIStore((state) => state.locale);
  return translations[locale];
};
