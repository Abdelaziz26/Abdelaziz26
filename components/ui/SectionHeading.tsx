import { ReactNode } from 'react';

type SectionHeadingProps = {
  title: string;
  subtitle?: ReactNode;
};

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-3xl font-semibold tracking-tight text-ink-900">{title}</h2>
      {subtitle ? <p className="text-sm text-gray-500">{subtitle}</p> : null}
    </div>
  );
}
