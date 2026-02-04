import { Product } from '@/lib/types';
import { ProductCard } from './ProductCard';

export function RelatedItems({ items }: { items: Product[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-semibold">Related Items</h3>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
