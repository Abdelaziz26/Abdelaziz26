import { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: 'arc-hoodie-01',
    title: 'Arc Knit Hoodie',
    description: 'Curated premium essential for modern global living.',
    category: 'clothing',
    price: 180,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 14,
    tags: ['hoodie', 'premium', 'winter'],
    rating: 4.8,
    brand: 'Atelier Nord',
    variants: [
      { name: 'Size', options: ['S', 'M', 'L', 'XL'] },
      { name: 'Color', options: ['Obsidian', 'Mist', 'Sand'] }
    ]
  },
  {
    id: 'velo-jacket-02',
    title: 'Velo Tech Jacket',
    description: 'Curated premium essential for modern global living.',
    category: 'clothing',
    price: 260,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 8,
    tags: ['outerwear', 'technical'],
    rating: 4.6,
    brand: 'Studio Nine',
    variants: [
      { name: 'Size', options: ['S', 'M', 'L'] },
      { name: 'Color', options: ['Midnight', 'Slate'] }
    ]
  },
  {
    id: 'aura-tee-03',
    title: 'Aura Soft Tee',
    description: 'Curated premium essential for modern global living.',
    category: 'clothing',
    price: 68,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 24,
    tags: ['essential', 'minimal'],
    rating: 4.5,
    brand: 'Nomad',
    variants: [
      { name: 'Size', options: ['XS', 'S', 'M', 'L'] },
      { name: 'Color', options: ['Cloud', 'Ink', 'Stone'] }
    ]
  },
  {
    id: 'lumina-pro-01',
    title: 'Lumina Pro Max',
    description: 'Curated premium essential for modern global living.',
    category: 'phones',
    price: 1190,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1510557880182-3ed2fa4a4f7f?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 18,
    tags: ['flagship', '5g'],
    rating: 4.9,
    brand: 'Lumina',
    variants: [
      { name: 'Storage', options: ['256GB', '512GB', '1TB'] },
      { name: 'Color', options: ['Onyx', 'Frost', 'Cobalt'] }
    ]
  },
  {
    id: 'nova-lite-02',
    title: 'Nova Lite',
    description: 'Curated premium essential for modern global living.',
    category: 'phones',
    price: 780,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 6,
    tags: ['camera', 'lightweight'],
    rating: 4.4,
    brand: 'Nova',
    variants: [
      { name: 'Storage', options: ['128GB', '256GB'] },
      { name: 'Color', options: ['Pearl', 'Graphite'] }
    ]
  },
  {
    id: 'orbit-ultra-03',
    title: 'Orbit Ultra',
    description: 'Curated premium essential for modern global living.',
    category: 'phones',
    price: 980,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505739773434-c2d9a4d5b0b6?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 12,
    tags: ['battery', 'premium'],
    rating: 4.7,
    brand: 'Orbit',
    variants: [
      { name: 'Storage', options: ['256GB', '512GB'] },
      { name: 'Color', options: ['Graphite', 'Azure'] }
    ]
  },
  {
    id: 'halo-buds-01',
    title: 'Halo Buds Studio',
    description: 'Curated premium essential for modern global living.',
    category: 'accessories',
    price: 210,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1518441983181-0527b0619ad2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 40,
    tags: ['audio', 'wireless'],
    rating: 4.6,
    brand: 'Halo',
    variants: [
      { name: 'Color', options: ['Pearl', 'Black'] }
    ]
  },
  {
    id: 'pulse-watch-02',
    title: 'Pulse Watch X',
    description: 'Curated premium essential for modern global living.',
    category: 'accessories',
    price: 420,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 22,
    tags: ['wearable', 'fitness'],
    rating: 4.5,
    brand: 'Pulse',
    variants: [
      { name: 'Size', options: ['40mm', '44mm'] },
      { name: 'Color', options: ['Silver', 'Midnight'] }
    ]
  },
  {
    id: 'zen-case-03',
    title: 'Zen Mag Case',
    description: 'Curated premium essential for modern global living.',
    category: 'accessories',
    price: 54,
    currency: 'USD',
    images: [
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512499617640-c2f999018b72?auto=format&fit=crop&w=1200&q=80'
    ],
    stock: 60,
    tags: ['case', 'magnetic'],
    rating: 4.3,
    brand: 'Zen',
    variants: [
      { name: 'Color', options: ['Clear', 'Smoke', 'Olive'] }
    ]
  }
];
