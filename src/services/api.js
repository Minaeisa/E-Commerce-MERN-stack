import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/pages/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/auth/register', userData),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  forgotPassword: (email) => api.post('/auth/forgotpassword', { email }),
  resetPassword: (resetToken, password) => api.put(`/auth/resetpassword/${resetToken}`, { password }),
};

export const productsAPI = {
  getProducts: (params) => api.get('/products', { params }),
  getProductById: (id) => api.get(`/products/${id}`),
  createProduct: (productData) => api.post('/products', productData),
  updateProduct: (id, productData) => api.put(`/products/${id}`, productData),
  deleteProduct: (id) => api.delete(`/products/${id}`),
  createReview: (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData),
  getTopProducts: () => api.get('/products/top'),
};

export const ordersAPI = {
  createOrder: (orderData) => api.post('/orders', orderData),
  getOrderById: (id) => api.get(`/orders/${id}`),
  getMyOrders: () => api.get('/orders/myorders'),
  getAllOrders: () => api.get('/orders'),
  updateOrderToPaid: (id, paymentData) => api.put(`/orders/${id}/pay`, paymentData),
  updateOrderToDelivered: (id) => api.put(`/orders/${id}/deliver`),
};

export const usersAPI = {
  getUsers: () => api.get('/users'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default api;
