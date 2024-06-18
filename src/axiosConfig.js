import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7062',
});

axiosInstance.interceptors.request.use(
    config => {
      const user = localStorage.getItem('user');
      const token = user ? user.split('token:')[1] : null;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

// Add a response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Redirect to login page
      window.location.href = '/signin';
    }
    return Promise.reject(error);
  }
);



export default axiosInstance;
