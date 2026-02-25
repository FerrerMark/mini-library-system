import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Centralized API endpoint calls
export const bookApi = {
  getAll: () => api.get('/api/books'),
  getById: (id) => api.get(`/api/books/${id}`),
  create: (payload) => api.post('/api/books', payload),
  update: (id, payload) => api.put(`/api/books/${id}`, payload),
  remove: (id) => api.delete(`/api/books/${id}`),
  issue: (id, payload) => api.post(`/api/books/issue/${id}`, payload),
  returnBook: (id) => api.post(`/api/books/return/${id}`),
};

export const userApi = {
  register: (payload) => api.post('/api/users', payload),
  login: (payload) => api.post('/login', payload),
};

export default api;
