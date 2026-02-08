import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { mapProduct } from '@/lib/product';
import { PageTransition } from '@/components/layout/PageTransition';
import { CategoryListing } from '@/components/product/CategoryListing';

const categories = ['clothing', 'phones', 'accessories'] as const;

type CategorySlug = (typeof categories)[number];

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const slug = params.slug as CategorySlug;

  if (!categories.includes(slug)) {
    notFound();
  }

  const categoryProducts = await prisma.product.findMany({ where: { category: slug } });
  const mapped = categoryProducts.map(mapProduct);

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
          <CategoryListing products={mapped} />
        </div>
      </section>
    </PageTransition>
  );
}
