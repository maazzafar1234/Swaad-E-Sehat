import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import OrderConfirmation from './pages/OrderConfirmation';
import WishlistPage from './pages/WishlistPage';
import Account from './pages/account';
import UserDashboard from './pages/UserDashboard';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

// Styles
import './App.css';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/order-confirmation" element={<OrderConfirmation />} />

                {/* Add more routes as needed */}
                <Route path="*" element={<h2>404: Page Not Found</h2>} />
                <Route path="/account" element={<Account />} />
                <Route path="/user/dashboard" element={<UserDashboard />} />
              </Routes>
            </main>
            <Footer />
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
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
