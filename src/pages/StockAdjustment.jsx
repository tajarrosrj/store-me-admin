import { mockStockMovements } from '../data/mockData';
import { SlidersHorizontal } from 'lucide-react';

const adjustments = mockStockMovements.filter((m) => m.type === 'adjustment');

export default function StockAdjustment() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-blue-500" />
          Stock adjustments
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-2 px-3 font-medium text-[var(--text-secondary)]">
                  Product
                </th>
                <th className="text-left py-2 px-3 font-medium text-[var(--text-secondary)]">
                  Quantity change
                </th>
                <th className="text-left py-2 px-3 font-medium text-[var(--text-secondary)]">
                  Date
                </th>
                <th className="text-left py-2 px-3 font-medium text-[var(--text-secondary)]">
                  Reason
                </th>
              </tr>
            </thead>
            <tbody>
              {adjustments.map((m) => (
                <tr key={m.id} className="border-b border-[var(--border-color)]">
                  <td className="py-3 px-3 text-[var(--text-primary)]">{m.productName}</td>
                  <td
                    className={`py-3 px-3 font-medium ${m.quantity < 0 ? 'text-red-600' : 'text-emerald-600'}`}
                  >
                    {m.quantity > 0 ? '+' : ''}{m.quantity}
                  </td>
                  <td className="py-3 px-3 text-[var(--text-secondary)]">{m.date}</td>
                  <td className="py-3 px-3 text-[var(--text-secondary)]">{m.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
