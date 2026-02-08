'use client';

import { useMemo, useState } from 'react';
import { Product } from '@/lib/types';
import { ProductCard } from '@/components/product/ProductCard';
import { Select } from '@/components/ui/Select';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Rating } from '@/components/product/Rating';

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Rating', value: 'rating' }
];

export function CategoryListing({ products }: { products: Product[] }) {
  const [sort, setSort] = useState('featured');
  const [inStock, setInStock] = useState(true);
  const [minPrice, setMinPrice] = useState('0');
  const [maxPrice, setMaxPrice] = useState('1500');
  const [rating, setRating] = useState(4);
  const [brand, setBrand] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filtered = useMemo(() => {
    const min = Number(minPrice);
    const max = Number(maxPrice);
    const filteredProducts = products.filter((product) => {
      const withinPrice = product.price >= min && product.price <= max;
      const meetsRating = product.rating >= rating;
      const stockOk = inStock ? product.stock > 0 : true;
      const brandOk = brand === 'all' ? true : product.brand === brand;
      return withinPrice && meetsRating && stockOk && brandOk;
    });

    switch (sort) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...filteredProducts].sort((a, b) => b.rating - a.rating);
      default:
        return filteredProducts;
    }
  }, [products, sort, inStock, minPrice, maxPrice, rating, brand]);

  return (
    <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
      <aside className="space-y-6 rounded-3xl border border-gray-100 bg-white/80 p-6 lg:sticky lg:top-24 lg:self-start">
        <div>
          <h3 className="text-sm font-semibold">Filters</h3>
          <p className="mt-1 text-xs text-gray-400">Refine by price, brand, and availability.</p>
        </div>
        <div className="space-y-3">
          <label className="text-xs uppercase text-gray-400">Price range</label>
          <div className="grid gap-3">
            <Input value={minPrice} onChange={(event) => setMinPrice(event.target.value)} />
            <Input value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs uppercase text-gray-400">Minimum rating</label>
          <div className="flex items-center justify-between rounded-full border border-gray-200 px-4 py-3">
            <Rating value={rating} />
            <Select value={String(rating)} onChange={(event) => setRating(Number(event.target.value))}>
              {[5, 4, 3].map((value) => (
                <option key={value} value={value}>
                  {value}+
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs uppercase text-gray-400">Stock</label>
          <div className="flex items-center justify-between rounded-full border border-gray-200 px-4 py-3">
            <span className="text-sm">In stock only</span>
            <input type="checkbox" checked={inStock} onChange={(event) => setInStock(event.target.checked)} />
          </div>
        </div>
        <div className="space-y-3">
          <label className="text-xs uppercase text-gray-400">Brand</label>
          <Select value={brand} onChange={(event) => setBrand(event.target.value)}>
            <option value="all">All brands</option>
            {[...new Set(products.map((product) => product.brand))].map((brandName) => (
              <option key={brandName} value={brandName}>
                {brandName}
              </option>
            ))}
          </Select>
        </div>
      </aside>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">{filtered.length} results</p>
          <div className="flex items-center gap-3 text-xs text-gray-400">
            Sort by
            <Select value={sort} onChange={(event) => setSort(event.target.value)} className="max-w-[220px]">
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, visibleCount).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {visibleCount < filtered.length ? (
          <div className="flex justify-center">
            <Button variant="secondary" onClick={() => setVisibleCount((count) => count + 3)}>
              Load more
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
