'use client';

import { motion } from 'framer-motion';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useTranslations } from '@/lib/useTranslations';

export function BestSellers() {
  const t = useTranslations();
  const best = products.slice(0, 4);

  return (
    <section className="section-space">
      <div className="container-padded flex flex-col gap-8">
        <SectionHeading title={t.section.bestSellers} subtitle="Global favorites from every category." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {best.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
