import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiEye, 
  FiPackage,
  FiX,
  FiCheck,
  FiLoader  
} from 'react-icons/fi';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { getProductBySlug } from '../data/products'; 
import { toast } from 'react-toastify';

const ProductCard = ({ product, viewMode = 'grid' }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  
  const { items, addToCart, updateQuantity, removeFromCart } = useCart();

  const isWishlisted = isInWishlist(product.id);
  const [isModalOpen, setIsModalOpen] = useState(false);

  
  const itemInCart = items.find(
    item => item.id === product.id && item.variantName === 'Default'
  );

  const price = product.base_price || product.price || 0;
  const originalPrice = product.base_original_price || product.originalPrice || price;
  const hasDiscount = originalPrice > price;
  const discountPercentage = hasDiscount 
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0;

  const currentStock = product.stock || 0;
  const productImages = product.images || [];

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const productToAdd = {
      ...product,
      id: product.id,
      price: price,
      originalPrice: originalPrice,
      variant: 'default',
      variantName: 'Default',
      image: productImages[0] || '/images/placeholder.jpg'
    };
    
    addToCart(productToAdd, 1); 
    toast.success(`${product.name} added to cart!`);
  };

  const handleIncreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(itemInCart.id, itemInCart.quantity + 1, itemInCart.variant);
  };

  const handleDecreaseQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (itemInCart.quantity === 1) {
      removeFromCart(itemInCart.id, itemInCart.variant);
      toast.info(`${product.name} removed from cart`);
    } else {
      updateQuantity(itemInCart.id, itemInCart.quantity - 1, itemInCart.variant);
    }
  };

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
    toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
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
              src={productImages[0] || '/images/placeholder.jpg'}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Badges (Unchanged) */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.isNew > 0 && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-500 text-white">New</span>}
              {product.isBestSeller > 0 && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500 text-white">Best Seller</span>}
              {hasDiscount && (
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-red-500 text-white">
                  {discountPercentage}% OFF
                </span>
              )}
            </div>

            {/* Quick Actions (Unchanged) */}
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
                onClick={handleQuickViewClick}
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
            {/* Product Details (Unchanged) */}
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
                <span className="text-xl font-bold text-slate-900">₹{price}</span>
                {hasDiscount && (
                  <span className="text-sm text-slate-500 line-through">₹{originalPrice}</span>
                )}
              </div>
            </div>

            <div className={`flex ${
              viewMode === 'grid' 
                ? 'flex-col gap-3' 
                : 'flex-col justify-center items-center gap-3 w-1/3 sm:w-1/4'
            }`}>
              {currentStock > 0 ? (
                <>
                  {itemInCart && viewMode === 'grid' ? (
                    <div className="flex items-center justify-center">
                      <button 
                        className="quantity-btn"
                        onClick={handleDecreaseQuantity}
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-medium">{itemInCart.quantity}</span>
                      <button 
                        className="quantity-btn"
                        onClick={handleIncreaseQuantity}
                        disabled={itemInCart.quantity >= currentStock}
                      >
                        +
                      </button>
                    </div>
                  ) : itemInCart && viewMode === 'list' ? (
                    <button 
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 font-semibold text-white bg-green-500 rounded-lg shadow-md cursor-default"
                      disabled
                    >
                      <FiCheck className="w-5 h-5" />
                      <span>In Cart</span>
                    </button>
                  ) : (
                    <button 
                      className="flex items-center justify-center gap-2 w-full px-4 py-2.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
                      onClick={handleAddToCartClick}
                    >
                      <FiShoppingCart className="w-5 h-5" />
                      <span>Add to Cart</span>
                    </button>
                  )}
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

      {isModalOpen && (
        <QuickViewModal 
          productSlug={product.slug}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={`w-4 h-4 ${ i < Math.floor(rating || 0) ? 'text-yellow-400 fill-current' : 'text-slate-300' }`}
      />
    ))}
  </div>
);


const QuickViewModal = ({ productSlug, onClose }) => {
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchFullProduct = async () => {
      setIsLoading(true);
      const data = await getProductBySlug(productSlug);
      if (data) {
        setProduct(data);
        setSelectedVariant(data.variants?.[0] || null);
      }
      setIsLoading(false);
    };
    fetchFullProduct();
  }, [productSlug]);

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    const currentStock = selectedVariant?.stock || 0;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedVariant) return;

    const productToAdd = {
      ...product,
      id: product.id,
      price: selectedVariant.price,
      originalPrice: selectedVariant.originalPrice,
      variant: selectedVariant.id,
      variantName: selectedVariant.name,
      image: product.images?.[0] || '/images/placeholder.jpg'
    };
    addToCart(productToAdd, quantity);
    toast.success(`${product.name} (${selectedVariant.name}) added to cart!`);
    onClose();
  };
  
  const currentStock = selectedVariant?.stock || 0;
  const price = selectedVariant?.price || 0;
  const originalPrice = selectedVariant?.originalPrice || price;
  const hasDiscount = originalPrice > price;

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] grid grid-cols-1 md:grid-cols-2 overflow-hidden" 
        onClick={e => e.stopPropagation()}
      >
        
        {/* Image Side */}
        <div className="relative aspect-square">
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center bg-slate-100">
              <FiLoader className="w-12 h-12 text-amber-500 animate-spin" />
            </div>
          ) : (
            <img 
              src={product?.images?.[0] || '/images/placeholder.jpg'} 
              alt={product?.name} 
              className="w-full h-full object-cover" 
            />
          )}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/70 rounded-full hover:bg-white transition-colors z-10"
            aria-label="Close"
          >
            <FiX />
          </button>
        </div>

        {/* Info Side */}
        <div className="flex flex-col p-6 md:p-8 overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <FiLoader className="w-12 h-12 text-amber-500 animate-spin" />
              <p className="mt-4 text-slate-600">Loading details...</p>
            </div>
          ) : !product ? (
            <div className="flex flex-col items-center justify-center h-full">
              <p className="text-red-600">Could not load product details.</p>
            </div>
          ) : (
            <>
              <Link 
                to={`/product/${product.slug}`} 
                className="text-2xl font-bold font-serif text-slate-800 hover:text-amber-600" 
                onClick={onClose}
              >
                {product.name}
              </Link>
              
              <div className="flex items-center gap-2 text-sm mt-2">
                <StarRating rating={product.rating} />
                <span className="text-slate-500">({product.reviews || 0} reviews)</span>
              </div>
              
              <div className="flex items-baseline gap-3 my-4">
                <span className="text-3xl font-bold text-slate-900">₹{price}</span>
                {hasDiscount && (
                  <span className="text-xl text-slate-400 line-through">₹{originalPrice}</span>
                )}
              </div>

              {/* Variants */}
              <div className="mb-4">
                <h3 className="text-sm font-medium text-slate-800 mb-2">
                  Select Size: <span className="font-bold">{selectedVariant.name}</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant, index) => (
                    <button
                      key={index}
                      className={`px-3 py-1.5 rounded-md border text-sm transition-all ${
                        selectedVariant.id === variant.id
                          ? 'bg-amber-100 border-amber-500 ring-1 ring-amber-500'
                          : 'bg-white border-slate-300 hover:border-slate-500'
                      }`}
                      onClick={() => {
                        setSelectedVariant(variant);
                        setQuantity(1);
                      }}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 my-4">
                <div className="flex items-center">
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-lg font-medium">{quantity}</span>
                  <button 
                    className="quantity-btn" 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= currentStock}
                  >
                    +
                  </button>
                </div>
                <span className="text-sm font-medium text-green-600">
                  {currentStock > 0 ? `${currentStock} in stock` : 'Out of Stock'}
                </span>
              </div>

              <button 
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-50" 
                onClick={handleAddToCart}
                disabled={currentStock <= 0}
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              
              <Link 
                to={`/product/${product.slug}`} 
                className="text-center text-amber-600 font-medium mt-4 hover:underline" 
                onClick={onClose}
              >
                View Full Product Details
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;