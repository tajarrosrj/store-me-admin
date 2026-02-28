import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ArrowDownToLine, ArrowUpFromLine, SlidersHorizontal } from 'lucide-react';

const tabs = [
  { to: '/stock', end: true, icon: ArrowDownToLine, label: 'Stock In' },
  { to: '/stock/out', end: false, icon: ArrowUpFromLine, label: 'Stock Out' },
  { to: '/stock/adjustment', end: false, icon: SlidersHorizontal, label: 'Stock Adjustment' },
];

export default function StockManagement() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Stock Management</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Record stock in, out, and adjustments
        </p>
      </div>

      <nav className="flex gap-1 p-1.5 rounded-xl bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/20 w-fit">
        {tabs.map(({ to, end, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--color-primary)]/20 hover:text-[var(--text-primary)]'
              }`
            }
          >
            <Icon className="w-4 h-4" />
            {label}
          </NavLink>
        ))}
      </nav>

      <Outlet />
    </div>
  );
}
