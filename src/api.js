import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7062', 
});

instance.interceptors.request.use(
    config => {
      const token = localStorage.getItem('user'); // Adjust the key to match where you store the token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  

export default instance;
