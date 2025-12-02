import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLoader, FiEye, FiSearch, FiFilter, FiDownload, FiPackage, FiClock } from 'react-icons/fi';
import { Package, ShoppingBag, CheckCircle, XCircle, Clock, Truck } from 'lucide-react';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchOrders = async () => {
    try {
      const response = await ClientApiInstance.get('/api/admin/orders');
      if (response.data.success) {
        setOrders(response.data.data);
      }
    } catch (err) {
      toast.error("Failed to fetch orders.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusConfig = (status) => {
    const configs = {
      'paid': { 
        color: 'from-green-500 to-emerald-500', 
        bg: 'from-green-50 to-emerald-50', 
        text: 'text-green-700',
        icon: <CheckCircle className="w-4 h-4" />
      },
      'pending': { 
        color: 'from-amber-500 to-orange-500', 
        bg: 'from-amber-50 to-orange-50', 
        text: 'text-amber-700',
        icon: <Clock className="w-4 h-4" />
      },
      'cod_pending': { 
        color: 'from-blue-500 to-cyan-500', 
        bg: 'from-blue-50 to-cyan-50', 
        text: 'text-blue-700',
        icon: <Clock className="w-4 h-4" />
      },
      'failed': { 
        color: 'from-red-500 to-rose-500', 
        bg: 'from-red-50 to-rose-50', 
        text: 'text-red-700',
        icon: <XCircle className="w-4 h-4" />
      },
      'shipped': { 
        color: 'from-purple-500 to-pink-500', 
        bg: 'from-purple-50 to-pink-50', 
        text: 'text-purple-700',
        icon: <Truck className="w-4 h-4" />
      },
      'delivered': { 
        color: 'from-green-500 to-emerald-500', 
        bg: 'from-green-50 to-emerald-50', 
        text: 'text-green-700',
        icon: <CheckCircle className="w-4 h-4" />
      },
      'cancelled': { 
        color: 'from-red-500 to-rose-500', 
        bg: 'from-red-50 to-rose-50', 
        text: 'text-red-700',
        icon: <XCircle className="w-4 h-4" />
      },
    };
    return configs[status] || { 
      color: 'from-slate-400 to-slate-500', 
      bg: 'from-slate-50 to-slate-100', 
      text: 'text-slate-500',
      icon: <Package className="w-4 h-4" />
    };
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toString().includes(searchTerm) ||
      `${order.cust_first_name} ${order.cust_last_name}`.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || order.order_status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.order_status === 'pending').length,
    shipped: orders.filter(o => o.order_status === 'shipped').length,
    delivered: orders.filter(o => o.order_status === 'delivered').length,
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-96">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
          <Package className="w-8 h-8 text-pink-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
        <p className="mt-4 text-slate-600 font-semibold">Loading sweet orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 rounded-3xl shadow-lg p-8 border border-white/60">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-pink-500 to-orange-500 p-4 rounded-2xl shadow-lg">
              <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-4xl font-black bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
                All Orders
              </h2>
              <p className="text-slate-600 font-semibold mt-1">Manage and track customer orders</p>
            </div>
          </div>
          <button className="hidden md:flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all font-bold">
            <FiDownload className="w-5 h-5" />
            Export
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatMiniCard 
            icon={<FiPackage />} 
            label="Total Orders" 
            value={stats.total} 
            color="from-blue-500 to-cyan-500" 
          />
          <StatMiniCard 
            icon={<FiClock />} 
            label="Pending" 
            value={stats.pending} 
            color="from-amber-500 to-orange-500" 
          />
          <StatMiniCard 
            icon={<Truck />} 
            label="Shipped" 
            value={stats.shipped} 
            color="from-purple-500 to-pink-500" 
          />
          <StatMiniCard 
            icon={<CheckCircle />} 
            label="Delivered" 
            value={stats.delivered} 
            color="from-green-500 to-emerald-500" 
          />
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg p-6 border border-white/60">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by order ID or customer name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-medium"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <FiFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="pl-12 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent font-medium appearance-none cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg overflow-hidden border border-white/60">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 text-lg font-semibold">No orders found</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="bg-gradient-to-r from-pink-50 to-orange-50 border-b-2 border-pink-200">
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Order ID</th>
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Customer</th>
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Date</th>
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Total</th>
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Payment</th>
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Status</th>
                  <th className="p-5 text-left font-black text-slate-700 text-sm uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => {
                  const paymentConfig = getStatusConfig(order.payment_status);
                  const orderConfig = getStatusConfig(order.order_status);
                  
                  return (
                    <tr 
                      key={order.id} 
                      className="border-b border-slate-100 hover:bg-gradient-to-r hover:from-pink-50/50 hover:to-orange-50/50 transition-all duration-200"
                    >
                      <td className="p-5">
                        <span className="font-black text-pink-600 text-lg">#{order.id}</span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                            {order.cust_first_name[0]}{order.cust_last_name[0]}
                          </div>
                          <div>
                            <p className="font-bold text-slate-800">{order.cust_first_name} {order.cust_last_name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5">
                        <p className="text-slate-700 font-medium">{new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                        <p className="text-slate-500 text-xs">{new Date(order.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</p>
                      </td>
                      <td className="p-5">
                        <span className="font-black text-xl text-slate-800">₹{order.total_amount.toLocaleString()}</span>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-gradient-to-r ${paymentConfig.bg} ${paymentConfig.text} border border-white/60 shadow-sm`}>
                          {paymentConfig.icon}
                          {order.payment_status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-5">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl font-bold text-sm bg-gradient-to-r ${orderConfig.bg} ${orderConfig.text} border border-white/60 shadow-sm`}>
                          {orderConfig.icon}
                          {order.order_status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-5">
                        <Link 
                          to={`/admin/orders/${order.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-bold"
                          title="View Order Details"
                        >
                          <FiEye className="w-4 h-4" />
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

const StatMiniCard = ({ icon, label, value, color }) => {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-xl p-4 border border-white/60 shadow-md hover:shadow-lg transition-all">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shadow-md`}>
          {React.cloneElement(icon, { className: 'w-5 h-5 text-white' })}
        </div>
        <div>
          <p className="text-2xl font-black text-slate-800">{value}</p>
          <p className="text-xs text-slate-600 font-bold">{label}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderList;