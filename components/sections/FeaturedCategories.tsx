'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CategoryCard } from './CategoryCard';
import { useTranslations } from '@/lib/useTranslations';

export function FeaturedCategories() {
  const t = useTranslations();

  return (
    <section className="section-space">
      <div className="container-padded flex flex-col gap-8">
        <SectionHeading title={t.section.featured} subtitle="Curated for modern essentials." />
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: t.nav.clothing,
              description: 'Tailored silhouettes in premium fabrics.',
              href: '/category/clothing',
              image:
                'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80'
            },
            {
              title: t.nav.phones,
              description: 'Flagship devices with elegant engineering.',
              href: '/category/phones',
              image:
                'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80'
            },
            {
              title: t.nav.accessories,
              description: 'Audio, wearables, and everyday tech.',
              href: '/category/accessories',
              image:
                'https://images.unsplash.com/photo-1518441983181-0527b0619ad2?auto=format&fit=crop&w=1200&q=80'
            }
          ].map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CategoryCard {...category} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
