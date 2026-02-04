import { create } from 'zustand';
import { Currency } from '@/lib/types';
import { Locale } from '@/lib/i18n';

type UIState = {
  isCartOpen: boolean;
  currency: Currency;
  locale: Locale;
  toggleCart: () => void;
  setCartOpen: (open: boolean) => void;
  setCurrency: (currency: Currency) => void;
  setLocale: (locale: Locale) => void;
};

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  currency: 'USD',
  locale: 'en',
  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setCurrency: (currency) => set({ currency }),
  setLocale: (locale) => set({ locale })
}));
