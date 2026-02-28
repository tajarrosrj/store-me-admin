import { useState } from 'react';
import { Plus, Pencil } from 'lucide-react';
import Modal from '../components/Modal';
import { mockCategories } from '../data/mockData';

export default function Categories() {
  const [categories, setCategories] = useState(mockCategories);
  const [modal, setModal] = useState(null);
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const openAdd = () => {
    setEditing(null);
    setName('');
    setDescription('');
    setModal('add');
  };

  const openEdit = (c) => {
    setEditing(c);
    setName(c.name);
    setDescription(c.description || '');
    setModal('edit');
  };

  const handleSave = () => {
    if (!name.trim()) return;
    if (editing) {
      setCategories((prev) =>
        prev.map((x) =>
          x.id === editing.id ? { ...x, name: name.trim(), description } : x
        )
      );
    } else {
      setCategories((prev) => [
        ...prev,
        {
          id: String(prev.length + 1),
          name: name.trim(),
          description,
          productCount: 0,
        },
      ]);
    }
    setModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Categories</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Organize products by category
          </p>
        </div>
        <button
          type="button"
          onClick={openAdd}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-medium hover:bg-[var(--color-primary-hover)] transition-colors shrink-0"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div
            key={c.id}
            className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] p-5 shadow-sm flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <h3 className="font-semibold text-[var(--text-primary)]">{c.name}</h3>
              <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2">
                {c.description || 'No description'}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-2">
                {c.productCount} product{c.productCount !== 1 ? 's' : ''}
              </p>
            </div>
            <button
              type="button"
              onClick={() => openEdit(c)}
              className="p-2 rounded-lg hover:bg-slate-100 text-[var(--text-secondary)] shrink-0"
              aria-label="Edit category"
            >
              <Pencil className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <Modal
        open={modal !== null}
        onClose={() => setModal(null)}
        title={modal === 'add' ? 'Add Category' : 'Edit Category'}
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Category name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. Electronics"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[var(--text-primary)] mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-page)] text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Optional description"
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
