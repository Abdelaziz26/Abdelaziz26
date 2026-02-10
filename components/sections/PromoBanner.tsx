'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useTranslations } from '@/lib/useTranslations';

export function PromoBanner() {
  const t = useTranslations();

  return (
    <section className="section-space">
      <div className="container-padded">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-ink-900 px-8 py-12 text-white lg:flex-row lg:items-center"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/60">{t.section.promo}</p>
            <h3 className="mt-3 text-3xl font-semibold">{t.promo.title}</h3>
            <p className="mt-2 text-sm text-white/70">{t.promo.body}</p>
          </div>
          <Button variant="secondary" className="border-white text-white hover:bg-white hover:text-ink-900">
            Join the private list
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
