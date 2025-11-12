import React, { useEffect } from 'react'; // <-- Add useEffect
import { useLocation, useNavigate, Link, Navigate } from 'react-router-dom';
import { FiCheckCircle, FiMail, FiPackage } from 'react-icons/fi';

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // --- START OF NEW LOGIC ---

  // 1. Try to get data from navigation state
  let orderData = location.state?.order;

  // 2. If state is empty (due to refresh), try to get from sessionStorage
  if (!orderData) {
    const savedOrder = sessionStorage.getItem('lastOrderData');
    if (savedOrder) {
      orderData = JSON.parse(savedOrder);
    }
  }

  useEffect(() => {
    // 3. Clean up sessionStorage when the user leaves this page
    return () => {
      sessionStorage.removeItem('lastOrderData');
    };
  }, []); // Empty array means this runs only on mount and unmount

  // 4. If there is STILL no data, NOW we redirect.
  if (!orderData) {
    // This will now only happen if the user tries to visit
    // /order-confirmation directly without a recent purchase.
    return <Navigate to="/" replace />;
  }
  
  // --- END OF NEW LOGIC ---

  // Deconstruct the data for easy use
  const { orderId, amount, paymentMethod, customerInfo } = orderData;
  const customerEmail = customerInfo?.email || 'your email';
  const customerName = customerInfo?.firstName || 'customer';

  // ... the rest of your component's JSX stays exactly the same ...
  // (The part starting with `return ( <div className="w-full bg-slate-50 pt-20"> ... )`)
  
  return (
    <div className="w-full bg-slate-50 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Main Confirmation Card */}
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
          
          {/* 1. Header with Success Icon */}
          <div className="p-8 md:p-12 text-center bg-green-50 border-b border-green-200">
            
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-pulse">
              <FiCheckCircle className="w-12 h-12" />
            </div>
            <h1 className="text-4xl font-bold font-serif text-slate-900 mt-6 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-slate-600">
              Thank you for your purchase, {customerName}!
            </p>
          </div>

          {/* 2. Order Details */}
          <div className="p-8 md:p-12">
            <h2 className="text-xl font-semibold text-slate-800 mb-6 text-center">
              Your Order Details
            </h2>
            {/* Details Box */}
            <div className="space-y-4 border border-slate-200 rounded-lg p-6">
              <InfoRow label="Order ID:" value={orderId} />
              <InfoRow label="Total Amount:" value={`₹${amount.toFixed(2)}`} />
              <InfoRow label="Payment Method:" value={paymentMethod} />
            </div>

            {/* Next Steps */}
            <div className="mt-8 space-y-4">
              <MessageItem 
                icon={<FiMail />} 
                text={`A confirmation email has been sent to ${customerEmail}.`} 
              />
              <MessageItem 
                icon={<FiPackage />} 
                text="Your order will be processed and shipped soon."
              />
            </div>
          </div>

          {/* 3. Action Buttons */}
          <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row gap-4">
            <Link 
              to="/products"
              className="w-full text-center px-6 py-3 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all"
            >
              Continue Shopping
            </Link>
            <Link 
              to="/account/orders"
              className="w-full text-center px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 transition-all"
            >
              View My Orders
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium text-slate-500">{label}</span>
    <span className="text-base font-semibold text-slate-800 text-right">{value}</span>
  </div>
);

const MessageItem = ({ icon, text }) => (
  <div className="flex items-center gap-3 p-4 bg-blue-50 text-blue-800 rounded-lg">
    <div className="flex-shrink-0 text-blue-600">
      {React.cloneElement(icon, { className: 'w-5 h-5' })}
    </div>
    <span className="text-sm font-medium">{text}</span>
  </div>
);

export default OrderConfirmation;