import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiInstagram, 
  FiFacebook 
} from 'react-icons/fi';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal, 
  FaCcAmex 
} from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si'; // A great icon for Razorpay
import { FaWhatsapp } from 'react-icons/fa6'; // Updated WhatsApp icon

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">

          {/* 1. Company Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/images/sticker.jpg" 
                alt="Swaad-E-Sehat Logo" 
                className="w-10 h-10 rounded-full object-cover border-2 border-slate-700" 
              />
              <h3 className="text-2xl font-semibold text-white font-serif">
                Swaad-E-Sehat
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Premium quality natural sweets and dry fruit products made with traditional recipes 
              and organic ingredients. Experience the authentic taste of homemade goodness.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/swaad_e._sehat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg text-slate-400 hover:bg-pink-600 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
              <a 
                href="https://facebook.com/swaad-e-sehat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-lg text-slate-400 hover:bg-blue-600 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Home</Link></li>
              <li><Link to="/products" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Products</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-white hover:pl-2 transition-all">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* 3. Customer Service */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Customer Service</h4>
            <ul className="space-y-3">
              <li><Link to="/shipping" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Returns & Refunds</Link></li>
              <li><Link to="/privacy" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-400 hover:text-white hover:pl-2 transition-all">Terms of Service</Link></li>
            </ul>
          </div>

          {/* 4. Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-5">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FiPhone className="text-blue-400 mt-1 flex-shrink-0" />
                <a href="tel:+918178063094" className="text-slate-400 hover:text-white transition-colors">+91 81780 63094</a>
              </li>
              <li className="flex items-start gap-3">
                <FaWhatsapp className="text-green-400 mt-1 flex-shrink-0" />
                <a href="https://wa.me/918178063094" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">WhatsApp Business</a>
              </li>
              <li className="flex items-start gap-3">
                <FiMail className="text-red-400 mt-1 flex-shrink-0" />
                <a href="mailto:brothersfoodie1@gmail.com" className="text-slate-400 hover:text-white transition-colors break-all">brothersfoodie1@gmail.com</a>
              </li>
            </ul>
          </div>

        </div>

        {/* Payment Methods */}
        <div className="border-t border-slate-800 py-8 text-center">
          <h4 className="text-lg font-semibold text-white mb-5">We Accept</h4>
          <div className="flex justify-center gap-6 flex-wrap">
            <FaCcVisa title="Visa" className="text-4xl text-gray-500 hover:text-white transition-colors" />
            <FaCcMastercard title="Mastercard" className="text-4xl text-gray-500 hover:text-white transition-colors" />
            <FaCcPaypal title="PayPal" className="text-4xl text-gray-500 hover:text-white transition-colors" />
            <FaCcAmex title="American Express" className="text-4xl text-gray-500 hover:text-white transition-colors" />
            <SiRazorpay title="Razorpay" className="text-4xl text-gray-500 hover:text-white transition-colors" />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Swaad-E-Sehat. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-slate-500 hover:text-white transition-colors">Privacy</Link>
              <Link to="/terms" className="text-sm text-slate-500 hover:text-white transition-colors">Terms</Link>
              <Link to="/sitemap" className="text-sm text-slate-500 hover:text-white transition-colors">Sitemap</Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;