import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiLoader, FiArrowLeft } from 'react-icons/fi';
import ClientApiInstance from '../../api/axiosIntercepter';
import { toast } from 'react-toastify';

const AdminOrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await ClientApiInstance.get(`/api/admin/orders/${id}`);
        if (response.data.success) {
          setOrder(response.data.data.order);
          setItems(response.data.data.items);
        }
      } catch (err) {
        toast.error("Failed to fetch order details.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <FiLoader className="w-12 h-12 animate-spin text-amber-500" />
      </div>
    );
  }

  if (!order) {
    return <p className="text-center text-red-600 text-lg font-semibold">Order not found.</p>;
  }

  return (
    <div className="space-y-6">
      <Link to="/admin/orders" className="flex items-center gap-2 font-semibold text-amber-600 hover:text-amber-700 transition-colors">
        <FiArrowLeft />
        Back to All Orders
      </Link>
      
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl shadow-lg p-6 border-l-4 border-amber-500">
        <h2 className="text-3xl font-bold text-amber-900">📋 Order Details</h2>
        <p className="text-amber-700 font-semibold mt-2">Order ID: #{order.id}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-2xl font-bold text-amber-900 border-b-2 border-amber-200 pb-4 mb-6">🛒 Items Ordered <span className="text-amber-600">({items.length})</span></h3>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-4 bg-amber-50 rounded-lg hover:bg-amber-100 transition-colors">
                <div className="flex-1">
                  <p className="font-bold text-slate-800">{item.product_name}</p>
                  <p className="text-sm text-slate-600">Variant: {item.variant}</p>
                  <p className="text-sm font-medium text-amber-700">Qty: {item.quantity}</p>
                </div>
                <p className="font-bold text-amber-900 text-lg">₹{Number(item.price).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4 border-b-2 border-amber-200 pb-3">👤 Customer & Shipping</h3>
            <div className="space-y-3">
              <div>
                <p className="font-bold text-slate-800">{order.cust_first_name} {order.cust_last_name}</p>
                <p className="text-sm text-slate-600">{order.cust_email}</p>
                <p className="text-sm text-slate-600">{order.cust_mobile}</p>
              </div>
              <hr className="my-4 border-amber-100" />
              <div>
                <p className="text-sm font-medium text-slate-700">{order.address}</p>
                <p className="text-sm text-slate-600">{order.city}, {order.state} {order.pincode}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-amber-900 mb-4 border-b-2 border-amber-200 pb-3">💳 Payment & Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Subtotal:</span>
                <span className="font-semibold">₹{Number(order.subtotal).toFixed(2)}</span>
              </div>
              {order.shipping_charges !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Shipping:</span>
                  {Number(order.shipping_charges) === 0 ? (
                    <span className="font-semibold text-green-600">FREE</span>
                  ) : (
                    <span className="font-semibold">₹{Number(order.shipping_charges).toFixed(2)}</span>
                  )}
                </div>
              )}
              {order.tax !== undefined && Number(order.tax) > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Tax:</span>
                  <span className="font-semibold">₹{Number(order.tax).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-bold mt-4 pt-4 border-t-2 border-amber-200 text-amber-900">
                <span>Total:</span>
                <span>₹{Number(order.total_amount).toFixed(2)}</span>
              </div>
              <hr className="my-4 border-amber-100" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Method:</span>
                  <span className="font-semibold text-slate-800">{order.payment_method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Status:</span>
                  <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                    order.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 
                    order.payment_status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {order.payment_status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetail;