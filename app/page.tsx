import { Hero } from '@/components/sections/Hero';
import { FeaturedCategories } from '@/components/sections/FeaturedCategories';
import { BestSellers } from '@/components/sections/BestSellers';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { Newsletter } from '@/components/sections/Newsletter';
import { PageTransition } from '@/components/layout/PageTransition';
import { prisma } from '@/lib/prisma';
import { mapProduct } from '@/lib/product';

export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({ take: 8, orderBy: { createdAt: 'desc' } });
  const mappedProducts = featuredProducts.map(mapProduct);

  return (
    <PageTransition>
      <div className="container-padded py-10">
        <Hero />
      </div>
      <FeaturedCategories />
      <BestSellers products={mappedProducts} />
      <PromoBanner />
      <Newsletter />
    </PageTransition>
  );
}
