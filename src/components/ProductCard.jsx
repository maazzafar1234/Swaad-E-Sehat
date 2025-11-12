import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart, FiHeart, FiEye, FiPackage } from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';

const ProductCard = ({ product, onAddToCart, viewMode = 'grid' }) => {
  // Use the first variant as default, or null if no variants
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0] || null);
  const [quantity, setQuantity] = useState(1); // Default to 1 for easier adding
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const isWishlisted = isInWishlist(product.id);

  // --- Derived State ---
  // Determine prices and stock based on selected variant or product default
  const currentPrice = selectedVariant?.price || product.salePrice || product.price;
  const originalPrice = selectedVariant?.originalPrice || product.price;
  const currentStock = selectedVariant?.stock || product.stock || 0;
  const hasDiscount = currentPrice < originalPrice;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
    : 0;

  // --- Event Handlers ---
  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productToAdd = {
      ...product,
      price: currentPrice,
      originalPrice: originalPrice,
      variant: selectedVariant?.id || 'default',
      variantName: selectedVariant?.name || 'Default',
      image: product.images?.[0] || product.image || '/images/placeholder.jpg'
    };
    
    onAddToCart(productToAdd, quantity);
    setQuantity(1); // Reset quantity to 1 after adding
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleQuantityChange = (e, amount) => {
    e.preventDefault();
    e.stopPropagation();
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  // (We'll skip handleVariantChange for the card, it's better on the product page)

  return (
    <div 
      className={`group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg
                  ${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-row'}`}
    >
      <Link to={`/product/${product.slug || product.id}`} className={`w-full ${viewMode === 'grid' ? 'flex flex-col' : 'flex flex-row'}`}>
        
        {/* Image Container */}
        <div 
          className={`relative overflow-hidden ${
            viewMode === 'grid' 
              ? 'w-full aspect-[4/3]' 
              : 'w-1/3 sm:w-1/4 md:w-1/5 flex-shrink-0 aspect-square'
          }`}
        >
          <img 
            src={product.images?.[0] || product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500 text-white">New</span>}
            {product.isBestSeller && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500 text-white">Best Seller</span>}
            {hasDiscount && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500 text-white">{discountPercentage}% OFF</span>}
          </div>

          {/* Quick Actions (Hover) */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
            <button 
              className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white hover:text-amber-600"
              onClick={handleWishlistClick}
              aria-label="Add to Wishlist"
            >
              <FiHeart className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
            </button>
            <button 
              className="w-9 h-9 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full text-slate-700 hover:bg-white hover:text-amber-600"
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); /* TODO: Implement Quick View */ }}
              aria-label="Quick View"
            >
              <FiEye />
            </button>
          </div>
        </div>

        {/* Info Container */}
        <div 
          className={`p-4 flex flex-1 ${
            viewMode === 'grid' 
              ? 'flex-col' 
              : 'flex-row gap-4 justify-between'
          }`}
        >
          
          {/* Product Details (Name, Stock, Price) */}
          <div className={`flex flex-col ${viewMode === 'grid' ? 'flex-1' : 'flex-1 justify-center'}`}>
            <h3 className="text-lg font-semibold text-slate-800 hover:text-amber-600 mb-2 line-clamp-2">
              {product.name}
            </h3>
            
            <div className="flex items-center gap-1.5 text-sm mb-2">
              <FiPackage className="text-slate-500" />
              <span className={currentStock > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                {currentStock > 10 ? 'In Stock' : (currentStock > 0 ? `Only ${currentStock} left` : 'Out of Stock')}
              </span>
            </div>
            
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-xl font-bold text-slate-900">₹{currentPrice}</span>
              {hasDiscount && (
                <span className="text-sm text-slate-500 line-through">₹{originalPrice}</span>
              )}
            </div>
          </div>

          {/* Actions (Quantity & Add to Cart) */}
          <div className={`flex ${
            viewMode === 'grid' 
              ? 'flex-col gap-3' 
              : 'flex-col justify-center items-center gap-3 w-1/3 sm:w-1/4'
          }`}>
            {currentStock > 0 ? (
              <>
                {/* Quantity Selector */}
                <div className="flex items-center justify-center">
                  <button 
                    className="quantity-btn"
                    onClick={(e) => handleQuantityChange(e, -1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-medium">{quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={(e) => handleQuantityChange(e, 1)}
                    disabled={quantity >= currentStock}
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button 
                  className="flex items-center justify-center gap-2 w-full px-4 py-2.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleAddToCartClick}
                  disabled={currentStock === 0}
                >
                  <FiShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
              </>
            ) : (
              <button 
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 font-semibold text-slate-600 bg-slate-200 rounded-lg cursor-not-allowed"
                disabled
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;