'use client';

import { useMemo, useState } from 'react';
import { Product } from '@/lib/types';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/cart';
import { useUIStore } from '@/store/ui';

export function ProductOptions({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);
  const setCartOpen = useUIStore((state) => state.setCartOpen);
  const [selected, setSelected] = useState<Record<string, string>>(() =>
    product.variants.reduce((acc, variant) => {
      acc[variant.name] = variant.options[0];
      return acc;
    }, {} as Record<string, string>)
  );

  const selections = useMemo(
    () =>
      product.variants.map((variant) => ({
        ...variant,
        value: selected[variant.name]
      })),
    [product.variants, selected]
  );

  return (
    <div className="space-y-4">
      {selections.map((variant) => (
        <div key={variant.name} className="space-y-2">
          <p className="text-xs uppercase text-gray-400">{variant.name}</p>
          <Select
            value={variant.value}
            onChange={(event) => setSelected((prev) => ({ ...prev, [variant.name]: event.target.value }))}
          >
            {variant.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>
      ))}
      <Button
        className="w-full"
        onClick={() => {
          addItem(product, selected);
          setCartOpen(true);
        }}
      >
        Add to cart
      </Button>
    </div>
  );
}
