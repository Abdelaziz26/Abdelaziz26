import { Currency } from '@/lib/types';

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92
};

export const formatPrice = (price: number, currency: Currency) => {
  const value = price * rates[currency];
  return new Intl.NumberFormat(currency === 'EUR' ? 'fr-FR' : 'en-US', {
    style: 'currency',
    currency
  }).format(value);
};
