'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { useTranslations } from '@/lib/useTranslations';

export function Hero() {
  const t = useTranslations();

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="grid gap-10 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center gap-6"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Global premium store</p>
          <h1 className="text-4xl font-semibold leading-tight text-ink-900 lg:text-5xl">
            {t.hero.title}
          </h1>
          <p className="text-sm text-gray-500 lg:text-base">{t.hero.subtitle}</p>
          <div className="flex flex-wrap gap-4">
            <Button>{t.hero.ctaPrimary}</Button>
            <Button variant="secondary">{t.hero.ctaSecondary}</Button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="relative min-h-[340px]"
        >
          <div className="absolute inset-0 overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1463107971871-fbac9ddb920f?auto=format&fit=crop&w=1600&q=80"
              alt="Premium lifestyle"
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute bottom-6 left-6 rounded-2xl bg-white/90 px-4 py-3 text-xs text-ink-900 shadow-soft backdrop-blur">
            Worldwide delivery in 48h
          </div>
        </motion.div>
      </div>
    </section>
  );
}
