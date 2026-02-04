import { create } from 'zustand';
import { CartItem, Product } from '@/lib/types';

type CartState = {
  items: CartItem[];
  addItem: (product: Product, options: Record<string, string>) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, options) =>
    set((state) => {
      const existing = state.items.find((item) => item.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        items: [...state.items, { product, quantity: 1, selectedOptions: options }]
      };
    }),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId)
    })),
  updateQuantity: (productId, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    })),
  clear: () => set({ items: [] })
}));
