// Mock data for frontend-only inventory admin

export const mockProducts = [
  { id: '1', name: 'Wireless Mouse', sku: 'WM-001', categoryId: '1', category: 'Electronics', price: 29.99, stock: 45, minStock: 10, status: 'In Stock' },
  { id: '2', name: 'USB-C Hub', sku: 'UH-002', categoryId: '1', category: 'Electronics', price: 49.99, stock: 8, minStock: 10, status: 'Low Stock' },
  { id: '3', name: 'Sticky Notes Pack', sku: 'SN-003', categoryId: '2', category: 'Office Supplies', price: 4.99, stock: 0, minStock: 5, status: 'Out of Stock' },
  { id: '4', name: 'Laptop Stand', sku: 'LS-004', categoryId: '1', category: 'Electronics', price: 59.99, stock: 22, minStock: 5, status: 'In Stock' },
  { id: '5', name: 'Energy Bars Box', sku: 'EB-005', categoryId: '3', category: 'Food', price: 24.99, stock: 3, minStock: 15, status: 'Low Stock' },
  { id: '6', name: 'Polo Shirt Blue', sku: 'PS-006', categoryId: '4', category: 'Clothing', price: 34.99, stock: 60, minStock: 10, status: 'In Stock' },
];

export const mockCategories = [
  { id: '1', name: 'Electronics', productCount: 3, description: 'Devices and gadgets' },
  { id: '2', name: 'Office Supplies', productCount: 1, description: 'Desk and office items' },
  { id: '3', name: 'Food', productCount: 1, description: 'Snacks and beverages' },
  { id: '4', name: 'Clothing', productCount: 1, description: 'Apparel and wearables' },
];

export const mockSuppliers = [
  { id: '1', name: 'TechSupply Co.', contact: 'John Doe', email: 'john@techsupply.com', phone: '09177589353', productsSupplied: 3, status: 'Active' },
  { id: '2', name: 'Office World', contact: 'Jane Smith', email: 'jane@officeworld.com', phone: '09181234567', productsSupplied: 1, status: 'Active' },
  { id: '3', name: 'Global Foods', contact: 'Bob Lee', email: 'bob@globalfoods.com', phone: '09265551234', productsSupplied: 1, status: 'Inactive' },
];

export const mockStockMovements = [
  { id: '1', type: 'in', productName: 'Wireless Mouse', quantity: 50, date: '2025-02-26', reason: 'Restock' },
  { id: '2', type: 'out', productName: 'Sticky Notes Pack', quantity: 20, date: '2025-02-25', reason: 'Sale' },
  { id: '3', type: 'adjustment', productName: 'USB-C Hub', quantity: -2, date: '2025-02-24', reason: 'Damage' },
  { id: '4', type: 'in', productName: 'Energy Bars Box', quantity: 30, date: '2025-02-23', reason: 'Restock' },
];

export const mockOrders = [
  { id: 'ORD-1001', customer: 'Acme Corp', items: 5, total: 249.95, status: 'Completed', date: '2025-02-26' },
  { id: 'ORD-1002', customer: 'Startup Inc', items: 2, total: 84.98, status: 'Pending', date: '2025-02-27' },
  { id: 'ORD-1003', customer: 'Retail Co', items: 12, total: 419.88, status: 'Processing', date: '2025-02-25' },
];

export const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@store.com', role: 'Admin', status: 'Active' },
  { id: '2', name: 'Staff One', email: 'staff1@store.com', role: 'Staff', status: 'Active' },
  { id: '3', name: 'Staff Two', email: 'staff2@store.com', role: 'Staff', status: 'Inactive' },
];

export const mockRecentActivity = [
  { id: 1, action: 'Stock In', detail: 'Wireless Mouse +50', time: '2 hours ago' },
  { id: 2, action: 'Order', detail: 'ORD-1002 created', time: '3 hours ago' },
  { id: 3, action: 'Product Updated', detail: 'USB-C Hub price changed', time: '5 hours ago' },
  { id: 4, action: 'Low Stock Alert', detail: 'Energy Bars Box below minimum', time: '1 day ago' },
];

export const chartStockData = [
  { name: 'Mon', in: 120, out: 80 },
  { name: 'Tue', in: 90, out: 95 },
  { name: 'Wed', in: 150, out: 110 },
  { name: 'Thu', in: 80, out: 70 },
  { name: 'Fri', in: 200, out: 140 },
  { name: 'Sat', in: 50, out: 60 },
  { name: 'Sun', in: 30, out: 40 },
];
