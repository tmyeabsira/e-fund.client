import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import axios from './api';
import { jwtDecode } from 'jwt-decode';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  const baseURL = 'https://localhost:7062';
  

  useEffect(() => {
    // Check if the user token exists
    const token = localStorage.getItem('user');

    if (token) {
      const username = jwtDecode(token).sub; 
      fetchUserData(username);
    }
  }, []);

  const fetchUserData = async (username) => {
    try {
        const response = await axios.get(`/api/user/GetUserByName?userName=${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        <Link to="/" className="text-green-600 text-2xl font-bold">
          <img src="path/to/gofundme-logo.png" alt="GoFundMe" className="h-8 w-auto" />
        </Link>
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Search</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">For individuals</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">For charities</Link>
          <Link to="/" className="text-gray-600 hover:text-gray-900">How it works</Link>
          {userData ? (
            <Link to='dashboard'><img src={`${baseURL}${userData.user.profilePicture}`} alt="User Profile" className="h-8 w-8 rounded-full" /></Link> 
          ) : (
            <Link to="/signin" className="text-gray-600 hover:text-gray-900">Sign in</Link>
          )}
          <Link to="/start" className="ml-4 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">Start a GoFundMe</Link>
        </nav>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-900 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <nav className="md:hidden px-4 pb-4 space-y-4">
          <Link to="/" className="block text-gray-600 hover:text-gray-900">Search</Link>
          <Link to="/" className="block text-gray-600 hover:text-gray-900">For individuals</Link>
          <Link to="/" className="block text-gray-600 hover:text-gray-900">For charities</Link>
          <Link to="/" className="block text-gray-600 hover:text-gray-900">How it works</Link>
          {userData ? (
            <img src={userData.ProfilePictureUrl} alt="User Profile" className="h-8 w-8 rounded-full" />
          ) : (
            <Link to="/signin" className="block text-gray-600 hover:text-gray-900">Sign in</Link>
          )}
          <Link to="/start" className="block px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600">Start a GoFundMe</Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
