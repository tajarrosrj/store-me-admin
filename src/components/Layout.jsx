import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import { Bell, User, Settings, LogOut, ChevronDown } from 'lucide-react';

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleLogout() {
    setProfileOpen(false);
    logout();
    navigate('/login', { replace: true });
  }

  return (
    <div className="flex min-h-screen bg-[var(--bg-page)] p-3 gap-3 box-border">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 ml-[17.5rem]">
        <header
          className="sticky top-3 z-10 h-14 flex items-center justify-between px-6 shrink-0 rounded-[25px] mx-2 mt-0"
          style={{ backgroundColor: 'var(--color-primary)' }}
        >
          <div className="text-sm font-medium text-white tracking-tight">
            Inventory Management
          </div>
          <div className="flex items-center gap-2">
          <button
            type="button"
            className="p-2 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
          </button>
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen((o) => !o)}
              className="p-2 rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-colors flex items-center gap-1.5"
              aria-label="User profile"
              aria-expanded={profileOpen}
            >
              <User className="w-5 h-5" />
              <ChevronDown className={`w-4 h-4 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>
            {profileOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-white/20 py-1 shadow-xl z-30 bg-[var(--color-primary)]"
                role="menu"
              >
                <Link
                  to="/settings"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 transition-colors"
                  role="menuitem"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-white/90 hover:bg-white/10 transition-colors"
                  role="menuitem"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
          </div>
        </header>
        <div className="flex-1 p-6 bg-transparent mx-2 mt-2 mb-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
