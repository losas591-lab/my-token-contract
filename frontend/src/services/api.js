import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

// Notification endpoints
export const notificationAPI = {
  sendSMS: (data) => api.post('/notifications/send-sms', data),
  sendEmail: (data) => api.post('/notifications/send-email', data),
  getHistory: () => api.get('/notifications/history'),
  updatePreferences: (data) => api.patch('/notifications/preferences', data),
};

export default api;
