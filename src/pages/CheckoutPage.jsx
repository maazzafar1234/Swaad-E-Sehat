import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiCreditCard, 
  FiLock,
  FiArrowLeft,
  FiTruck,
  FiRefreshCw,
  FiCheckCircle 
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import ClientApiInstance from '../api/axiosIntercepter'; 

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'online'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});

  const [savedAddresses, setSavedAddresses] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [selectedAddressKey, setSelectedAddressKey] = useState('new'); // 'new' or array index

  const calculateSubtotal = () => items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.18;
  const shippingCost = subtotal > 500 ? 0 : 150;
  const total = subtotal + shippingCost;

  useEffect(() => {
    if (items.length === 0 && !isProcessing && !isPolling) {
      toast.error("Your cart is empty. Redirecting...");
      navigate('/cart');
    }
  }, [items, navigate, isProcessing]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ClientApiInstance.get("/stats/api/dashboard");
        if (response.data.success) {
          const { user, addresses } = response.data.data;

          const nameParts = user.name.split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || '';

          setFormData(prev => ({
            ...prev,
            firstName: firstName,
            lastName: lastName,
            email: user.email,
            phone: user.mobile
          }));
          
          setSavedAddresses(addresses || []);
        } else {
          toast.error("Could not load your data. Please enter it manually.");
        }
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        toast.warn("Could not load your saved data. Please enter it manually.");
      } finally {
        setIsLoadingData(false);
      }
    };
    
    fetchUserData();
  }, []); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddressChange = (e) => {
    const key = e.target.value;
    setSelectedAddressKey(key);

    if (key === 'new') {
      setFormData(prev => ({
        ...prev,
        address: '',
        city: '',
        state: '',
        pincode: ''
      }));
    } else {
      const addressIndex = parseInt(key);
      const selectedAddr = savedAddresses[addressIndex];
      if (selectedAddr) {
        setFormData(prev => ({
          ...prev,
          address: selectedAddr.address,
          city: selectedAddr.city,
          state: selectedAddr.state,
          pincode: selectedAddr.pincode
        }));
        setErrors(prev => ({
          ...prev,
          address: '',
          city: '',
          state: '',
          pincode: ''
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone must be 10 digits';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be 6 digits';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const getUserIdFromToken = () => {
    try {
      const userJSON = localStorage.getItem('authToken'); 
      if (!userJSON) throw new Error('No user data found');
      const user = JSON.parse(userJSON);
      if (!user.id) throw new Error('User ID not found');
      return user.id;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const sendOrderConfirmation = (orderData) => {
    try {
      console.log('Simulating order confirmation:', orderData);
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));
    } catch (error) {
      console.error('Error saving order confirmation:', error);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error('Please fill in all required fields correctly.');
      return;
    }
    setIsProcessing(true);

    const userId = localStorage.getItem('authToken');
    if (!userId) {
      toast.error('You must be logged in to place an order.');
      setIsProcessing(false);
      navigate('/account'); 
      return;
    }

    const orderPayload = {
      user_id: userId,
      amount: total,
      customerInfo: formData, 
      items: items,
      paymentMethod: formData.paymentMethod === 'cod' ? 'COD' : 'Online'
    };

    try {
      const response = await ClientApiInstance.post("/checkout/api/orders/create", orderPayload);
      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || 'Order creation failed');
      }

      const orderData = {
        orderId: data.orderId,
        amount: total,
        paymentMethod: formData.paymentMethod,
        customerInfo: formData,
        items: items,
        timestamp: new Date().toISOString()
      };
      sessionStorage.setItem('lastOrderData', JSON.stringify(orderData));

      if (formData.paymentMethod === 'cod') {
        sendOrderConfirmation(orderData); 
        clearCart();
        toast.success("Order placed successfully!");
        navigate('/order-confirmation', { state: { order: orderData } });
      } else {
        if (data.paymentUrl && data.orderId) {
          window.open(data.paymentUrl, '_blank', 'noopener,noreferrer');
          setPollingOrderId(data.orderId);
          setIsPolling(true); 
          setIsProcessing(false);
        } else {
          throw new Error('Payment URL or OrderID not received from server.');
        }
      }
    } catch (error) {
      console.error('Order processing error:', error);
      toast.error(error.message || "An error occurred while processing your order.");
      setIsProcessing(false);
    }
  };

  const [isPolling, setIsPolling] = useState(false);
  const [pollingOrderId, setPollingOrderId] = useState(null);

  useEffect(() => {
    if (!isPolling || !pollingOrderId) return;
    let pollCount = 0;
    const maxPolls = 40;
    let intervalId;

    const pollStatus = async () => {
      pollCount++;
      if (pollCount > maxPolls) {
        clearInterval(intervalId);
        setIsPolling(false);
        toast.warn('Payment check timed out. Please check "My Orders" later.');
        setPollingOrderId(null);
        return;
      }
      try {
        const response = await ClientApiInstance.get(`/status/verify-order/${pollingOrderId}`);
        const status = response.data.status;
        if (status === 'paid') {
          clearInterval(intervalId);
          setIsPolling(false);
          toast.success('Payment successful! Order confirmed.');
          clearCart();
          const savedOrder = JSON.parse(sessionStorage.getItem('lastOrderData'));
          navigate('/order-confirmation', { state: { order: savedOrder } });
        } else if (status === 'failed') {
          clearInterval(intervalId);
          setIsPolling(false);
          toast.error('Payment failed. Please try again.');
          setPollingOrderId(null);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };
    intervalId = setInterval(pollStatus, 3000);
    return () => clearInterval(intervalId);
  }, [isPolling, pollingOrderId, navigate, clearCart]);


  let paymentButtonContent = null;
  if (isProcessing) {
    paymentButtonContent = (
      <>
        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Processing...</span>
      </>
    );
  } else if (formData.paymentMethod === 'online') {
    paymentButtonContent = (
      <>
        <FiLock className="w-5 h-5" />
        <span>{`Proceed to Pay ₹${total.toFixed(2)}`}</span>
      </>
    );
  } else {
    paymentButtonContent = (
      <>
        <FiLock className="w-5 h-5" />
        <span>{`Place Order (COD) - ₹${total.toFixed(2)}`}</span>
      </>
    );
  }

  return (
    <div className="w-full bg-slate-50 pt-20">
      
      {isPolling && (
        <PaymentWaitingModal 
          orderId={pollingOrderId} 
          onClose={() => setIsPolling(false)} 
        />
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-8">
          <h1 className="text-4xl font-bold font-serif text-slate-900">Checkout</h1>
          <Link 
            to="/cart" 
            className="flex items-center gap-2 font-semibold text-amber-600 hover:text-amber-700 transition-colors"
          >
            <FiArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </Link>
        </div>
        
        <form id="checkout-form" onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
          
          <div className="lg:col-span-2 space-y-8">
            
            <FormSection title="Personal Information" icon={<FiUser />}>
              {isLoadingData && (
                <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg text-slate-500">
                  <FiRefreshCw className="animate-spin w-4 h-4" />
                  <span>Loading your info...</span>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormGroup>
                  <label htmlFor="firstName" className="form-label">First Name *</label>
                  <input type="text" id="firstName" name="firstName"
                    value={formData.firstName} onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={`form-input ${errors.firstName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'}`}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="lastName" className="form-label">Last Name *</label>
                  <input type="text" id="lastName" name="lastName"
                    value={formData.lastName} onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className={`form-input ${errors.lastName ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'}`}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                </FormGroup>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormGroup>
                  <label htmlFor="email" className="form-label">Email *</label>
                  <input type="email" id="email" name="email"
                    value={formData.email} onChange={handleInputChange}
                    placeholder="Enter your email"
                    className={`form-input ${errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'}`}
                  />
                  {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="phone" className="form-label">Phone *</label>
                  <input type="tel" id="phone" name="phone"
                    value={formData.phone} onChange={handleInputChange}
                    placeholder="Enter 10-digit number"
                    className={`form-input ${errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'}`}
                  />
                  {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                </FormGroup>
              </div>
            </FormSection>

            <FormSection title="Shipping Address" icon={<FiMapPin />}>
              <FormGroup>
                <label htmlFor="savedAddress" className="form-label">Saved Addresses</label>
                {isLoadingData ? (
                  <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg text-slate-500">
                    <FiRefreshCw className="animate-spin w-4 h-4" />
                    <span>Loading saved addresses...</span>
                  </div>
                ) : (
                  <select 
                    id="savedAddress" 
                    name="savedAddress"
                    value={selectedAddressKey}
                    onChange={handleAddressChange}
                    className="form-input bg-white"
                  >
                    <option value="new">-- Enter a new address --</option>
                    {savedAddresses.map((addr, index) => (
                      <option key={index} value={index}>
                        {`${addr.address}, ${addr.city}, ${addr.state} ${addr.pincode}`}
                      </option>
                    ))}
                  </select>
                )}
              </FormGroup>

              <FormGroup>
                <label htmlFor="address" className="form-label">Address *</label>
                <textarea id="address" name="address" rows="3"
                  value={formData.address} onChange={handleInputChange}
                  placeholder="Enter your complete address"
                  readOnly={selectedAddressKey !== 'new'}
                  className={`form-input ${errors.address ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} ${selectedAddressKey !== 'new' ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                />
                {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
              </FormGroup>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <FormGroup>
                  <label htmlFor="city" className="form-label">City *</label>
                  <input type="text" id="city" name="city"
                    value={formData.city} onChange={handleInputChange}
                    placeholder="Enter your city"
                    readOnly={selectedAddressKey !== 'new'}
                    className={`form-input ${errors.city ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} ${selectedAddressKey !== 'new' ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="state" className="form-label">State *</label>
                  <input type="text" id="state" name="state"
                    value={formData.state} onChange={handleInputChange}
                    placeholder="Enter your state"
                    readOnly={selectedAddressKey !== 'new'}
                    className={`form-input ${errors.state ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} ${selectedAddressKey !== 'new' ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                </FormGroup>
                <FormGroup>
                  <label htmlFor="pincode" className="form-label">Pincode *</label>
                  <input type="text" id="pincode" name="pincode"
                    value={formData.pincode} onChange={handleInputChange}
                    placeholder="Enter 6-digit pincode"
                    readOnly={selectedAddressKey !== 'new'}
                    className={`form-input ${errors.pincode ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} ${selectedAddressKey !== 'new' ? 'bg-slate-100 cursor-not-allowed' : ''}`}
                  />
                  {errors.pincode && <p className="text-red-600 text-sm mt-1">{errors.pincode}</p>}
                </FormGroup>
              </div>
            </FormSection>
            
            <FormSection title="Payment Method" icon={<FiCreditCard />}>
              <div className="space-y-4">
                <PaymentOption
                  title="Online Payment"
                  description="Pay with Card, UPI, Wallets, etc."
                  icon={<FiCreditCard className="w-6 h-6 text-blue-600" />}
                  value="online"
                  currentValue={formData.paymentMethod}
                  onChange={handleInputChange}
                />
                <PaymentOption
                  title="Cash on Delivery (COD)"
                  description="Pay with cash when your order arrives."
                  icon={<FiTruck className="w-6 h-6 text-green-600" />}
                  value="cod"
                  currentValue={formData.paymentMethod}
                  onChange={handleInputChange}
                />
              </div>
            </FormSection>
          </div>

          <div className="lg:col-span-1">
            <OrderSummary 
              items={items} 
              subtotal={subtotal} 
              tax={tax} 
              shippingCost={shippingCost}
              total={total}
              isProcessing={isProcessing}
              paymentButtonContent={paymentButtonContent}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

// --- Helper Components ---
// (All helper components remain the same)

const FormSection = ({ title, icon, children }) => (
  <div className="bg-white rounded-lg shadow-md">
    <h3 className="flex items-center gap-3 text-xl font-semibold text-slate-800 p-6 border-b border-slate-200">
      {React.cloneElement(icon, { className: "w-6 h-6 text-amber-600" })}
      <span>{title}</span>
    </h3>
    <div className="p-6 space-y-6">
      {children}
    </div>
  </div>
);

const FormGroup = ({ children }) => (
  <div className="w-full">
    {children}
  </div>
);

const PaymentOption = ({ title, description, icon, value, currentValue, onChange }) => {
  const isChecked = currentValue === value;
  return (
    <label 
      htmlFor={value} 
      className={`border rounded-lg p-5 flex items-center gap-5 cursor-pointer transition-all ${
        isChecked 
          ? 'border-amber-500 ring-2 ring-amber-500 bg-amber-50' 
          : 'border-slate-300 hover:border-slate-400'
      }`}
    >
      <input
        type="radio"
        id={value}
        name="paymentMethod"
        value={value}
        checked={isChecked}
        onChange={onChange}
        className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-slate-300"
      />
      <div className="flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-base font-semibold text-slate-800">{title}</h4>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </label>
  );
};

const OrderSummary = ({ items, subtotal, tax, shippingCost, total, isProcessing, paymentButtonContent }) => (
  <div className="bg-white rounded-xl shadow-md sticky top-28">
    <h3 className="text-2xl font-semibold p-6 border-b border-slate-200">
      Order Summary
    </h3>
    
    {/* Shipping Progress Message */}
    <div className="p-6">
      <ShippingProgress subtotal={subtotal} />
    </div>
    
    <div className="p-6 space-y-4 max-h-64 overflow-y-auto border-b border-slate-200">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
          <div className="flex-1">
            <h4 className="font-medium text-slate-800 line-clamp-1">{item.name}</h4>
            <p className="text-sm text-slate-500">Qty: {item.quantity}</p>
          </div>
          <span className="font-semibold text-slate-800">₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
    
    <div className="p-6 space-y-3">
      <div className="flex justify-between items-center text-slate-600">
        <span>Subtotal</span>
        <span className="font-medium text-slate-800">₹{subtotal.toFixed(2)}</span>
      </div>
      {/* <div className="flex justify-between items-center text-slate-600">
        <span>GST (18%)</span>
        <span className="font-medium text-slate-800">₹{tax.toFixed(2)}</span>
      </div> */}
      <div className="flex justify-between items-center text-slate-600">
        <span>Shipping</span>
        {shippingCost === 0 ? (
          <span className="font-medium text-green-600">FREE</span>
        ) : (
          <span className="font-medium text-slate-800">₹{shippingCost.toFixed(2)}</span>
        )}
      </div>
      <div className="border-t border-slate-200 my-3"></div>
      <div className="flex justify-between items-center text-xl font-bold text-slate-900">
        <span>Total</span>
        <span>₹{total.toFixed(2)}</span>
      </div>
    </div>
    
    <div className="p-6 border-t border-slate-100">
      <button
        type="submit"
        form="checkout-form"
        className="w-full flex items-center justify-center gap-3 px-6 py-3.5 font-semibold text-white bg-amber-500 rounded-lg shadow-md hover:bg-amber-600 transition-all disabled:opacity-75 disabled:cursor-not-allowed"
        disabled={isProcessing}
      >
        {paymentButtonContent}
      </button>
      <p className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
        <FiLock /> Your information is secure and encrypted.
      </p>
    </div>
  </div>
);

const PaymentWaitingModal = ({ orderId, onClose }) => (
  <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-[999]">
    <div className="bg-white rounded-lg shadow-xl p-8 max-w-md text-center mx-4">
      <FiLoader className="w-16 h-16 text-amber-500 mx-auto animate-spin mb-6" />
      <h2 className="text-2xl font-bold font-serif text-slate-800 mb-4">
        Waiting for Payment...
      </h2>
      <p className="text-slate-600 mb-6">
        A payment window has been opened. Please complete your payment in the new tab to confirm the order.
      </p>
      <p className="text-sm text-slate-500 mb-6">
        We are checking the status for Order ID: <br/>
        <span className="font-medium text-slate-700 text-xs">{orderId}</span>
      </p>
      <button
        onClick={onClose}
        className="text-sm font-medium text-slate-600 hover:text-red-600"
      >
        Cancel and Try Again
      </button>
    </div>
  </div>
);

const ShippingProgress = ({ subtotal }) => {
  const shippingThreshold = 500;
  const amountLeft = shippingThreshold - subtotal;
  const percent = Math.max(0, Math.min((subtotal / shippingThreshold) * 100, 100));

  if (amountLeft <= 0) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
        <FiCheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
        <p className="text-sm font-medium text-green-700">
          Congratulations! You've unlocked FREE shipping.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
      <div className="flex items-center gap-3">
        <FiTruck className="w-6 h-6 text-amber-600 flex-shrink-0" />
        <p className="text-sm font-medium text-amber-700">
          Add items worth <span className="font-bold">₹{amountLeft.toFixed(2)}</span> more to get FREE shipping.
        </p>
      </div>
      <div className="w-full bg-slate-200 rounded-full h-2.5 mt-3">
        <div 
          className="bg-amber-500 h-2.5 rounded-full" 
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CheckoutPage;
