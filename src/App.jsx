import React , { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainLayout from './components/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Eagerly load critical components
import HomePage from './pages/HomePage';

// Lazy load non-critical pages
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const TermAnsConditions = lazy(() => import('./pages/TermAnsConditions'));
const Shippingpage = lazy(() => import('./pages/Shipping.jsx'));
const ReturnAndRefund = lazy(() => import('./pages/ReturnAndRefund.jsx'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const FAQ = lazy(() => import('./pages/Faqs'));
const NotFound = lazy(() => import("./pages/404"));

const Account = lazy(() => import('./pages/account'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));

// Lazy load admin components
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const AdminProductList = lazy(() => import('./pages/admin/AdminProductList'));
const AdminProductForm = lazy(() => import('./pages/admin/AdminProductForm'));
const AdminOrderList = lazy(() => import('./pages/admin/AdminOrderList'));
const AdminUserList = lazy(() => import('./pages/admin/AdminUserList'));
const AdminOrderDetail = lazy(() => import('./pages/admin/AdminOrderDetail'));
const AdminSettings = lazy(() => import('./pages/admin/AdminSettingPage'));

import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import './App.css';

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto"></div>
      <p className="mt-4 text-slate-600">Loading...</p>
    </div>
  </div>
);

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

          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
          
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
