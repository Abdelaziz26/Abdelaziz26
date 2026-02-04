import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import { PageTransition } from '@/components/layout/PageTransition';
import { ProductGallery } from '@/components/product/ProductGallery';
import { Rating } from '@/components/product/Rating';
import { RelatedItems } from '@/components/product/RelatedItems';
import { Reviews } from '@/components/product/Reviews';
import { ProductOptions } from './product-options';
import { PriceTag } from '@/components/product/PriceTag';

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products.find((item) => item.id === params.id);

  if (!product) {
    notFound();
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id);

  return (
    <PageTransition>
      <section className="section-space">
        <div className="container-padded grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={product.images} title={product.title} />
          <div className="space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">{product.brand}</p>
              <h1 className="mt-3 text-4xl font-semibold">{product.title}</h1>
              <p className="mt-2 text-sm text-gray-500">
                Elevated design and precision engineering for global lifestyles.
              </p>
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
          <RelatedItems items={related.slice(0, 4)} />
        </div>
      </section>
    </PageTransition>
  );
}
