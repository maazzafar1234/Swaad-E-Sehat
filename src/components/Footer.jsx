import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMail, 
  FiPhone, 
  FiInstagram, 
  FiFacebook,
  FiMapPin
} from 'react-icons/fi';
import { 
  FaCcVisa, 
  FaCcMastercard, 
  FaCcPaypal, 
  FaCcAmex 
} from 'react-icons/fa';
import { SiRazorpay } from 'react-icons/si';
import { FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 lg:py-20">

          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src="https://ik.imagekit.io/swaadesehat/swadesehat-frontent-image/sticker.jpg" 
                alt="Swaad-E-Sehat Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500 shadow-lg" 
              />
              <h3 className="text-2xl font-bold text-white font-serif">
                Swaad-E-Sehat
              </h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-sm">
              Premium quality natural sweets and dry fruit products made with traditional recipes 
              and organic ingredients. Experience the authentic taste of homemade goodness.
            </p>
            
            <div className="flex gap-3">
              <a 
                href="https://instagram.com/swaad_e._sehat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-lg text-slate-400 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <FiInstagram />
              </a>
              {/* <a 
                href="https://facebook.com/swaad-e-sehat" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-lg text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <FiFacebook />
              </a> */}
              <a 
                href="https://wa.me/918178063094" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-11 h-11 bg-slate-800 rounded-xl flex items-center justify-center text-lg text-slate-400 hover:bg-green-500 hover:text-white transition-all duration-300 hover:scale-110"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Customer Service
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/shipping" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-and-refund" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-400 hover:text-amber-400 hover:pl-2 transition-all duration-200 inline-block">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 relative inline-block">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-amber-500"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 transition-colors">
                  <FiPhone className="text-blue-400 group-hover:text-white transition-colors" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Phone</p>
                  <a href="tel:+918178063094" className="text-slate-300 hover:text-amber-400 transition-colors text-sm">
                    +91 81780 63094
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-500 transition-colors">
                  <FaWhatsapp className="text-green-400 group-hover:text-white transition-colors" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">WhatsApp</p>
                  <a href="https://wa.me/918178063094" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-amber-400 transition-colors text-sm">
                    Chat with us
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-red-500 transition-colors">
                  <FiMail className="text-red-400 group-hover:text-white transition-colors" size={18} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 mb-1">Email</p>
                  <a href="mailto:brothersfoodie1@gmail.com" className="text-slate-300 hover:text-amber-400 transition-colors text-sm break-all">
                    brothersfoodie1@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-slate-800 py-10">
          <div className="text-center">
            <h4 className="text-lg font-bold text-white mb-6">Secure Payment Methods</h4>
            <div className="flex justify-center items-center gap-6 lg:gap-8 flex-wrap">
              <div className="group cursor-pointer">
                <FaCcVisa className="text-5xl text-slate-600 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
              <div className="group cursor-pointer">
                <FaCcMastercard className="text-5xl text-slate-600 group-hover:text-red-500 transition-colors duration-300" />
              </div>
              <div className="group cursor-pointer">
                <FaCcPaypal className="text-5xl text-slate-600 group-hover:text-blue-400 transition-colors duration-300" />
              </div>
              <div className="group cursor-pointer">
                <FaCcAmex className="text-5xl text-slate-600 group-hover:text-blue-600 transition-colors duration-300" />
              </div>
              <div className="group cursor-pointer">
                <SiRazorpay className="text-4xl text-slate-600 group-hover:text-blue-500 transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} <span className="text-amber-500 font-semibold">Swaad-E-Sehat</span>. All rights reserved. Made with ❤️ in India.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-sm text-slate-500 hover:text-amber-400 transition-colors">
                Privacy
              </Link>
              <Link to="/return-and-refund" className="text-sm text-slate-500 hover:text-amber-400 transition-colors">
                Terms
              </Link>
              <Link to="/sitemap" className="text-sm text-slate-500 hover:text-amber-400 transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;