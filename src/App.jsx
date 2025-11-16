import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/MainLayout'; 
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OrderConfirmation from './pages/OrderConfirmation';
import WishlistPage from './pages/WishlistPage';
import TermAnsConditions from './pages/TermAnsConditions';
import Shippingpage from './pages/Shipping.jsx';
import ReturnAndRefund from './pages/ReturnAndRefund.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/Faqs';
import NotFound from "./pages/404";

import Account from './pages/account';
import UserDashboard from './pages/UserDashboard';

import AdminProductList from './pages/admin/AdminProductList';
import AdminProductForm from './pages/admin/AdminProductForm';
import AdminOrderList from './pages/admin/AdminOrderList';
import AdminUserList from './pages/admin/AdminUserList';     
import AdminOrderDetail from './pages/admin/AdminOrderDetail'; 
import AdminSettings from './pages/admin/AdminSettingPage'; 

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import './App.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="products" element={<ProductsPage />} />
              <Route path="product/:id" element={<ProductDetail />} />
              <Route path="cart" element={<CartPage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="checkout" element={<CheckoutPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="order-confirmation" element={<OrderConfirmation />} />
              <Route path="terms-and-conditions" element={<TermAnsConditions />} />
              <Route path="shipping" element={<Shippingpage />} />
              <Route path="return-and-refund" element={<ReturnAndRefund />} />
              <Route path="privacy" element={<PrivacyPolicy />} />
              <Route path="faq" element={<FAQ />} />
              
              <Route path="account" element={<Account />} />
              <Route path="user/dashboard" element={<UserDashboard />} />
            </Route>

 
            <Route element={<ProtectedRoute adminOnly />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminProductList />} />
                <Route path="products" element={<AdminProductList />} />
                <Route path="products/new" element={<AdminProductForm />} />
                <Route path="products/edit/:id" element={<AdminProductForm />} />
                <Route path="orders" element={<AdminOrderList />} />
                <Route path="orders/:id" element={<AdminOrderDetail />} />
                <Route path="users" element={<AdminUserList />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;