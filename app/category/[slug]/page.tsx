import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { PageTransition } from '@/components/layout/PageTransition';
import { CategoryListing } from '@/components/product/CategoryListing';

const categories = ['clothing', 'phones', 'accessories'] as const;

type CategorySlug = (typeof categories)[number];

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as CategorySlug;

  if (!categories.includes(slug)) {
    notFound();
  }

  const categoryProducts = products.filter((product) => product.category === slug);

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded space-y-10">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Category</p>
            <h1 className="mt-3 text-4xl font-semibold capitalize">{slug}</h1>
            <p className="mt-2 text-sm text-gray-500">
              Discover refined {slug} curated for global delivery.
            </p>
          </div>
          <CategoryListing products={categoryProducts} />
        </div>
      </section>
    </PageTransition>
  );
}
