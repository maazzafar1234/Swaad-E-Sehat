import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styles
import { FiShoppingCart, FiMenu, FiX, FiUser, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { getCartItemsCount } = useCart();
  const { wishlistCount } = useWishlist();

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close mobile menu (e.g., when a link is clicked)
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Effect to handle header shadow and blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state if user scrolls more than 10px
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 shadow-lg backdrop-blur-lg' 
          : 'bg-white shadow-md'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 group transition-transform transform hover:scale-105" 
            onClick={closeMenu}
          >
            <img 
              src="/images/sticker.jpg" 
              alt="Swaad-E-Sehat" 
              className="w-12 h-12 object-contain rounded-full shadow-lg group-hover:shadow-xl transition-shadow" 
            />
            <span className="font-serif text-2xl font-bold text-amber-600">
              Swaad-E-Sehat
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/products">Products</NavItem>
            <NavItem to="/about">About Us</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>

          {/* Header Actions (Icons) */}
          <div className="flex items-center space-x-3 md:space-x-4">
            
            {/* User Account */}
            <Link 
              to="/account" 
              className="p-2 text-slate-700 hover:text-amber-600 rounded-full hover:bg-amber-50 transition-colors" 
              aria-label="Account"
            >
              <FiUser className="w-6 h-6" />
            </Link>

            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="relative p-2 text-slate-700 hover:text-amber-600 rounded-full hover:bg-amber-50 transition-colors" 
              aria-label="Wishlist"
            >
              <FiHeart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link 
              to="/cart" 
              className="relative p-2 text-slate-700 hover:text-amber-600 rounded-full hover:bg-amber-50 transition-colors" 
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="w-6 h-6" />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-slate-700 hover:text-amber-600 rounded-full hover:bg-amber-50 transition-colors" 
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <FiX className="w-7 h-7" /> : <FiMenu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <nav 
            className="md:hidden border-t border-slate-200 py-4 animate-slideDown"
          >
            <ul className="flex flex-col space-y-1">
              <MobileNavItem to="/" onClick={closeMenu}>Home</MobileNavItem>
              <MobileNavItem to="/products" onClick={closeMenu}>Products</MobileNavItem>
              <MobileNavItem to="/about" onClick={closeMenu}>About Us</MobileNavItem>
              <MobileNavItem to="/contact" onClick={closeMenu}>Contact</MobileNavItem>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

// Helper component for Desktop Nav Links
const NavItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        `relative font-medium text-slate-700 hover:text-amber-600 transition-colors
         after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-amber-600 after:transition-all after:duration-300
         ${isActive ? 'text-amber-600 after:w-full' : 'after:w-0 hover:after:w-full'}`
      }
    >
      {children}
    </NavLink>
  );
};

// Helper component for Mobile Nav Links
const MobileNavItem = ({ to, onClick, children }) => {
  return (
    <li>
      <Link 
        to={to} 
        className="block w-full px-4 py-3 text-lg font-medium text-slate-700 rounded-md hover:bg-amber-50 hover:text-amber-600 transition-all"
        onClick={onClick}
      >
        {children}
      </Link>
    </li>
  );
};

export default Header;