import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPackage, 
  FiUser, 
  FiX, 
  FiEdit2, 
  FiTrash2, 
  FiPlus, 
  FiMapPin, 
  FiPhone, 
  FiMail, 
  FiCalendar,
  FiLogOut, 
  FiCreditCard 
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import ClientApiInstance from '../api/axiosIntercepter';

// --- Main Dashboard Component ---
const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const navigate = useNavigate();

  // --- Data Fetching ---
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Use your API endpoint
        const response = await ClientApiInstance.get("/stats/api/dashboard");
        
        if (response.data && response.data.success) {
          const data = response.data.data;
          setUser(data.user);
          setOrders(data.orders);
          setAddresses(data.addresses || []);
        } else {
          toast.error(response.data.message || "Failed to fetch dashboard data.");
        }
      } catch (err) {
        console.error("Dashboard API Error:", err);
        toast.error("An error occurred while fetching your data.");
        // If auth fails, redirect to login
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          navigate('/account');
        } //redict to login
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  // --- Event Handlers ---
  const openModal = (modalType, data = null) => {
    setActiveModal(modalType);
    if (modalType === 'orderDetail') setSelectedOrder(data);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedOrder(null);
    setEditingProfile(false);
  };

  const handleLogout = () => {
    // ⚠️ Ensure these are your correct localStorage keys
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.success("You have been logged out.");
    navigate('/login'); // Redirect to login page
  };

  // Profile
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };
    
    // TODO: Add an API call here to update the user in the backend
    // e.g., ClientApiInstance.put("/api/profile/update", updatedUser)
    
    setUser(updatedUser);
    toast.success("Profile updated!");
    setEditingProfile(false);
  };

  // Addresses
  const handleAddAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
      id: `addr${addresses.length + 1}`, // Temporary ID
      type: formData.get('type'),
      address: formData.get('addressLine1'), // Match your API response
      addressLine1: formData.get('addressLine1'),
      addressLine2: formData.get('addressLine2'),
      city: formData.get('city'),
      state: formData.get('state'),
      pincode: formData.get('zip'), // Match your API response
      isDefault: addresses.length === 0,
    };

    // TODO: Add API call to save new address
    
    setAddresses([...addresses, newAddress]);
    closeModal();
  };

  const handleDeleteAddress = (id) => {
    // TODO: Add API call to delete address
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    // TODO: Add API call to set default address
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };
  
  // --- Helper Functions ---
  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-700',
      'Processing': 'bg-blue-100 text-blue-700',
      'Shipped': 'bg-purple-100 text-purple-700',
      'Cancelled': 'bg-red-100 text-red-700',
      'paid': 'bg-green-100 text-green-700',
      'pending': 'bg-amber-100 text-amber-700',
      'failed': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  // --- Loading State ---
  if (isLoading) {
    return <DashboardLoadingSkeleton />;
  }

  const recentOrder = orders?.[0]; // Get the first order

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8 pt-24">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start justify-between">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h2>
              <p className="text-slate-600 mt-2">
                Manage your orders, profile, and addresses all in one place.
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 flex-shrink-0 flex items-center gap-2 px-5 py-2.5 font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-all"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickLink 
            onClick={() => openModal('orders')} 
            icon={<FiPackage />} 
            title="My Orders" 
            subtitle={`${orders?.length || 0} total orders`}
          />
          <QuickLink 
            onClick={() => openModal('profile')} 
            icon={<FiUser />} 
            title="My Profile" 
            subtitle="View & edit details"
          />
          <QuickLink 
            onClick={() => openModal('addresses')} 
            icon={<FiMapPin />} 
            title="My Addresses" 
            subtitle={`${addresses?.length || 0} saved addresses`}
          />
        </div>

        {/* Recent Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6">Recent Order</h3>
          {recentOrder ? (
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-4 bg-amber-50 rounded-xl">
              <div>
                <p className="font-bold text-lg text-slate-800">{recentOrder.id}</p>
                <p className="text-slate-600">{new Date(recentOrder.created_at).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-amber-600 mt-1">₹{recentOrder.total_amount}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(recentOrder.order_status)}`}>
                  {recentOrder.order_status}
                </span>
                <button 
                  onClick={() => openModal('orderDetail', recentOrder)}
                  className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500">No recent orders found.</p>
          )}
        </div>

        {/* Addresses Preview */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-slate-800">Saved Addresses</h3>
            <button 
              onClick={() => openModal('addresses')}
              className="text-amber-600 font-semibold hover:text-amber-700"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses?.length > 0 ? addresses.slice(0, 2).map((addr, index) => (
              <div key={index} className="p-4 border-2 border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-800">{addr.type || 'Address'}</span>
                  {addr.isDefault && (
                    <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">Default</span>
                  )}
                </div>
                <p className="text-sm text-slate-600">
                  {addr.address}, {addr.city}, {addr.state} {addr.pincode}
                </p>
              </div>
            )) : (
              <p className="text-slate-500 md:col-span-2">No saved addresses found.</p>
            )}
          </div>
        </div>
      </div>

      {/* --- Modals --- */}
      {activeModal === 'orders' && <OrdersModal orders={orders} onClose={closeModal} onViewOrder={(order) => openModal('orderDetail', order)} getStatusColor={getStatusColor} />}
      {activeModal === 'orderDetail' && selectedOrder && <OrderDetailModal order={selectedOrder} onClose={closeModal} getStatusColor={getStatusColor} />}
      {activeModal === 'profile' && user && <ProfileModal user={user} onClose={closeModal} editing={editingProfile} setEditing={setEditingProfile} onSubmit={handleProfileUpdate} />}
      
      {/* Address Modals (Unchanged) */}
      {activeModal === 'addresses' && (
        <AddressesModal 
          addresses={addresses} 
          onClose={closeModal}
          onDelete={handleDeleteAddress}
          onSetDefault={handleSetDefaultAddress}
          onAdd={() => openModal('addAddress')}
        />
      )}
      {activeModal === 'addAddress' && <AddAddressModal onClose={closeModal} onSubmit={handleAddAddress} />}
    </div>
  );
};

// --- Loading Skeleton Component ---
const DashboardLoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-4 md:p-8 pt-24 animate-pulse">
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="h-10 bg-slate-200 rounded-lg w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
      </div>
      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg h-32"></div>
        <div className="bg-white p-6 rounded-2xl shadow-lg h-32"></div>
        <div className="bg-white p-6 rounded-2xl shadow-lg h-32"></div>
      </div>
      {/* Recent Order */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="h-8 bg-slate-200 rounded-lg w-1/4 mb-6"></div>
        <div className="h-24 bg-slate-100 rounded-xl"></div>
      </div>
      {/* Addresses */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
        <div className="h-8 bg-slate-200 rounded-lg w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-16 bg-slate-100 rounded-lg"></div>
          <div className="h-16 bg-slate-100 rounded-lg"></div>
        </div>
      </div>
    </div>
  </div>
);


// --- Helper Components (Copied from your file) ---

const QuickLink = ({ onClick, icon, title, subtitle }) => (
  <button 
    onClick={onClick}
    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-left group"
  >
    <div className="flex items-center gap-4">
      <div className="p-4 bg-amber-100 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
        {React.cloneElement(icon, { className: 'w-7 h-7' })}
      </div>
      <div>
        <h4 className="text-xl font-bold text-slate-800 group-hover:text-amber-600 transition-colors">
          {title}
        </h4>
        <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
      </div>
    </div>
  </button>
);

const Modal = ({ onClose, title, children, size = 'max-w-4xl' }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={onClose}>
    <div className={`bg-white rounded-2xl shadow-2xl ${size} w-full max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
          <FiX className="w-6 h-6" />
        </button>
      </div>
      <div className="p-6 overflow-y-auto">
        {children}
      </div>
    </div>
  </div>
);

const OrdersModal = ({ orders, onClose, onViewOrder, getStatusColor }) => (
  <Modal onClose={onClose} title="My Orders">
    <div className="space-y-4">
      {orders.length > 0 ? orders.map(order => (
        <div key={order.id} className="border-2 border-slate-200 rounded-xl p-6 hover:border-amber-300 transition-colors">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <p className="font-bold text-lg text-slate-800">{order.id}</p>
              <p className="text-slate-600">{new Date(order.created_at).toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-amber-600 mt-1">₹{order.total_amount}</p>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
                {order.order_status}
              </span>
              <button 
                onClick={() => onViewOrder(order)}
                className="px-6 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )) : (
        <p className="text-slate-500 text-center py-8">You have not placed any orders yet.</p>
      )}
    </div>
  </Modal>
);

// OrderDetailModal (Removed payment section)
const OrderDetailModal = ({ order, onClose, getStatusColor }) => (
  <Modal onClose={onClose} title={`Order ${order.id}`}>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl">
        <div>
          <p className="text-sm text-slate-600">Order Date</p>
          <p className="font-semibold text-slate-800">{new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
          {order.order_status}
        </span>
      </div>

      {/* Note: This section would require another API call to fetch items for an order */}
      <div>
        <h4 className="font-bold text-lg text-slate-800 mb-3">Order Items</h4>
        <div className="p-4 border border-slate-200 rounded-lg text-slate-500">
          {/* (To show item details, you'll need to fetch from `order_items` where `order_id` = {order.id}) */}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold">₹{order.subtotal || order.total_amount}</span>
          </div>
          {/* Add tax/shipping if they are in your 'orders' table */}
          <div className="flex justify-between pt-2 border-t border-slate-200">
            <span className="text-lg font-bold text-slate-800">Total</span>
            <span className="text-lg font-bold text-amber-600">₹{order.total_amount}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <h5 className="font-semibold text-slate-800 mb-2">Shipping Address</h5>
          <p className="text-sm text-slate-600">
            {order.cust_first_name} {order.cust_last_name}<br />
            {order.address}<br />
            {order.city}, {order.state} {order.pincode}
          </p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg">
          <h5 className="font-semibold text-slate-800 mb-2">Payment Method</h5>
          <p className="text-sm text-slate-600">
            {order.payment_method}
            <br />
            Status: <span className="font-semibold">{order.payment_status}</span>
          </p>
        </div>
      </div>
    </div>
  </Modal>
);

// Profile Modal (Updated to use 'mobile' and 'created_at')
const ProfileModal = ({ user, onClose, editing, setEditing, onSubmit }) => (
  <Modal onClose={onClose} title="My Profile" size="max-w-2xl">
    {!editing ? (
      <div className="space-y-6">
        <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-xl">
          <div className="w-20 h-20 bg-amber-600 text-white rounded-full flex items-center justify-center text-3xl font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h4 className="text-2xl font-bold text-slate-800">{user.name}</h4>
            <p className="text-slate-600">Member since {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
            <FiMail className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-semibold text-slate-800">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
            <FiPhone className="w-5 h-5 text-amber-600" />
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-semibold text-slate-800">{user.mobile}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setEditing(true)}
          className="w-full py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
        >
          <FiEdit2 /> Edit Profile
        </button>
      </div>
    ) : (
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            defaultValue={user.name}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            defaultValue={user.email}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
          <input 
            type="tel" 
            name="phone" 
            defaultValue={user.mobile}
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
            required
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button 
            type="submit"
            className="flex-1 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
          >
            Save Changes
          </button>
          <button 
            type="button"
            onClick={() => setEditing(false)}
            className="flex-1 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    )}
  </Modal>
);

// --- All Address Modals (Unchanged) ---
const AddressesModal = ({ addresses, onClose, onDelete, onSetDefault, onAdd }) => (
  <Modal onClose={onClose} title="Saved Addresses">
    <div className="space-y-4">
      {addresses.map((addr, index) => (
        <div key={index} className="border-2 border-slate-200 rounded-xl p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <FiMapPin className="w-6 h-6 text-amber-600 mt-1" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-800">{addr.type || 'Address'}</p>
                  {addr.isDefault && (
                    <span className="px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600">
                  {addr.address}<br />
                  {addr.addressLine2}<br />
                  {addr.city}, {addr.state} {addr.pincode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!addr.isDefault && (
                <button 
                  onClick={() => onSetDefault(addr.id)}
                  className="px-3 py-1 text-sm text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  Set Default
                </button>
              )}
              <button 
                onClick={() => onDelete(addr.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={onAdd}
        className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-amber-500 hover:text-amber-600 transition-colors flex items-center justify-center gap-2 font-semibold"
      >
        <FiPlus className="w-5 h-5" /> Add New Address
      </button>
    </div>
  </Modal>
);

const AddAddressModal = ({ onClose, onSubmit }) => (
  <Modal onClose={onClose} title="Add New Address" size="max-w-2xl">
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address Type</label>
        <select 
          name="type"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
        >
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Other">Other</option>
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address Line 1</label>
        <input 
          type="text" 
          name="addressLine1"
          placeholder="House/Building No., Street"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address Line 2</label>
        <input 
          type="text" 
          name="addressLine2"
          placeholder="Area, Landmark"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
          <input 
            type="text" 
            name="city"
            placeholder="Phagwara"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
          <input 
            type="text" 
            name="state"
            placeholder="Punjab"
            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">ZIP Code</label>
        <input 
          type="text" 
          name="zip"
          placeholder="144411"
          maxLength="6"
          className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          type="submit"
          className="flex-1 py-3 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
        >
          Save Address
        </button>
        <button 
          type="button"
          onClick={onClose}
          className="flex-1 py-3 bg-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-300 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  </Modal>
);

export default UserDashboard;