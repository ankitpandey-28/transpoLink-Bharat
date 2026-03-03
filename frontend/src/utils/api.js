/**
 * API Utility
 * Centralized API configuration and helper functions for making HTTP requests
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 seconds
});

// Request interceptor - Add auth token to requests
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

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
      }

      // Return error message from server
      return Promise.reject(data.message || 'An error occurred');
    } else if (error.request) {
      // Request made but no response
      return Promise.reject('Network error. Please check your connection.');
    } else {
      // Something else happened
      return Promise.reject(error.message);
    }
  }
);

// ============================================
// Authentication API
// ============================================

export const authAPI = {
  // Register new user
  register: async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  // Login user
  login: async (credentials) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  // Logout user
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  }
};

// ============================================
// Users API
// ============================================

export const usersAPI = {
  // Get all users
  getAll: async () => {
    const response = await api.get('/users');
    return response.data;
  },

  // Get single user
  getById: async (id) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  },

  // Update user
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  },

  // Delete user
  delete: async (id) => {
    const response = await api.delete(`/users/${id}`);
    return response.data;
  }
};

// ============================================
// Goods API
// ============================================

export const goodsAPI = {
  // Get all goods with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/goods${params ? `?${params}` : ''}`);
    return response.data;
  },

  // Get single goods
  getById: async (id) => {
    const response = await api.get(`/goods/${id}`);
    return response.data;
  },

  // Create new goods
  create: async (goodsData) => {
    const response = await api.post('/goods', goodsData);
    return response.data;
  },

  // Update goods
  update: async (id, goodsData) => {
    const response = await api.put(`/goods/${id}`, goodsData);
    return response.data;
  },

  // Delete goods
  delete: async (id) => {
    const response = await api.delete(`/goods/${id}`);
    return response.data;
  },

  // Assign driver to goods
  assignDriver: async (id, driverId) => {
    const response = await api.post(`/goods/${id}/assign`, { driverId });
    return response.data;
  }
};

// ============================================
// Trucks API
// ============================================

export const trucksAPI = {
  // Get all trucks with optional filters
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/trucks${params ? `?${params}` : ''}`);
    return response.data;
  },

  // Get single truck
  getById: async (id) => {
    const response = await api.get(`/trucks/${id}`);
    return response.data;
  },

  // Create new truck
  create: async (truckData) => {
    const response = await api.post('/trucks', truckData);
    return response.data;
  },

  // Update truck
  update: async (id, truckData) => {
    const response = await api.put(`/trucks/${id}`, truckData);
    return response.data;
  },

  // Delete truck
  delete: async (id) => {
    const response = await api.delete(`/trucks/${id}`);
    return response.data;
  },

  // Update truck availability
  updateAvailability: async (id, availabilityData) => {
    const response = await api.patch(`/trucks/${id}/availability`, availabilityData);
    return response.data;
  }
};

// ============================================
// Health Check API
// ============================================

export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

// ============================================
// Bookings API
// ============================================

export const bookingsAPI = {
  // Get all bookings
  getAll: async (filters = {}) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/bookings${params ? `?${params}` : ''}`);
    return response.data;
  },

  // Get received booking requests
  getReceived: async () => {
    const response = await api.get('/bookings/received');
    return response.data;
  },

  // Get sent booking requests
  getSent: async () => {
    const response = await api.get('/bookings/sent');
    return response.data;
  },

  // Get single booking
  getById: async (id) => {
    const response = await api.get(`/bookings/${id}`);
    return response.data;
  },

  // Create new booking
  create: async (bookingData) => {
    const response = await api.post('/bookings', bookingData);
    return response.data;
  },

  // Accept booking
  accept: async (id, message) => {
    const response = await api.put(`/bookings/${id}/accept`, { message });
    return response.data;
  },

  // Reject booking
  reject: async (id, message) => {
    const response = await api.put(`/bookings/${id}/reject`, { message });
    return response.data;
  },

  // Cancel booking
  cancel: async (id) => {
    const response = await api.put(`/bookings/${id}/cancel`);
    return response.data;
  },

  // Complete booking
  complete: async (id) => {
    const response = await api.put(`/bookings/${id}/complete`);
    return response.data;
  }
};

// Export the axios instance for custom requests
export default api;
