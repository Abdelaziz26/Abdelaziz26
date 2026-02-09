import { z } from 'zod';

export const orderStatusValues = ['pending', 'paid', 'shipped', 'cancelled'] as const;

export const orderStatusSchema = z.enum(orderStatusValues);

export const productSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  price: z.number().nonnegative(),
  currency: z.string().min(1),
  category: z.string().min(1),
  brand: z.string().min(1),
  stock: z.number().int().nonnegative(),
  rating: z.number().min(0).max(5),
  images: z.array(z.string().min(1)),
  tags: z.array(z.string()).optional().default([]),
  variants: z.unknown().optional().default([])
});
