import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import Navbar from '../../Components/Navbar';
import { ArrowLeft, Eye } from 'lucide-react';

const AdminOrders = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin') {
      alert('You do not have admin access. Redirecting...');
      navigate('/');
      return;
    }
    loadOrders();
  }, [isAuthenticated, user, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await api.getOrders();
      setOrders(response.data?.orders || []);
    } catch (error) {
      console.error('Failed to load orders:', error);
      if (error.message.includes('Not authorized')) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert('Failed to load orders: ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.updateOrderStatus(orderId, { status });
      alert('Order status updated successfully');
      loadOrders();
      if (selectedOrder && selectedOrder._id === orderId) {
        const updatedOrder = await api.getOrder(orderId);
        setSelectedOrder(updatedOrder.data?.order);
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert(error.message || 'Failed to update order status');
    }
  };

  const loadOrderDetails = async (orderId) => {
    try {
      const response = await api.getOrder(orderId);
      setSelectedOrder(response.data?.order);
    } catch (error) {
      console.error('Failed to load order details:', error);
      alert('Failed to load order details');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-[#C3FF6A] text-black';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status) => {
    return status === 'paid' ? 'bg-[#C3FF6A] text-black' : 'bg-red-100 text-red-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate('/admin')} className="text-gray-600 hover:text-black transition">
            <ArrowLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black">Manage Orders</h1>
            <p className="mt-2 text-gray-600">View and update order status</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-[#272727]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.orderNumber}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.user?.name || order.shippingAddress?.name || 'Guest'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.user?.email || order.shippingAddress?.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{order.finalAmount?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded ${getStatusColor(order.status)} border-0`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-xs font-medium px-2 py-1 rounded ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => loadOrderDetails(order._id)}
                      className="text-black hover:text-[#272727] transition"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-extrabold text-black">Order Details</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-black transition text-2xl"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Order Information</h3>
                  <p className="text-gray-700">Order #: <span className="font-semibold text-black">{selectedOrder.orderNumber}</span></p>
                  <p className="text-gray-700">Status: <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>{selectedOrder.status}</span></p>
                  <p className="text-gray-700">Payment Status: <span className={`px-2 py-1 rounded text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>{selectedOrder.paymentStatus}</span></p>
                  <p className="text-gray-700">Total: <span className="font-bold text-black">₹{selectedOrder.finalAmount?.toLocaleString()}</span></p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-black mb-2">Shipping Address</h3>
                  <p className="text-gray-700">{selectedOrder.shippingAddress?.name}</p>
                  <p className="text-gray-700">{selectedOrder.shippingAddress?.address}</p>
                  <p className="text-gray-700">{selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.pincode}</p>
                  <p className="text-gray-700">Phone: {selectedOrder.shippingAddress?.phone}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;

