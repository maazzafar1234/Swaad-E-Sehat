import React, { useState } from 'react'; // <-- Added useState
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  FiStar, 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiMinus, 
  FiPlus, 
  FiTruck, 
  FiShield, 
  FiRefreshCw,
  FiChevronRight,
  FiUsers,    // <-- Added for Bulk Orders
  FiCopy,     // <-- Added for Share Modal
  FiX,        // <-- Added for Share Modal
  FiMail
} from 'react-icons/fi';
import { 
  FaWhatsapp, // <-- Added for Share Modal
  FaFacebook, // <-- Added for Share Modal
  FaTwitter   // <-- Added for Share Modal
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { getProductBySlug, getProductById } from '../data/products';
import { toast } from 'react-toastify';

// --- Main Component ---
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const product = getProductBySlug(id) || getProductById(parseInt(id));

  // --- State ---
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); // <-- NEW: State for Share Modal

  // --- "Not Found" State ---
  if (!product || !selectedVariant) {
    return (
      <div className="w-full bg-slate-50 pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <h1 className="text-4xl font-bold font-serif text-slate-800 mb-4">Product Not Found</h1>
          <p className="text-lg text-slate-600 mb-8">The product you're looking for doesn't exist or may have been removed.</p>
          <button 
            onClick={() => navigate('/products')} 
            className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  // --- Derived State & Variables ---
  const isWishlisted = isInWishlist(product.id);
  const currentStock = selectedVariant.stock || product.stock || 0;
  const hasDiscount = selectedVariant.originalPrice > selectedVariant.price;
  const discountPercentage = hasDiscount
    ? Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100)
    : 0;

  // --- Event Handlers ---
  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      price: selectedVariant.price,
      originalPrice: selectedVariant.originalPrice,
      variant: selectedVariant.id,
      variantName: selectedVariant.name,
      image: product.images?.[0] || product.image || '/images/placeholder.jpg'
    };
    
    addToCart(productToAdd, quantity);
    toast.success(`${product.name} (${selectedVariant.name}) added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleQuantityChange = (amount) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlistClick = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      toast.info(`${product.name} removed from wishlist`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist!`);
    }
  };

  return (
    <div className="w-full bg-white pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Breadcrumb */}
        <nav className="flex items-center text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-amber-600">Home</Link>
          <FiChevronRight className="w-4 h-4 mx-1" />
          <Link to="/products" className="hover:text-amber-600">Products</Link>
          <FiChevronRight className="w-4 h-4 mx-1" />
          <span className="font-medium text-slate-700 truncate">{product.name}</span>
        </nav>

        {/* --- Main Product Grid (Images + Info) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Column 1: Product Images */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-slate-50 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {hasDiscount && (
                <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-sm font-semibold rounded-full">
                  {discountPercentage}% OFF
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-5 gap-3">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`w-full aspect-square rounded-lg object-cover cursor-pointer transition-all ${
                    selectedImage === index
                      ? 'ring-2 ring-amber-500 ring-offset-2'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>

          {/* Column 2: Product Info */}
          <div className="flex flex-col gap-5">
            {/* Header: Badges, Title, Rating */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.isNew && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 text-blue-600">New</span>}
                {product.isBestSeller && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 text-amber-600">Best Seller</span>}
              </div>
              
              <h1 className="text-4xl font-bold font-serif text-slate-900 mb-3">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-2 text-sm">
                <StarRating rating={product.rating} />
                <span className="text-slate-500">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Variants */}
            <div>
              <h3 className="text-sm font-medium text-slate-800 mb-2">Select Size:</h3>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2.5 rounded-lg border text-sm transition-all ${
                      selectedVariant.id === variant.id
                        ? 'bg-amber-100 border-amber-500 ring-1 ring-amber-500'
                        : 'bg-white border-slate-300 hover:border-slate-500'
                    }`}
                    onClick={() => {
                      setSelectedVariant(variant);
                      setQuantity(1); // Reset quantity on variant change
                    }}
                    aria-pressed={selectedVariant.id === variant.id}
                  >
                    <span className="font-semibold text-slate-800">{variant.name}</span>
                    <span className="text-slate-600 ml-2">₹{variant.price}</span>
                    {variant.originalPrice > variant.price && (
                      <span className="text-slate-500 line-through ml-1.5">₹{variant.originalPrice}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-slate-900">₹{selectedVariant.price}</span>
              {hasDiscount && (
                <span className="text-2xl text-slate-400 line-through">₹{selectedVariant.originalPrice}</span>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center">
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span className="w-16 text-center text-lg font-medium">{quantity}</span>
                <button
                  className="quantity-btn"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= currentStock}
                >
                  <FiPlus />
                </button>
              </div>
              <span className="text-sm font-medium text-green-600">
                {currentStock} items in stock
              </span>
            </div>

            {/* CTAs: Add to Cart, Buy Now */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button 
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-50" 
                onClick={handleAddToCart}
                disabled={currentStock <= 0 || quantity <= 0}
              >
                <FiShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 font-semibold text-white bg-slate-800 rounded-lg shadow-md hover:bg-slate-900 transition-all disabled:opacity-50"
                onClick={handleBuyNow} 
                disabled={currentStock <= 0 || quantity <= 0}
              >
                Buy Now
              </button>
            </div>

            {/* Secondary Actions: Wishlist, Share */}
            <div className="flex items-center gap-4">
              <button 
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isWishlisted 
                    ? 'text-red-500' 
                    : 'text-slate-600 hover:text-red-500'
                }`}
                onClick={handleWishlistClick}
              >
                <FiHeart className={isWishlisted ? 'fill-current' : ''} />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
              </button>
              
              {/* --- MODIFIED SHARE BUTTON --- */}
              <button 
                className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors"
                onClick={() => setIsShareModalOpen(true)} // <-- Opens the modal
              >
                <FiShare2 />
                Share
              </button>
            </div>
            
            {/* --- NEW: BULK ORDER SECTION --- */}
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-4">
              <FiUsers className="w-10 h-10 text-amber-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-slate-800">Need a Custom or Bulk Order?</h4>
                <p className="text-sm text-slate-600">
                  We offer special pricing for events and bulk orders. 
                  <Link to="/contact" className="font-medium text-amber-600 hover:underline ml-1">Contact us for details.</Link>
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <ProductFeature icon={<FiTruck />} text="Free shipping over ₹500" />
              <ProductFeature icon={<FiShield />} text="100% Natural Ingredients" />
              <ProductFeature icon={<FiRefreshCw />} text="Secure 100% Payment" />
            </div>

          </div>
        </div>

        {/* --- Product Details Tabs (Full Width) --- */}
        <div className="mt-20">
          {/* (Tab section is unchanged) */}
          <div className="flex border-b border-slate-200">
            <TabButton title="Description" activeTab={activeTab} onClick={setActiveTab} />
            <TabButton title="Ingredients" activeTab={activeTab} onClick={setActiveTab} />
            <TabButton title="Benefits" activeTab={activeTab} onClick={setActiveTab} />
            <TabButton title="Nutrition" activeTab={activeTab} onClick={setActiveTab} />
          </div>
          <div className="py-8 prose prose-slate max-w-none">
            {activeTab === 'description' && (
              <div>
                <h3>Product Description</h3>
                <p>{product.detailedDescription || product.description}</p>
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div>
                <h3>Ingredients</h3>
                <ul className="list-disc list-outside pl-5">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === 'benefits' && (
              <div>
                <h3>Health Benefits</h3>
                <ul className="list-disc list-outside pl-5">
                  <li>Rich in essential vitamins and minerals</li>
                  <li>Natural source of energy</li>
                  <li>Supports heart health</li>
                  <li>Boosts immune system</li>
                  <li>No artificial preservatives</li>
                </ul>
              </div>
            )}
            {activeTab === 'nutrition' && (
              <div>
                <h3>Nutrition Facts (per 100g)</h3>
                <div className="not-prose border border-slate-200 rounded-lg overflow-hidden">
                  <div className="divide-y divide-slate-200">
                    <NutritionItem label="Calories" value={product.nutritionalInfo.calories} />
                    <NutritionItem label="Protein" value={product.nutritionalInfo.protein} />
                    <NutritionItem label="Fat" value={product.nutritionalInfo.fat} />
                    <NutritionItem label="Carbohydrates" value={product.nutritionalInfo.carbs} />
                    <NutritionItem label="Fiber" value={product.nutritionalInfo.fiber} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- NEW: SHARE MODAL --- */}
      {isShareModalOpen && (
        <ShareModal 
          productName={product.name} 
          onClose={() => setIsShareModalOpen(false)} 
        />
      )}
    </div>
  );
};

// --- NEW: Share Modal Component ---
const ShareModal = ({ productName, onClose }) => {
  const url = window.location.href;
  const text = `Check out this product from Swaad-E-Sehat: ${productName}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);
  const encodedSubject = encodeURIComponent(`Check out: ${productName}`);

  const shareLinks = [
    { 
      name: 'WhatsApp', 
      icon: FaWhatsapp, 
      href: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600'
    },
    { 
      name: 'Facebook', 
      icon: FaFacebook, 
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    { 
      name: 'Twitter', 
      icon: FaTwitter, 
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    { 
      name: 'Email', 
      icon: FiMail, 
      href: `mailto:?subject=${encodedSubject}&body=${encodedText}%20${encodedUrl}`,
      color: 'bg-slate-600 hover:bg-slate-700'
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!");
    }, (err) => {
      toast.error("Failed to copy link.");
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4"
      onClick={onClose} // Close when clicking the overlay
    >
      <div 
        className="bg-white rounded-xl shadow-xl w-full max-w-md"
        onClick={e => e.stopPropagation()} // Prevent modal from closing when clicking inside
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h3 className="text-xl font-bold text-slate-800">Share "{productName}"</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full">
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-4">Share this product with your friends:</p>
          <div className="grid grid-cols-2 gap-3">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-3 p-3 rounded-lg text-white font-medium ${link.color} transition-all`}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
          
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-700 mb-2">Or copy the link</p>
            <div className="flex">
              <input 
                type="text"
                value={url}
                readOnly
                className="w-full px-4 py-2 border border-slate-300 rounded-l-lg bg-slate-50 text-slate-700"
              />
              <button
                onClick={handleCopyLink}
                className="flex-shrink-0 px-4 py-2 bg-amber-500 text-white rounded-r-lg hover:bg-amber-600 transition-colors"
                aria-label="Copy link"
              >
                <FiCopy />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Helper Components ---
// (These are unchanged)

const StarRating = ({ rating }) => (
  <div className="flex items-center">
    {[...Array(5)].map((_, i) => (
      <FiStar 
        key={i} 
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'
        }`}
      />
    ))}
  </div>
);

const ProductFeature = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-sm">
    <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <span className="font-medium text-slate-700">{text}</span>
  </div>
);

const TabButton = ({ title, activeTab, onClick }) => {
  const isActive = activeTab === title.toLowerCase();
  return (
    <button 
      className={`py-4 px-6 font-semibold border-b-2 transition-colors ${
        isActive
          ? 'border-amber-500 text-amber-600'
          : 'border-transparent text-slate-500 hover:text-slate-800'
      }`}
      onClick={() => onClick(title.toLowerCase())}
    >
      {title}
    </button>
  );
};

const NutritionItem = ({ label, value }) => (
  <div className="px-4 py-3 flex justify-between items-center even:bg-slate-50">
    <span className="text-sm font-medium text-slate-800">{label}</span>
    <span className="text-sm text-slate-600">{value}</span>
  </div>
);

export default ProductDetail;