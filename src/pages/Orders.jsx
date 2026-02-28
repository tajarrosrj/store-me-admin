import { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { mockOrders } from '../data/mockData';
import { formatPeso } from '../utils/format';

const statusStyles = {
  Completed: 'bg-emerald-500/10 text-emerald-700',
  Pending: 'bg-amber-500/10 text-amber-700',
  Processing: 'bg-blue-500/10 text-blue-700',
};

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modal, setModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    id: '',
    customer: '',
    items: '',
    total: '',
    status: 'Pending',
    date: new Date().toISOString().slice(0, 10),
  });

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const nextOrderId = () => {
    const nums = orders.map((o) => parseInt(o.id.replace(/\D/g, ''), 10)).filter(Boolean);
    const next = nums.length ? Math.max(...nums) + 1 : 1004;
    return `ORD-${next}`;
  };

  const openAdd = () => {
    setForm({
      id: nextOrderId(),
      customer: '',
      items: '',
      total: '',
      status: 'Pending',
      date: new Date().toISOString().slice(0, 10),
    });
    setEditing(null);
    setModal('add');
  };

  const openEdit = (o) => {
    setEditing(o);
    setForm({
      id: o.id,
      customer: o.customer,
      items: String(o.items),
      total: String(o.total),
      status: o.status,
      date: o.date,
    });
    setModal('edit');
  };

  const handleSave = () => {
    const payload = {
      id: form.id.trim() || nextOrderId(),
      customer: form.customer.trim(),
      items: parseInt(form.items, 10) || 0,
      total: parseFloat(form.total) || 0,
      status: form.status,
      date: form.date,
    };
    if (editing) {
      setOrders((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...payload } : x)));
    } else {
      setOrders((prev) => [...prev, payload]);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this order?')) setOrders((prev) => prev.filter((o) => o.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Orders / Sales</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Purchase and sales orders with status
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
          <input
            type="search"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>
        <div className="flex items-center gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="select-status px-4 py-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="all">All status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
          </select>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium transition-colors shrink-0 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
          >
            <Plus className="w-5 h-5" />
            Add Order
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20 bg-[var(--color-primary)]">
                <th className="text-left py-3 px-4 font-semibold text-white">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Date</th>
                <th className="text-right py-3 px-4 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr
                  key={o.id}
                  className="border-b border-[var(--border-color)] hover:bg-slate-100"
                >
                  <td className="py-3 px-4 font-medium text-[var(--text-primary)]">{o.id}</td>
                  <td className="py-3 px-4 text-[var(--text-secondary)]">{o.customer}</td>
                  <td className="py-3 px-4 text-[var(--text-primary)]">{o.items}</td>
                  <td className="py-3 px-4 text-[var(--text-primary)]">
                    {formatPeso(o.total)}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[o.status] || ''}`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-[var(--text-secondary)]">{o.date}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(o)}
                        className="p-2 rounded-lg hover:bg-slate-200 text-[var(--text-secondary)]"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(o.id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                        aria-label="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[var(--text-secondary)]">
            No orders match your filters.
          </div>
        )}
      </div>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Order' : 'Edit Order'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Order ID</label>
            <input
              type="text"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="e.g. ORD-1004"
              readOnly={!!editing}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Customer</label>
            <input
              type="text"
              value={form.customer}
              onChange={(e) => setForm((f) => ({ ...f, customer: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Items</label>
              <input
                type="number"
                min="0"
                value={form.items}
                onChange={(e) => setForm((f) => ({ ...f, items: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Total (₱)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={form.total}
                onChange={(e) => setForm((f) => ({ ...f, total: e.target.value }))}
                placeholder="0.00"
                className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--color-primary)]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 rounded-lg bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] transition-colors"
            >
              {modal === 'add' ? 'Add' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
