// Use environment variable or fallback to Render backend URL
// For local development, set VITE_API_URL=http://localhost:5000/api in .env
// For production, set VITE_API_URL in Vercel environment variables
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://zoundly-backend.onrender.com/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const getRefreshToken = () => {
  return localStorage.getItem('refreshToken');
};

const apiCall = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...(options.body && { body: options.body }),
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  if (!response.ok) {
    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      // Clear invalid tokens
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      // Redirect to login if not already there
      if (window.location.pathname !== '/login' && window.location.pathname !== '/register') {
        window.location.href = '/login';
      }
    }
    
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const api = {
  // Auth
  register: (data) => apiCall('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  login: (data) => apiCall('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  logout: () => apiCall('/auth/logout', {
    method: 'POST',
  }),

  getMe: () => apiCall('/auth/me'),

  refreshToken: (refreshToken) => apiCall('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({ refreshToken }),
  }),

  updateProfile: (data) => apiCall('/auth/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  updateProfilePhoto: (data) => apiCall('/auth/profile/photo', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  // Products
  getProducts: (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiCall(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getProduct: (id) => apiCall(`/products/${id}`),

  // Cart
  getCart: () => apiCall('/cart'),

  addToCart: (productId, quantity = 1) => apiCall('/cart', {
    method: 'POST',
    body: JSON.stringify({ productId, quantity }),
  }),

  updateCartItem: (itemId, quantity) => apiCall(`/cart/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify({ quantity }),
  }),

  removeFromCart: (itemId) => apiCall(`/cart/${itemId}`, {
    method: 'DELETE',
  }),

  clearCart: () => apiCall('/cart', {
    method: 'DELETE',
  }),

  // Orders
  getOrders: () => apiCall('/orders'),

  getOrder: (id) => apiCall(`/orders/${id}`),

  // Checkout
  initiateCheckout: (data) => apiCall('/checkout/initiate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  verifyCheckout: (data) => apiCall('/checkout/verify', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  // Admin
  createProduct: (data) => apiCall('/products', {
    method: 'POST',
    body: JSON.stringify(data),
  }),

  updateProduct: (id, data) => apiCall(`/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),

  deleteProduct: (id) => apiCall(`/products/${id}`, {
    method: 'DELETE',
  }),

  updateOrderStatus: (id, data) => apiCall(`/orders/${id}/status`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

export default api;

