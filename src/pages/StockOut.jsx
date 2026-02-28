import { mockStockMovements } from '../data/mockData';
import { ArrowUpFromLine } from 'lucide-react';

const outMovements = mockStockMovements.filter((m) => m.type === 'out');

export default function StockOut() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
          <ArrowUpFromLine className="w-5 h-5 text-amber-500" />
          Stock Out history
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
              {outMovements.map((m) => (
                <tr key={m.id} className="border-b border-[var(--border-color)]">
                  <td className="py-3 px-3 text-[var(--text-primary)]">{m.productName}</td>
                  <td className="py-3 px-3 text-amber-600 font-medium">
                    -{m.quantity}
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
