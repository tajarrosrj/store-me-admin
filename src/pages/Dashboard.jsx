import React, { useMemo } from 'react';
import { Package, AlertTriangle, XCircle, Activity } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import StatCard from '../components/StatCard';
import {
  mockProducts,
  mockRecentActivity,
  chartStockData,
} from '../data/mockData';

const PRODUCT_STATUS = {
  LOW_STOCK: 'Low Stock',
  OUT_OF_STOCK: 'Out of Stock',
};

export default function Dashboard() {
  const { totalProducts, lowStock, outOfStock } = useMemo(() => {
    let low = 0;
    let out = 0;
    for (const product of mockProducts) {
      if (product.status === PRODUCT_STATUS.LOW_STOCK) low += 1;
      if (product.status === PRODUCT_STATUS.OUT_OF_STOCK) out += 1;
    }
    return {
      totalProducts: mockProducts.length,
      lowStock: low,
      outOfStock: out,
    };
  }, []);

  const inStock = totalProducts - lowStock - outOfStock;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Overview and summary of your inventory
        </p>
      </header>

      <section
        aria-label="Inventory statistics"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          title="Total Products"
          value={totalProducts}
          subtitle="Active SKUs"
          icon={Package}
          color="blue"
        />
        <StatCard
          title="Low Stock"
          value={lowStock}
          subtitle="Below minimum"
          icon={AlertTriangle}
          color="amber"
        />
        <StatCard
          title="Out of Stock"
          value={outOfStock}
          subtitle="Need restock"
          icon={XCircle}
          color="red"
        />
        <StatCard
          title="In Stock"
          value={inStock}
          subtitle="Healthy levels"
          icon={Package}
          color="green"
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <section
          className="lg:col-span-2 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm"
          aria-labelledby="stock-chart-title"
        >
          <h2
            id="stock-chart-title"
            className="text-lg font-semibold text-[var(--text-primary)] mb-4"
          >
            Stock In / Out
          </h2>
          <p className="sr-only">
            Bar chart displaying stock in and stock out quantities over time.
          </p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartStockData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--border-color)]" />
                <XAxis dataKey="name" className="text-xs" stroke="var(--text-secondary)" />
                <YAxis className="text-xs" stroke="var(--text-secondary)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#f1f5f9',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="in" name="Stock In" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="out" name="Stock Out" fill="#64748b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section
          className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm"
          aria-labelledby="recent-activity-title"
        >
          <h2
            id="recent-activity-title"
            className="text-lg font-semibold text-[var(--text-primary)] mb-4"
          >
            Recent Activity
          </h2>
          <ul className="space-y-3">
            {mockRecentActivity.map((item) => (
              <li
                key={item.id}
                className="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="mt-0.5 rounded-full bg-blue-500/10 p-1.5">
                  <Activity
                    className="w-3.5 h-3.5 text-blue-600"
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{item.action}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{item.detail}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{item.time}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
