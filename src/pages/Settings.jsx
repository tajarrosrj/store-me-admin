import { useState } from 'react';
import { Store, Bell, Layers } from 'lucide-react';

export default function Settings() {
  const [storeName, setStoreName] = useState('My Store');
  const [notifications, setNotifications] = useState(true);
  const [minThreshold, setMinThreshold] = useState(10);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Settings</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Store info, notifications, and preferences
        </p>
      </div>

      <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
          <Store className="w-5 h-5" />
          Store info
        </h2>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            Store name
          </label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </section>

      <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5" />
          Notifications
        </h2>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-4 h-4 rounded border-[var(--border-color)] text-blue-600 focus:ring-blue-500"
          />
          <span className="text-sm text-[var(--text-primary)]">
            Enable low stock alerts and notifications
          </span>
        </label>
      </section>

      <section className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-[var(--text-primary)] flex items-center gap-2 mb-4">
          <Layers className="w-5 h-5" />
          Defaults
        </h2>
        <div>
          <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
            Default minimum stock threshold
          </label>
          <input
            type="number"
            min={1}
            value={minThreshold}
            onChange={(e) => setMinThreshold(Number(e.target.value) || 10)}
            className="w-full max-w-[120px] px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            Used when adding new products
          </p>
        </div>
      </section>
    </div>
  );
}
