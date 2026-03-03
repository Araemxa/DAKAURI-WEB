import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// User Service - sesuai class Pengguna, Admin, Pengunjung
export const userService = {
  getUserByEmail: async (email) => {
    const response = await api.get(`/users/email/${email}`);
    return response.data;
  },
  createUser: async (userData) => {
    const response = await api.post('/users', userData);
    return response.data;
  },
  updateUser: async (id, userData) => {
    const response = await api.put(`/users/${id}`, userData);
    return response.data;
  }
};

// Profil Organisasi Service
export const profilService = {
  getAll: async () => {
    const response = await api.get('/profil');
    return response.data;
  },
  getProfil: async () => {
    const response = await api.get('/profil');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/profil/${id}`);
    return response.data;
  },
  getByType: async (type) => {
    const response = await api.get(`/profil/type/${type}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/profil', data);
    return response.data;
  },
  updateProfil: async (id, data) => {
    const response = await api.put(`/profil/${id}`, data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/profil/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/profil/${id}`);
    return response.data;
  }
};

// Program Kerja Service
export const programKerjaService = {
  getAll: async () => {
    const response = await api.get('/program-kerja');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/program-kerja/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/program-kerja', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/program-kerja/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/program-kerja/${id}`);
    return response.data;
  }
};

// Statistik Organisasi Service
export const statistikService = {
  getAll: async () => {
    const response = await api.get('/statistik');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/statistik/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/statistik', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/statistik/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/statistik/${id}`);
    return response.data;
  }
};

// Blog/Artikel Service - sesuai class Blog dan Artikel
export const blogService = {
  getAll: async () => {
    const response = await api.get('/blog');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/blog', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/blog/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/blog/${id}`);
    return response.data;
  }
};

// Merchandise/Product Service - sesuai class TokoMerchandise dan Product
export const merchandiseService = {
  getAll: async () => {
    const response = await api.get('/merchandise');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/merchandise/${id}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/merchandise', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/merchandise/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/merchandise/${id}`);
    return response.data;
  },
  updateStock: async (productId, quantity) => {
    const response = await api.patch(`/merchandise/${productId}/stock`, { quantity });
    return response.data;
  }
};

// Order/Payment Service - sesuai class PaymentSystem dan StockDB
export const orderService = {
  create: async (orderData) => {
    const response = await api.post('/orders', orderData);
    return response.data;
  },
  getByUser: async (userId) => {
    const response = await api.get(`/orders/user/${userId}`);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/orders');
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
  processPayment: async (paymentDetails) => {
    const response = await api.post('/orders/payment/process', paymentDetails);
    return response.data;
  }
};

// Anggota Service
export const anggotaService = {
  getAll: async () => {
    const response = await api.get('/anggota/all');
    return response.data;
  },
  getActive: async () => {
    const response = await api.get('/anggota');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/anggota/${id}`);
    return response.data;
  },
  getByJabatan: async (jabatan) => {
    const response = await api.get(`/anggota/jabatan/${jabatan}`);
    return response.data;
  },
  create: async (data) => {
    const response = await api.post('/anggota', data);
    return response.data;
  },
  update: async (id, data) => {
    const response = await api.put(`/anggota/${id}`, data);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/anggota/${id}`);
    return response.data;
  }
};

// Aliases for admin pages
export const profileAPI = profilService;
export const programKerjaAPI = programKerjaService;
export const statistikAPI = statistikService;
export const merchandiseAPI = merchandiseService;
export const blogAPI = blogService;
export const anggotaAPI = anggotaService;

// Dashboard Service
export const dashboardService = {
  getSummary: async () => {
    const response = await api.get('/dashboard');
    return response.data;
  }
};

export default api;
