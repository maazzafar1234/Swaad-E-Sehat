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
  FiLogOut,
  FiShield
} from 'react-icons/fi';
import { toast } from 'react-toastify';
import ClientApiInstance from '../api/axiosIntercepter';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [activeModal, setActiveModal] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingProfile, setEditingProfile] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
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
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          localStorage.removeItem('authToken');
          navigate('/account');
        }
      } finally {
        setIsLoading(false);
      }
    };

    const checkAdminRole = () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const userData = localStorage.getItem('user');
        
        if (authToken && userData) {
          const parsedUser = JSON.parse(userData);
          if (parsedUser.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (err) {
        console.error("Error checking admin role:", err);
      }
    };

    fetchDashboardData();
    checkAdminRole();
  }, [navigate]);

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
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    toast.success("You have been logged out.");
    navigate('/account'); 
  };

  const handleAdminAccess = () => {
    navigate('/admin');
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedUser = {
      ...user,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };
    
    setUser(updatedUser);
    toast.success("Profile updated!");
    setEditingProfile(false);
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newAddress = {
      id: `addr${addresses.length + 1}`, 
      type: formData.get('type'),
      address: formData.get('addressLine1'),
      addressLine1: formData.get('addressLine1'),
      addressLine2: formData.get('addressLine2'),
      city: formData.get('city'),
      state: formData.get('state'),
      pincode: formData.get('zip'),
      isDefault: addresses.length === 0,
    };

    setAddresses([...addresses, newAddress]);
    closeModal();
  };

  const handleDeleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefaultAddress = (id) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };
  
  const getStatusColor = (status) => {
    const colors = {
      'Delivered': 'bg-green-100 text-green-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800',
      'paid': 'bg-green-100 text-green-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'failed': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (isLoading) {
    return <DashboardLoadingSkeleton />;
  }

  const recentOrder = orders?.[0]; 

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Welcome, {user?.name?.split(' ')[0]}
              </h1>
              <p className="text-slate-600 mt-2">
                Manage your profile, orders, and addresses
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {isAdmin && (
                <button
                  onClick={handleAdminAccess}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <FiShield className="w-5 h-5" />
                  <span>Admin Panel</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 px-5 py-2.5 font-semibold text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
              >
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <QuickLink 
            onClick={() => openModal('orders')} 
            icon={<FiPackage />} 
            title="Orders" 
            subtitle={`${orders?.length || 0} orders`}
          />
          <QuickLink 
            onClick={() => openModal('profile')} 
            icon={<FiUser />} 
            title="Profile" 
            subtitle="View & edit"
          />
          <QuickLink 
            onClick={() => openModal('addresses')} 
            icon={<FiMapPin />} 
            title="Addresses" 
            subtitle={`${addresses?.length || 0} saved`}
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Recent Order</h2>
          {recentOrder ? (
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 p-5 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <p className="font-semibold text-slate-900">{recentOrder.id}</p>
                <p className="text-sm text-slate-600 mt-1">{new Date(recentOrder.created_at).toLocaleDateString()}</p>
                <p className="text-lg font-semibold text-slate-900 mt-2">₹{recentOrder.total_amount}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(recentOrder.order_status)}`}>
                  {recentOrder.order_status}
                </span>
                <button 
                  onClick={() => openModal('orderDetail', recentOrder)}
                  className="px-5 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors text-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 text-center py-8">No recent orders</p>
          )}
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Addresses</h2>
            <button 
              onClick={() => openModal('addresses')}
              className="text-slate-600 font-semibold hover:text-slate-900 text-sm"
            >
              View All →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses?.length > 0 ? addresses.slice(0, 2).map((addr, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-slate-900">{addr.type || 'Address'}</span>
                  {addr.isDefault && (
                    <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">Default</span>
                  )}
                </div>
                <p className="text-sm text-slate-600">
                  {addr.address}, {addr.city}, {addr.state} {addr.pincode}
                </p>
              </div>
            )) : (
              <p className="text-slate-500 md:col-span-2 text-sm">No addresses yet</p>
            )}
          </div>
        </div>
      </div>

      {activeModal === 'orders' && <OrdersModal orders={orders} onClose={closeModal} onViewOrder={(order) => openModal('orderDetail', order)} getStatusColor={getStatusColor} />}
      {activeModal === 'orderDetail' && selectedOrder && <OrderDetailModal order={selectedOrder} onClose={closeModal} getStatusColor={getStatusColor} />}
      {activeModal === 'profile' && user && <ProfileModal user={user} onClose={closeModal} editing={editingProfile} setEditing={setEditingProfile} onSubmit={handleProfileUpdate} />}
      
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

const DashboardLoadingSkeleton = () => (
  <div className="min-h-screen bg-slate-50 p-4 md:p-8 pt-24 animate-pulse">
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="h-10 bg-slate-200 rounded-lg w-3/4 mb-4"></div>
        <div className="h-4 bg-slate-200 rounded-lg w-1/2"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
        <div className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
        <div className="bg-white p-6 rounded-xl shadow-sm h-32"></div>
      </div>
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
        <div className="h-8 bg-slate-200 rounded-lg w-1/4 mb-6"></div>
        <div className="h-24 bg-slate-100 rounded-lg"></div>
      </div>
    </div>
  </div>
);

const QuickLink = ({ onClick, icon, title, subtitle }) => (
  <button 
    onClick={onClick}
    className="bg-white border border-slate-200 p-6 rounded-xl hover:shadow-md hover:border-slate-300 transition-all text-left group"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 bg-slate-100 text-slate-700 rounded-lg group-hover:bg-slate-200 transition-colors">
        {React.cloneElement(icon, { className: 'w-6 h-6' })}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-slate-900">
          {title}
        </h3>
        <p className="text-sm text-slate-600 mt-1">{subtitle}</p>
      </div>
    </div>
  </button>
);

const Modal = ({ onClose, title, children, size = 'max-w-4xl' }) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50" onClick={onClose}>
    <div className={`bg-white rounded-xl shadow-lg ${size} w-full max-h-[90vh] flex flex-col`} onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
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
    <div className="space-y-3">
      {orders.length > 0 ? orders.map(order => (
        <div key={order.id} className="border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-sm transition-all">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <p className="font-semibold text-slate-900">{order.id}</p>
              <p className="text-sm text-slate-600 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-slate-900 mt-2">₹{order.total_amount}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
                {order.order_status}
              </span>
              <button 
                onClick={() => onViewOrder(order)}
                className="px-5 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors text-sm"
              >
                Details
              </button>
            </div>
          </div>
        </div>
      )) : (
        <p className="text-slate-500 text-center py-8">No orders yet</p>
      )}
    </div>
  </Modal>
);

const OrderDetailModal = ({ order, onClose, getStatusColor }) => (
  <Modal onClose={onClose} title={`Order ${order.id}`}>
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div>
          <p className="text-xs text-slate-600">Order Date</p>
          <p className="font-semibold text-slate-900 mt-1">{new Date(order.created_at).toLocaleDateString()}</p>
        </div>
        <span className={`px-4 py-2 text-sm font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
          {order.order_status}
        </span>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600">Subtotal</span>
            <span className="font-semibold text-slate-900">₹{order.subtotal || order.total_amount}</span>
          </div>
          <div className="flex justify-between pt-3 border-t border-slate-200">
            <span className="font-semibold text-slate-900">Total</span>
            <span className="text-lg font-bold text-slate-900">₹{order.total_amount}</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3 text-sm">Shipping Address</h4>
          <p className="text-sm text-slate-600 leading-relaxed">
            {order.cust_first_name} {order.cust_last_name}<br />
            {order.address}<br />
            {order.city}, {order.state} {order.pincode}
          </p>
        </div>
        <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h4 className="font-semibold text-slate-900 mb-3 text-sm">Payment Method</h4>
          <p className="text-sm text-slate-600">
            {order.payment_method}
            <br className="mt-2" />
            Status: <span className="font-semibold text-slate-900">{order.payment_status}</span>
          </p>
        </div>
      </div>
    </div>
  </Modal>
);

const ProfileModal = ({ user, onClose, editing, setEditing, onSubmit }) => (
  <Modal onClose={onClose} title="My Profile" size="max-w-2xl">
    {!editing ? (
      <div className="space-y-5">
        <div className="flex items-center gap-4 p-5 bg-slate-50 rounded-lg border border-slate-200">
          <div className="w-16 h-16 bg-slate-300 text-white rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0">
            {user.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{user.name}</h3>
            <p className="text-sm text-slate-600 mt-1">Member since {new Date(user.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
            <FiMail className="w-5 h-5 text-slate-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="font-semibold text-slate-900 mt-1">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 border border-slate-200 rounded-lg">
            <FiPhone className="w-5 h-5 text-slate-500 flex-shrink-0" />
            <div>
              <p className="text-xs text-slate-500">Phone</p>
              <p className="font-semibold text-slate-900 mt-1">{user.mobile}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setEditing(true)}
          className="w-full py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
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
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            defaultValue={user.email}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Phone</label>
          <input 
            type="tel" 
            name="phone" 
            defaultValue={user.mobile}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            required
          />
        </div>
        <div className="flex gap-3 pt-4">
          <button 
            type="submit"
            className="flex-1 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
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

const AddressesModal = ({ addresses, onClose, onDelete, onSetDefault, onAdd }) => (
  <Modal onClose={onClose} title="Saved Addresses">
    <div className="space-y-3">
      {addresses.map((addr, index) => (
        <div key={index} className="border border-slate-200 rounded-lg p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 flex-1">
              <FiMapPin className="w-5 h-5 text-slate-500 mt-1 flex-shrink-0" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-slate-900">{addr.type || 'Address'}</p>
                  {addr.isDefault && (
                    <span className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {addr.address}<br />
                  {addr.addressLine2}<br />
                  {addr.city}, {addr.state} {addr.pincode}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              {!addr.isDefault && (
                <button 
                  onClick={() => onSetDefault(addr.id)}
                  className="px-3 py-1 text-xs text-slate-600 hover:bg-slate-100 rounded-lg transition-colors font-medium"
                >
                  Set Default
                </button>
              )}
              <button 
                onClick={() => onDelete(addr.id)}
                className="p-2 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
              >
                <FiTrash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      <button 
        onClick={onAdd}
        className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-600 hover:border-slate-400 hover:text-slate-700 transition-colors flex items-center justify-center gap-2 font-semibold text-sm"
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
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
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
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">Address Line 2</label>
        <input 
          type="text" 
          name="addressLine2"
          placeholder="Area, Landmark"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">City</label>
          <input 
            type="text" 
            name="city"
            placeholder="City"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">State</label>
          <input 
            type="text" 
            name="state"
            placeholder="State"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 mb-2">ZIP Code</label>
        <input 
          type="text" 
          name="zip"
          placeholder="000000"
          maxLength="6"
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:border-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          required
        />
      </div>

      <div className="flex gap-3 pt-4">
        <button 
          type="submit"
          className="flex-1 py-3 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition-colors"
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