import { mockStockMovements } from '../data/mockData';
import { ArrowDownToLine } from 'lucide-react';

const inMovements = mockStockMovements.filter((m) => m.type === 'in');

export default function StockIn() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <ArrowDownToLine className="w-5 h-5 text-emerald-500" />
          Stock In history
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)]">
                <th className="text-left py-2 px-3 font-medium text-[var(--text-secondary)]">
                  Product
                </th>
                <th className="text-left py-2 px-3 font-medium text-[var(--text-secondary)]">
                  Quantity
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
              {inMovements.map((m) => (
                <tr key={m.id} className="border-b border-[var(--border-color)]">
                  <td className="py-3 px-3 text-[var(--text-primary)]">{m.productName}</td>
                  <td className="py-3 px-3 text-emerald-600 font-medium">
                    +{m.quantity}
                  </td>
                  <td className="py-3 px-3 text-[var(--text-secondary)]">{m.date}</td>
                  <td className="py-3 px-3 text-[var(--text-secondary)]">{m.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 p-8 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Use the form above (or a dedicated Stock In form) to record new stock received.
        </p>
      </div>
    </div>
  );
}
