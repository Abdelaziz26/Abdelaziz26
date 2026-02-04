import { Hero } from '@/components/sections/Hero';
import { FeaturedCategories } from '@/components/sections/FeaturedCategories';
import { BestSellers } from '@/components/sections/BestSellers';
import { PromoBanner } from '@/components/sections/PromoBanner';
import { Newsletter } from '@/components/sections/Newsletter';
import { PageTransition } from '@/components/layout/PageTransition';

export default function HomePage() {
  return (
    <PageTransition>
      <div className="container-padded py-10">
        <Hero />
      </div>
      <FeaturedCategories />
      <BestSellers />
      <PromoBanner />
      <Newsletter />
    </PageTransition>
  );
}
