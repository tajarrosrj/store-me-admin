import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { formatPeso } from '../utils/format';

const statusStyles = {
  'In Stock': 'bg-emerald-500/10 text-emerald-700',
  'Low Stock': 'bg-amber-500/10 text-amber-700',
  'Out of Stock': 'bg-red-500/10 text-red-700',
};

export default function ProductDetail() {
  const { id } = useParams();
  const product = mockProducts.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="space-y-4">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
        <p className="text-[var(--text-secondary)]">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">{product.name}</h1>
          <span
            className={`inline-flex px-3 py-1.5 rounded-full text-sm font-medium ${statusStyles[product.status] || ''}`}
          >
            {product.status}
          </span>
        </div>
        <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-6">
          <div>
            <dt className="text-sm font-medium text-[var(--text-secondary)]">SKU</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{product.sku}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[var(--text-secondary)]">Category</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{product.category}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[var(--text-secondary)]">Price</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{formatPeso(product.price)}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[var(--text-secondary)]">Stock quantity</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{product.stock}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-[var(--text-secondary)]">Minimum stock</dt>
            <dd className="mt-1 text-[var(--text-primary)]">{product.minStock}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
