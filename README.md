# Inventory Admin – Frontend

Admin inventory management UI built with **React**, **Vite**, and **Tailwind CSS**. Frontend-only (mock data); no backend.

## Run

```bash
npm install
npm run dev
```

## Features

- **Dashboard** – Totals, low/out of stock counts, stock in/out chart, recent activity
- **Products** – Table, search/filter, add/edit/delete (modal), product detail page (name, SKU, category, price, stock, status)
- **Categories** – List, add/edit category
- **Suppliers** – List with contact info and status
- **Stock Management** – Tabs: Stock In, Stock Out, Stock Adjustment (quantity, date, reason)
- **Orders / Sales** – Orders table with status badges
- **Low Stock Alerts** – Items below minimum with “Restock” action
- **Reports** – Stock movement (bar), monthly summary (line)
- **Users / Staff** – User list, roles (Admin/Staff), status
- **Settings** – Store name, notifications, theme (dark/light), default min stock threshold
- **Sidebar** – All sections + Logout
- **Theme** – Light/dark toggle (persisted in `localStorage`)

## Stack

- React 19, React Router, Tailwind CSS v4, Lucide React, Recharts
