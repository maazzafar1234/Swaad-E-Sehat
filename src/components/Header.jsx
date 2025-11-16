import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FiShoppingCart, FiMenu, FiX, FiUser, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { getCartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link 
            to="/" 
            className="flex items-center gap-2 group" 
            onClick={closeMenu}
          >
            <img 
              src="/images/sticker.jpg" 
              alt="Swaad-E-Sehat" 
              className="w-11 h-11 object-contain rounded-full" 
            />
            <span className="font-bold text-xl text-slate-900 hidden sm:inline">
              Swaad-E-Sehat
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/products">Products</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>

          <div className="flex items-center space-x-3">
            
            <Link 
              to="/account" 
              className="p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Account"
            >
              <FiUser className="w-5 h-5" />
            </Link>

            {isLoggedIn && (
              <Link 
                to="/wishlist" 
                className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Wishlist"
              >
                <FiHeart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
                    {wishlistCount}
                  </span>
                )}
              </Link>
            )}

            <Link 
              to="/cart" 
              className="relative p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="w-5 h-5" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs font-bold rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            <button 
              className="md:hidden p-2.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden border-t border-slate-200 py-3">
            <ul className="flex flex-col space-y-1">
              <MobileNavItem to="/" onClick={closeMenu}>Home</MobileNavItem>
              <MobileNavItem to="/products" onClick={closeMenu}>Products</MobileNavItem>
              <MobileNavItem to="/about" onClick={closeMenu}>About</MobileNavItem>
              <MobileNavItem to="/contact" onClick={closeMenu}>Contact</MobileNavItem>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `font-medium text-sm transition-colors ${
          isActive 
            ? 'text-slate-900' 
            : 'text-slate-600 hover:text-slate-900'
        }`
      }
    >
      {children}
    </NavLink>
  );
};

const MobileNavItem = ({ to, onClick, children }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="block w-full px-4 py-2.5 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

export default Header;