import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiLoader, FiEye } from 'react-icons/fi';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const AdminOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const getStatusColor = (status) => {
    const colors = {
      'paid': 'bg-green-100 text-green-700',
      'pending': 'bg-amber-100 text-amber-700',
      'cod_pending': 'bg-blue-100 text-blue-700',
      'failed': 'bg-red-100 text-red-700',
      'shipped': 'bg-purple-100 text-purple-700',
      'delivered': 'bg-green-100 text-green-700',
      'cancelled': 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-slate-100 text-slate-500';
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <FiLoader className="w-12 h-12 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <h2 className="text-3xl font-bold text-amber-900">📦 All Orders</h2>
        <p className="text-sm text-amber-700 mt-1">Total Orders: <span className="font-bold">{orders.length}</span></p>
      </div>
      <div className="p-6">
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No orders found yet.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-max text-left">
              <thead>
                <tr className="border-b-2 border-amber-200 bg-amber-50">
                  <th className="p-4 font-bold text-amber-900">Order ID</th>
                  <th className="p-4 font-bold text-amber-900">Customer</th>
                  <th className="p-4 font-bold text-amber-900">Date</th>
                  <th className="p-4 font-bold text-amber-900">Total</th>
                  <th className="p-4 font-bold text-amber-900">Payment</th>
                  <th className="p-4 font-bold text-amber-900">Status</th>
                  <th className="p-4 font-bold text-amber-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order.id} className="border-b border-slate-100 hover:bg-amber-50 transition-colors duration-150">
                    <td className="p-4 font-bold text-amber-600">#{order.id}</td>
                    <td className="p-4 font-medium text-slate-800">{order.cust_first_name} {order.cust_last_name}</td>
                    <td className="p-4 text-slate-700">{new Date(order.created_at).toLocaleDateString()}</td>
                    <td className="p-4 font-semibold text-slate-800">₹{order.total_amount}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.order_status)}`}>
                        {order.order_status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link 
                        to={`/admin/orders/${order.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors duration-150 inline-block"
                        title="View Order"
                      >
                        <FiEye size={18} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrderList;