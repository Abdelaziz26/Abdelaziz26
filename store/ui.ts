import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Currency } from '@/lib/types';
import { Locale } from '@/lib/i18n';

const getInitialLocale = (): Locale => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem('aurum-locale');
  if (stored === 'en' || stored === 'fr' || stored === 'ar') {
    return stored;
  }

  const cookieMatch = document.cookie.match(/(^|;\\s*)aurum-locale=([^;]+)/);
  if (cookieMatch && (cookieMatch[2] === 'en' || cookieMatch[2] === 'fr' || cookieMatch[2] === 'ar')) {
    return cookieMatch[2] as Locale;
  }

  return 'en';
};

const getInitialCurrency = (): Currency => {
  if (typeof window === 'undefined') {
    return 'USD';
  }
  const stored = window.localStorage.getItem('aurum-currency');
  if (stored === 'USD' || stored === 'EUR') {
    return stored;
  }
  return 'USD';
};

type UIState = {
  isCartOpen: boolean;
  currency: Currency;
  locale: Locale;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setCurrency: (currency: Currency) => void;
  setLocale: (locale: Locale) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isCartOpen: false,
      currency: getInitialCurrency(),
      locale: getInitialLocale(),
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setCartOpen: (open) => set({ isCartOpen: open }),
      setCurrency: (currency) => set({ currency }),
      setLocale: (locale) => set({ locale })
    }),
    {
      name: 'aurum-ui',
      partialize: (state) => ({ currency: state.currency, locale: state.locale }),
      onRehydrateStorage: () => (state) => {
        if (state?.locale && typeof window !== 'undefined') {
          window.localStorage.setItem('aurum-locale', state.locale);
        }
        if (state?.currency && typeof window !== 'undefined') {
          window.localStorage.setItem('aurum-currency', state.currency);
        }
      }
    }
  )
);
