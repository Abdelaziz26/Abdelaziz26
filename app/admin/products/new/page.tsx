import { createProduct } from '../actions';

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400">Catalog</p>
        <h1 className="mt-3 text-3xl font-semibold">New product</h1>
      </div>
      <form action={createProduct} className="grid gap-6 rounded-3xl border border-gray-200 bg-white p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <input name="title" placeholder="Title" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input name="brand" placeholder="Brand" className="rounded-2xl border border-gray-200 px-4 py-3" required />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          className="min-h-[120px] rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <div className="grid gap-4 md:grid-cols-3">
          <input name="price" placeholder="Price" type="number" step="0.01" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input name="currency" placeholder="Currency (USD/EUR)" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input name="category" placeholder="Category" className="rounded-2xl border border-gray-200 px-4 py-3" required />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <input name="stock" placeholder="Stock" type="number" className="rounded-2xl border border-gray-200 px-4 py-3" required />
          <input name="rating" placeholder="Rating" type="number" step="0.1" className="rounded-2xl border border-gray-200 px-4 py-3" />
        </div>
        <input
          name="images"
          placeholder="Image URLs (comma separated)"
          className="rounded-2xl border border-gray-200 px-4 py-3"
          required
        />
        <input name="tags" placeholder="Tags (comma separated)" className="rounded-2xl border border-gray-200 px-4 py-3" />
        <button className="rounded-full bg-ink-900 px-6 py-3 text-sm text-white">Create product</button>
      </form>
    </div>
  );
}
