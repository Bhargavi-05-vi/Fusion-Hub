import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import FoodPage from './pages/food/FoodPage';
import RestaurantDetailPage from './pages/food/RestaurantDetailPage';
import DineOutPage from './pages/dineout/DineOutPage';
import TableReservationPage from './pages/dineout/TableReservationPage';
import EventsPage from './pages/events/EventsPage';
import EventDetailPage from './pages/events/EventDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import AdminLoginPage from './pages/auth/AdminLoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import HelpCenterPage from './pages/support/HelpCenterPage';
import ContactPage from './pages/support/ContactPage';
import PrivacyPolicyPage from './pages/support/PrivacyPolicyPage';


const authRoutes = ['/login', '/register', '/admin-login', '/forgot-password'];

const AppLayout = () => {
  const { pathname } = useLocation();
  const isAuth = authRoutes.some(r => pathname === r);

  return (
    <>
      {!isAuth && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/food" element={<FoodPage />} />
        <Route path="/food/:id" element={<RestaurantDetailPage />} />
        <Route path="/dine-out" element={<DineOutPage />} />
        <Route path="/dine-out/:id" element={<TableReservationPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/help"    element={<HelpCenterPage />} />
<Route path="/contact" element={<ContactPage />} />
<Route path="/privacy" element={<PrivacyPolicyPage />} />
      </Routes>
      {!isAuth && <Footer />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <AppLayout />
    </CartProvider>
  );
}

export default App;
