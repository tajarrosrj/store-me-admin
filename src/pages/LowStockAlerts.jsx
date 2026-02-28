import { useState } from 'react';
import { AlertTriangle, Package } from 'lucide-react';
import { mockProducts } from '../data/mockData';

const lowStockProducts = mockProducts.filter(
  (p) => p.status === 'Low Stock' || p.status === 'Out of Stock'
);

export default function LowStockAlerts() {
  const [restocking, setRestocking] = useState(null);

  const handleRestock = (id) => {
    setRestocking(id);
    setTimeout(() => setRestocking(null), 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Low Stock Alerts</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Products below minimum quantity — restock when needed
        </p>
      </div>

      {lowStockProducts.length === 0 ? (
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-12 text-center">
          <div className="inline-flex rounded-full bg-emerald-500/10 p-4 mb-4">
            <Package className="w-8 h-8 text-emerald-600" />
          </div>
          <p className="text-[var(--text-primary)] font-medium">All good</p>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            No products are currently below minimum stock.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lowStockProducts.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`shrink-0 rounded-lg p-2.5 ${
                    p.status === 'Out of Stock'
                      ? 'bg-red-500/10 text-red-600'
                      : 'bg-amber-500/10 text-amber-600'
                  }`}
                >
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[var(--text-primary)]">{p.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{p.sku}</p>
                  <p className="text-sm mt-1">
                    <span className="text-[var(--text-secondary)]">Current: </span>
                    <span
                      className={
                        p.stock === 0
                          ? 'font-medium text-red-600'
                          : 'font-medium text-amber-600'
                      }
                    >
                      {p.stock}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      {' '}
                      / Min: {p.minStock}
                    </span>
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRestock(p.id)}
                disabled={restocking === p.id}
                className="shrink-0 px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white text-sm font-medium hover:bg-[var(--color-primary-hover)] disabled:opacity-60 transition-colors"
              >
                {restocking === p.id ? 'Restocking…' : 'Restock'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
