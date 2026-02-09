import { Star } from 'lucide-react';

export function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-500">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={14} fill={index < Math.round(value) ? 'currentColor' : 'none'} />
      ))}
      <span className="ml-2 text-xs text-gray-500">{value.toFixed(1)}</span>
    </div>
  );
}
