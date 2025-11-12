import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2 } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  // --- Handlers ---
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  const handleRemoveFromWishlist = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    removeFromWishlist(productId);
  };

  // --- 1. Empty Wishlist State ---
  if (wishlist.length === 0) {
    return (
      <div className="w-full bg-slate-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-sm border border-dashed border-slate-300">
            <FiHeart className="w-20 h-20 text-red-300 mb-6" />
            <h1 className="text-3xl font-bold text-slate-800 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-md">
              You haven't added any products to your wishlist yet. Start browsing to find items you'll love.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- 2. Populated Wishlist State ---
  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-4xl font-bold font-serif text-slate-900">My Wishlist</h1>
            <p className="text-lg text-slate-500 mt-2">
              {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} in your wishlist
            </p>
          </div>
          <button 
            className="flex items-center justify-center sm:justify-start gap-2 px-5 py-2.5 font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
            onClick={clearWishlist}
          >
            <FiTrash2 className="w-5 h-5" />
            <span>Clear Wishlist</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 gap-6">
          {wishlist.map((product) => (
            <WishlistItem 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onRemove={handleRemoveFromWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Helper Component for each Wishlist Item ---
const WishlistItem = ({ product, onAddToCart, onRemove }) => {
  const price = product.salePrice || product.price;
  const originalPrice = product.price;
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  
  // Basic stock check (assuming `product.stock` exists)
  const isOutOfStock = product.stock === 0;

  return (
    <div className="flex flex-col md:flex-row bg-white rounded-xl shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      
      {/* Image */}
      <div className="relative md:w-1/4 lg:w-1/5 flex-shrink-0">
        <Link to={`/product/${product.slug || product.id}`}>
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="w-full h-48 md:h-full object-cover"
          />
        </Link>
        <button 
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white"
          onClick={(e) => onRemove(e, product.id)}
          aria-label="Remove from wishlist"
        >
          <FiHeart className="w-5 h-5 fill-current" />
        </button>
      </div>

      {/* Info */}
      <div className="p-6 flex-1 flex flex-col">
        <Link to={`/product/${product.slug || product.id}`}>
          <h2 className="text-xl font-semibold text-slate-800 hover:text-amber-600 mb-2">
            {product.name}
          </h2>
        </Link>
        
        {/* Description (optional) */}
        {product.description && (
          <p className="text-sm text-slate-500 mb-4 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-slate-900">₹{price}</span>
          {hasDiscount && (
            <span className="text-md text-slate-500 line-through">₹{originalPrice}</span>
          )}
        </div>

        {/* Stock Status */}
        {isOutOfStock && (
          <p className="font-semibold text-red-600 mb-4">
            Currently Out of Stock
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto pt-4 border-t border-slate-100">
          <button 
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={(e) => onAddToCart(e, product)}
            disabled={isOutOfStock}
          >
            <FiShoppingCart className="w-5 h-5" />
            <span>Add to Cart</span>
          </button>
          <Link 
            to={`/product/${product.slug || product.id}`}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 font-semibold text-amber-600 border-2 border-amber-500 rounded-lg hover:bg-amber-50 transition-all"
          >
            View Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;