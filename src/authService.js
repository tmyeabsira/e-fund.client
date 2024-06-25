import axios from 'axios';
import BlogComment from './BlogComment';
import FundraiserCard from './FundraiserCard';

const API_URL = 'https://localhost:7062/api/auth/';

const register = (username, email, password) => {
  return axios.post(API_URL + 'register', {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + 'login', {
      username,
      password,
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.token));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};

 
// account , auth nahom 
// admin, category aymen
// blog, BlogComment naol
// donation, fundraiser half intisar
// fundraiser half yeabsira
// Role, user mike

