'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const schema = z.object({
  email: z.string().email()
});

type NewsletterValues = z.infer<typeof schema>;

export function NewsletterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful }
  } = useForm<NewsletterValues>({
    resolver: zodResolver(schema)
  });

  return (
    <form
      onSubmit={handleSubmit(() => undefined)}
      className="flex w-full flex-col gap-3 md:flex-row"
    >
      <div className="flex-1">
        <Input placeholder="you@email.com" {...register('email')} aria-invalid={!!errors.email} />
        {errors.email ? (
          <p className="mt-2 text-xs text-red-500">Please enter a valid email.</p>
        ) : null}
      </div>
      <Button type="submit" className="shrink-0">
        {isSubmitSuccessful ? 'Subscribed' : 'Subscribe'}
      </Button>
    </form>
  );
}
