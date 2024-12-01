import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Login from '../pages/LogingPage';
import Register from '../pages/RegisterPage';
import ProductDetail from '../pages/ProductDetailPage';
import CartSummary from '../pages/CartPage';
import SearchResults from '../pages/SearchResults';
import ChangePasswordPage from '../pages/ChangePasswordPage';
import OrdersPage from '../pages/OrdersPage';
import Navbar from '../components/Layout/Navbar';
import Footer from '../components/Layout/Footer';
import DashboardPage from '../pages/DashboardPage';
import AddressesPage from '../pages/AddressesPage';
import ProfilePage from '../pages/ProfilePage';
import ProtectedRoute from '../utils/protectedRoute';
import ForgotPassword from '../pages/ForgotPasswordPage';
import { Box } from '@mui/material';
import ResetPassword from '../pages/ResetPasswordPage';
import NotFoundPage from '../pages/NotFoundPage';

const AppRoutes = () => {
  const location = useLocation();
  const hideNavbarAndFooter = [
    '/login',  
    '/register', 
    '/forgot-password',
    '/account/change-password',
    '/reset-password',
    '/404',
    location.pathname.startsWith('/reset-password/') ? location.pathname : null
  ].filter(Boolean).includes(location.pathname);

  return (
    <>
      {!hideNavbarAndFooter && <Navbar />}
      <Box sx={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<CartSummary />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Navigate to="/account/orders" replace />
            </ProtectedRoute>
          } />
          <Route path="/account" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/account/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          <Route path="/account/orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="/account/change-password" element={
            <ProtectedRoute>
              <ChangePasswordPage />
            </ProtectedRoute>
          } />
          <Route path="/account/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/account/addresses" element={
            <ProtectedRoute>
              <AddressesPage />
            </ProtectedRoute>
          } />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Box>
      {!hideNavbarAndFooter && <Footer />}
    </>
  );
};

export default AppRoutes;
