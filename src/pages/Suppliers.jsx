import { useState } from 'react';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import Modal from '../components/Modal';
import { mockSuppliers } from '../data/mockData';

const statusStyles = {
  Active: 'bg-emerald-500/10 text-emerald-700',
  Inactive: 'bg-slate-500/10 text-slate-600',
};

function formatPhonePH(phone) {
  if (!phone) return '';
  const digits = String(phone).replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('63')) return '0' + digits.slice(2);
  if (digits.length === 10 && digits.startsWith('9')) return '0' + digits;
  if (digits.length === 11 && digits.startsWith('0')) return digits;
  return digits || phone;
}

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState(mockSuppliers);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [modal, setModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    productsSupplied: '',
    status: 'Active',
  });

  const filtered = suppliers.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.contact.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'all' || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const openAdd = () => {
    setForm({
      name: '',
      contact: '',
      email: '',
      phone: '',
      productsSupplied: '0',
      status: 'Active',
    });
    setEditing(null);
    setModal('add');
  };

  const openEdit = (s) => {
    setEditing(s);
    setForm({
      name: s.name,
      contact: s.contact,
      email: s.email,
      phone: s.phone,
      productsSupplied: String(s.productsSupplied),
      status: s.status,
    });
    setModal('edit');
  };

  const handleSave = () => {
    const payload = {
      name: form.name.trim(),
      contact: form.contact.trim(),
      email: form.email.trim(),
      phone: formatPhonePH(form.phone.trim()) || form.phone.trim(),
      productsSupplied: parseInt(form.productsSupplied, 10) || 0,
      status: form.status,
    };
    const full = { ...payload, id: editing?.id || String(suppliers.length + 1) };
    if (editing) {
      setSuppliers((prev) => prev.map((x) => (x.id === editing.id ? { ...x, ...full } : x)));
    } else {
      setSuppliers((prev) => [...prev, full]);
    }
    setModal(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this supplier?')) setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Suppliers</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Manage supplier contacts and products supplied
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-secondary)]" />
          <input
            type="search"
            placeholder="Search by name, contact or email..."
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
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            type="button"
            onClick={openAdd}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium transition-colors shrink-0 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)]"
          >
            <Plus className="w-5 h-5" />
            Add Supplier
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/20 bg-[var(--color-primary)]">
                <th className="text-left py-3 px-4 font-semibold text-white">Supplier</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Email</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Phone</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Products supplied</th>
                <th className="text-left py-3 px-4 font-semibold text-white">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-[var(--border-color)] hover:bg-slate-100"
                >
                  <td className="py-3 px-4 font-medium text-[var(--text-primary)]">{s.name}</td>
                  <td className="py-3 px-4 text-[var(--text-secondary)]">{s.contact}</td>
                  <td className="py-3 px-4 text-[var(--text-secondary)]">{s.email}</td>
                  <td className="py-3 px-4 text-[var(--text-secondary)]">{formatPhonePH(s.phone)}</td>
                  <td className="py-3 px-4 text-[var(--text-primary)]">{s.productsSupplied}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${statusStyles[s.status] || ''}`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(s)}
                        className="p-2 rounded-lg hover:bg-slate-200 text-[var(--text-secondary)]"
                        aria-label="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(s.id)}
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
            No suppliers match your filters.
          </div>
        )}
      </div>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Supplier' : 'Edit Supplier'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Supplier name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
              placeholder="e.g. TechSupply Co."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Contact person</label>
            <input
              type="text"
              value={form.contact}
              onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              placeholder="e.g. 09177589353"
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Products supplied</label>
            <input
              type="number"
              min="0"
              value={form.productsSupplied}
              onChange={(e) => setForm((f) => ({ ...f, productsSupplied: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
