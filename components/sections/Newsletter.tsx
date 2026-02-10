'use client';

import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { useTranslations } from '@/lib/useTranslations';

export function Newsletter() {
  const t = useTranslations();

  return (
    <section className="section-space">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid gap-8 rounded-3xl border border-gray-100 bg-gray-50 px-8 py-12 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <SectionHeading title={t.newsletter.title} subtitle={t.newsletter.body} />
          <NewsletterForm />
        </motion.div>
      </div>
    </section>
  );
}
