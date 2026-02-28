import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from 'recharts';
import { chartStockData } from '../data/mockData';

const monthlySummary = [
  { month: 'Jan', stockIn: 420, stockOut: 380, orders: 45 },
  { month: 'Feb', stockIn: 380, stockOut: 410, orders: 52 },
  { month: 'Mar', stockIn: 510, stockOut: 390, orders: 48 },
];

export default function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Reports</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Stock movement and monthly summary
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Stock movement (weekly)
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartStockData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--border-color)]" />
                <XAxis dataKey="name" className="text-xs" stroke="var(--text-secondary)" />
                <YAxis className="text-xs" stroke="var(--text-secondary)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
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
        </div>

        <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
            Monthly summary
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySummary}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-[var(--border-color)]" />
                <XAxis dataKey="month" className="text-xs" stroke="var(--text-secondary)" />
                <YAxis className="text-xs" stroke="var(--text-secondary)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="stockIn"
                  name="Stock In"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="stockOut"
                  name="Stock Out"
                  stroke="#64748b"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="orders"
                  name="Orders"
                  stroke="#10b981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
