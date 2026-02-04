import { Rating } from './Rating';

const reviews = [
  {
    id: '1',
    name: 'Alex R.',
    comment: 'Impeccable finish, fast delivery, and premium packaging.',
    rating: 5
  },
  {
    id: '2',
    name: 'Nina K.',
    comment: 'The craftsmanship is outstanding. Highly recommend.',
    rating: 4
  }
];

export function Reviews() {
  return (
    <div className="space-y-4 rounded-3xl border border-gray-100 p-6">
      <h3 className="text-lg font-semibold">Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{review.name}</p>
              <Rating value={review.rating} />
            </div>
            <p className="text-sm text-gray-500">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
