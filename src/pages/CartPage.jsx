import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiMinus, 
  FiPlus, 
  FiTrash2, 
  FiShoppingBag, 
  FiArrowLeft,
  FiTruck,       
  FiShield,      
  FiRotateCcw    
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    getCartItemsCount,
    clearCart 
  } = useCart();

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    return items.reduce((total, item) => {
      if (item.originalPrice > item.price) {
        return total + ((item.originalPrice - item.price) * item.quantity);
      }
      return total;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = calculateDiscount();
  const tax = subtotal * 0.18; //gst 18%
  const total = subtotal + tax; 

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-4xl font-bold font-serif text-slate-900">
              Shopping Cart
            </h1>
            <p className="text-lg text-slate-500 mt-2">
              You have {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'} in your cart.
            </p>
          </div>
          <Link 
            to="/products" 
            className="flex items-center gap-2 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Cart Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Cart Items (Left Column) */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item, index) => (
              <CartItem 
                key={`${item.id}-${item.variant}-${index}`} 
                item={item} 
                onUpdate={updateQuantity}
                onRemove={removeFromCart}
              />
            ))}
            <button 
              className="flex items-center gap-2 px-4 py-2 font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
              onClick={clearCart}
            >
              <FiTrash2 className="w-5 h-5" />
              <span>Clear Cart</span>
            </button>
          </div>

          {/* Order Summary (Right Column) */}
          <div className="lg:col-span-1">
            <OrderSummary 
              subtotal={subtotal}
              discount={discount}
              tax={tax}
              total={total}
              itemCount={getCartItemsCount()}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

// --- Helper Component: Empty Cart State ---
const EmptyCart = () => (
  <div className="w-full bg-slate-50 pt-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="flex flex-col items-center justify-center text-center bg-white p-12 rounded-xl shadow-sm border border-dashed border-slate-300">
        <FiShoppingBag className="w-20 h-20 text-amber-400 mb-6" />
        <h1 className="text-3xl font-bold text-slate-800 mb-4">
          Your Cart is Empty
        </h1>
        <p className="text-lg text-slate-500 mb-8 max-w-md">
          Looks like you haven't added any items yet. Start shopping to find your new favorites.
        </p>
        
        {/* Featured Product */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col sm:flex-row items-center gap-4 max-w-lg mb-8">
          <img 
            src="/images/MUSCLELADDU.jpg" 
            alt="Muscle Laddu" 
            className="w-24 h-24 rounded-md object-cover flex-shrink-0"
          />
          <div className="text-left">
            <h3 className="font-semibold text-slate-800">Try Our Premium Muscle Laddu</h3>
            <p className="text-sm text-slate-500">Packed with protein and premium dry fruits.</p>
          </div>
          {/* <Link 
            to="/product/dry-fruit-khajur-pak" // Update this slug to the correct one
            className="flex-shrink-0 w-full sm:w-auto px-4 py-2 text-sm font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
          >
            View Item
          </Link> */}
        </div>
        
        <Link 
          to="/products" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  </div>
);

// --- Helper Component: Individual Cart Item Card ---
const CartItem = ({ item, onUpdate, onRemove }) => {
  const handleQuantityChange = (amount) => {
    const newQuantity = item.quantity + amount;
    if (newQuantity < 1) {
      onRemove(item.id, item.variant);
    } else {
      onUpdate(item.id, newQuantity, item.variant);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row bg-white rounded-xl shadow-md overflow-hidden">
      {/* Image */}
      <div className="sm:w-1/3 md:w-1/4">
        <img 
          src={item.image || (item.images && item.images[0]) || '/images/placeholder.jpg'} 
          alt={item.name}
          className="w-full h-48 sm:h-full object-cover"
        />
      </div>
      
      {/* Details */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link to={`/product/${item.slug || item.id}`} className="text-lg font-semibold text-slate-800 hover:text-amber-600">
                {item.name}
              </Link>
              {item.variantName && item.variantName !== 'Default' && (
                <p className="text-sm text-slate-500">Size: {item.variantName}</p>
              )}
            </div>
            <button 
              className="p-1 text-slate-500 hover:text-red-500"
              onClick={() => onRemove(item.id, item.variant)}
              aria-label="Remove item"
            >
              <FiTrash2 className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-lg font-bold text-slate-900">₹{item.price.toFixed(2)}</span>
            {item.originalPrice > item.price && (
              <span className="text-sm text-slate-500 line-through">₹{item.originalPrice.toFixed(2)}</span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          {/* Quantity Selector */}
          <div className="flex items-center">
            <button 
              className="quantity-btn" // Use the class from index.css
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="w-12 text-center font-medium">{item.quantity}</span>
            <button 
              className="quantity-btn" // Use the class from index.css
              onClick={() => handleQuantityChange(1)}
              // Add a check against item.stock if you have it
              // disabled={item.quantity >= item.stock} 
            >
              +
            </button>
          </div>
          
          {/* Item Total */}
          <p className="text-lg font-semibold text-slate-800 text-right">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

// --- Helper Component: Order Summary Card ---
const OrderSummary = ({ subtotal, discount, tax, total, itemCount }) => {
const isLoggedIn = !!localStorage.getItem('authToken');
  return (
  <div className="bg-white rounded-xl shadow-md sticky top-28">
    <h3 className="text-2xl font-semibold p-6 border-b border-slate-200">
      Order Summary
    </h3>
    
    <div className="p-6 space-y-3">
      <div className="flex justify-between items-center text-slate-600">
        <span>Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
        <span className="font-medium text-slate-800">₹{subtotal.toFixed(2)}</span>
      </div>
      
      {discount > 0 && (
        <div className="flex justify-between items-center text-green-600">
          <span>Discount</span>
          <span className="font-medium">-₹{discount.toFixed(2)}</span>
        </div>
      )}
      
      <div className="flex justify-between items-center text-slate-600">
        <span>GST (18%)</span>
        <span className="font-medium text-slate-800">₹{tax.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between items-center text-slate-600">
        <span>Shipping</span>
        <span className="font-medium text-green-600">FREE</span>
      </div>
      
      <div className="border-t border-slate-200 my-4"></div>
      
      <div className="flex justify-between items-center text-xl font-bold text-slate-900">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
    
    <div className="p-6 border-t border-slate-100">
      {isLoggedIn ? (
        <Link 
          to="/checkout" 
          className="w-full flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
        >
          Proceed to Checkout
        </Link>
      ) : (
        <div className="text-center">
          <Link 
            to="/account" 
            className="w-full flex items-center justify-center gap-2 px-8 py-3 font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 transition-all"
          >
            Login to Proceed
          </Link>
          <p className="text-sm text-slate-500 mt-3">
            You must be logged in to check out.
          </p>
        </div>
      )}
    </div>
   
    
    <div className="p-6 border-t border-slate-100 space-y-3">
      <SummaryBenefit icon={<FiTruck />} text="Free shipping on orders over ₹500" />
      <SummaryBenefit icon={<FiShield />} text="Secure 100% payment processing" />
      <SummaryBenefit icon={<FiRotateCcw />} text="Secured Delivery" />
    </div>
  </div>
)};

const SummaryBenefit = ({ icon, text }) => (
  <div className="flex items-center gap-3 text-sm text-slate-600">
    {React.cloneElement(icon, { className: 'w-5 h-5 text-amber-600 flex-shrink-0' })}
    <span>{text}</span>
  </div>
);

export default CartPage;