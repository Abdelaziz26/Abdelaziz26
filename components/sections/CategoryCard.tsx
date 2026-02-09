import Link from 'next/link';
import Image from 'next/image';

export function CategoryCard({
  title,
  description,
  href,
  image
}: {
  title: string;
  description: string;
  href: string;
  image: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 p-6"
    >
      <div>
        <h3 className="text-2xl font-semibold text-ink-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-500">{description}</p>
      </div>
      <div className="relative mt-6 h-40 w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
    </Link>
  );
}
