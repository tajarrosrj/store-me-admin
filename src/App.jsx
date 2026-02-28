import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Suppliers from './pages/Suppliers';
import StockManagement from './pages/StockManagement';
import StockIn from './pages/StockIn';
import StockOut from './pages/StockOut';
import StockAdjustment from './pages/StockAdjustment';
import Orders from './pages/Orders';
import LowStockAlerts from './pages/LowStockAlerts';
import Reports from './pages/Reports';
import Users from './pages/Users';
import Settings from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetail />} />
            <Route path="categories" element={<Categories />} />
            <Route path="suppliers" element={<Suppliers />} />
            <Route path="stock" element={<StockManagement />}>
              <Route index element={<StockIn />} />
              <Route path="out" element={<StockOut />} />
              <Route path="adjustment" element={<StockAdjustment />} />
            </Route>
            <Route path="orders" element={<Orders />} />
            <Route path="alerts" element={<LowStockAlerts />} />
            <Route path="reports" element={<Reports />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
