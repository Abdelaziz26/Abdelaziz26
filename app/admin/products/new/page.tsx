import { ProductForm } from '../product-form';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Catalog</p>
        <h1 className="mt-3 text-3xl font-semibold">New product</h1>
      </div>
      <ProductForm
        mode="create"
        initialValues={{
          title: '',
          description: '',
          price: 0,
          currency: 'USD',
          category: 'clothing',
          brand: '',
          stock: 0,
          rating: 4.5,
          images: '',
          tags: ''
        }}
      />
    </div>
  );
}
