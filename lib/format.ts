import { Currency } from '@/lib/types';
import { Locale } from '@/lib/i18n';

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92
};

const localeMap: Record<Locale, string> = {
  en: 'en-US',
  fr: 'fr-FR',
  ar: 'ar'
};

export const formatPrice = (price: number, currency: Currency, locale: Locale) => {
  const value = price * rates[currency];
  return new Intl.NumberFormat(localeMap[locale], {
    style: 'currency',
    currency
  }).format(value);
};
