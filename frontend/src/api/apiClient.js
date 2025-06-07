import axios from 'axios';

// Base URL for backend API
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: false, // Using Bearer token, no cookies
});

// Automatically attach JWT token from localStorage on each request
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
