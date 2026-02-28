import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Truck,
  ArrowLeftRight,
  ShoppingCart,
  AlertTriangle,
  BarChart3,
  Users,
  ChevronRight,
} from 'lucide-react';
import logo from '../assets/images/logo.svg';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/products', icon: Package, label: 'Products' },
  { to: '/categories', icon: FolderTree, label: 'Categories' },
  { to: '/suppliers', icon: Truck, label: 'Suppliers' },
  { to: '/stock', icon: ArrowLeftRight, label: 'Stock Management' },
  { to: '/orders', icon: ShoppingCart, label: 'Orders / Sales' },
  { to: '/alerts', icon: AlertTriangle, label: 'Low Stock Alerts' },
  { to: '/reports', icon: BarChart3, label: 'Reports' },
  { to: '/users', icon: Users, label: 'Users / Staff' },
];

export default function Sidebar() {
  return (
    <aside
      className="fixed left-3 top-3 bottom-3 w-64 flex flex-col rounded-[50px] shadow-xl z-20"
      style={{ backgroundColor: 'var(--color-primary)', height: 'calc(100vh - 1.5rem)' }}
    >
      <div className="p-5 border-b border-white/10 rounded-t-[50px] flex flex-col items-center text-center">
        <img
          src={logo}
          alt="Store Me"
          className="w-14 h-14 object-contain mb-3 [filter:invert(1)_brightness(2)]"
        />
        <h1 className="font-bold text-lg text-white tracking-tight uppercase">STORE ME</h1>
        <p className="text-xs text-white/70 mt-0.5">Admin Panel</p>
      </div>
      <nav className="flex-1 overflow-y-auto p-3 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`
            }
          >
            <Icon className="w-5 h-5 shrink-0" />
            <span className="flex-1">{label}</span>
            <ChevronRight className="w-4 h-4 opacity-60" />
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
