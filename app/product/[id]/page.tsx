import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { prisma } from '@/lib/prisma';
import { mapProduct } from '@/lib/product';
import { PageTransition } from '@/components/layout/PageTransition';
import { ProductGallery } from '@/components/product/ProductGallery';
import { Rating } from '@/components/product/Rating';
import { RelatedItems } from '@/components/product/RelatedItems';
import { Reviews } from '@/components/product/Reviews';
import { ProductOptions } from './product-options';
import { PriceTag } from '@/components/product/PriceTag';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { id: params.id } });
  if (!product) {
    return { title: 'Product not found' };
  }
  const title = `${product.title} · Aurum`;
  const description = product.description;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'product'
    }
  };
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productData = await prisma.product.findUnique({ where: { id: params.id } });

  if (!productData) {
    notFound();
  }

  const product = mapProduct(productData);
  const relatedData = await prisma.product.findMany({
    where: { category: product.category, NOT: { id: product.id } },
    take: 4
  });
  const related = relatedData.map(mapProduct);

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={product.images} title={product.title} />
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{product.brand}</p>
              <h1 className="mt-3 text-4xl font-semibold">{product.title}</h1>
              <p className="mt-2 text-sm text-gray-500">{product.description}</p>
            </div>
            <Rating value={product.rating} />
            <PriceTag product={product} />
            <ProductOptions product={product} />
            <div className="rounded-2xl border border-gray-100 p-4 text-xs text-gray-500">
              Complimentary express delivery · 30-day returns · Concierge support
            </div>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-padded grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <Reviews />
          <div className="space-y-4 rounded-3xl border border-gray-100 p-6">
            <h3 className="text-lg font-semibold">Specifications</h3>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>Precision-machined materials with matte finish</li>
              <li>Global 5G ready + dual SIM</li>
              <li>All-day battery with optimized charging</li>
              <li>Premium support and exclusive packaging</li>
            </ul>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-padded">
          <RelatedItems items={related} />
        </div>
      </section>
    </PageTransition>
  );
}
