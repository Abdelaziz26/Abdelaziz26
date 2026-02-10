import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { mapProduct } from '@/lib/product';
import { PageTransition } from '@/components/layout/PageTransition';
import { CategoryListing } from '@/components/product/CategoryListing';

const categories = ['clothing', 'phones', 'accessories'] as const;

type CategorySlug = (typeof categories)[number];

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const slug = params.slug as CategorySlug;
  if (!categories.includes(slug)) {
    return { title: 'Category not found' };
  }
  const title = `${slug.charAt(0).toUpperCase()}${slug.slice(1)} · Aurum`;
  return {
    title,
    description: `Discover refined ${slug} curated for global delivery.`,
    openGraph: {
      title,
      description: `Discover refined ${slug} curated for global delivery.`,
      type: 'website'
    }
  };
}

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
