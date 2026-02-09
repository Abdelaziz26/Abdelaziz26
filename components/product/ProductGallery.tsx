'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { normalizeImages } from '@/lib/normalizeImages';

export function ProductGallery({ images, title }: { images: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const normalizedImages = normalizeImages(images);
  const safeActive = Math.min(active, normalizedImages.length - 1);

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gray-50">
        <Image
          src={normalizedImages[safeActive]}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      <div className="flex gap-3">
        {normalizedImages.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={cn(
              'relative h-20 w-16 overflow-hidden rounded-2xl border',
              active === index ? 'border-ink-900' : 'border-transparent'
            )}
          >
            <Image src={image} alt={`${title} ${index + 1}`} fill sizes="64px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
