import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../utils/api';
import Navbar from '../../Components/Navbar';
import { Package, ShoppingBag, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });
  const [loading, setLoading] = useState(true);

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

    loadStats();
  }, [isAuthenticated, user, navigate]);

  const loadStats = async () => {
    try {
      setLoading(true);
      
      const [productsRes, ordersRes] = await Promise.all([
        api.getProducts(),
        api.getOrders(),
      ]);

      const products = productsRes.data?.products || [];
      const orders = ordersRes.data?.orders || [];

      const totalRevenue = orders
        .filter(order => order.paymentStatus === 'paid')
        .reduce((sum, order) => sum + (order.finalAmount || 0), 0);

      const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'processing').length;

      setStats({
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue,
        pendingOrders,
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
      if (error.message.includes('Not authorized')) {
        alert('Session expired. Please login again.');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Welcome back, <span className="text-black font-semibold">{user?.name}</span></p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-black mt-2">{stats.totalProducts}</p>
              </div>
              <div className="bg-[#C3FF6A] p-3 rounded-lg">
                <Package className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-black mt-2">{stats.totalOrders}</p>
              </div>
              <div className="bg-[#C3FF6A] p-3 rounded-lg">
                <ShoppingBag className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-black mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-[#C3FF6A] p-3 rounded-lg">
                <DollarSign className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-black mt-2">{stats.pendingOrders}</p>
              </div>
              <div className="bg-[#C3FF6A] p-3 rounded-lg">
                <TrendingUp className="h-8 w-8 text-black" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/admin/products')}
                className="w-full text-left px-4 py-3 bg-[#C3FF6A] hover:bg-[#F1FFC1] rounded-lg transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5" />
                  <span className="font-medium text-black">Manage Products</span>
                </div>
                <ArrowRight className="h-5 w-5 text-black group-hover:translate-x-1 transition" />
              </button>
              <button
                onClick={() => navigate('/admin/orders')}
                className="w-full text-left px-4 py-3 bg-[#C3FF6A] hover:bg-[#F1FFC1] rounded-lg transition flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" />
                  <span className="font-medium text-black">Manage Orders</span>
                </div>
                <ArrowRight className="h-5 w-5 text-black group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-black">Recent Activity</h2>
            <p className="text-gray-500">Activity feed coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

