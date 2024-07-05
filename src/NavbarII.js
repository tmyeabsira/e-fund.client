import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import logo from './images/logo1.png';
import { hasRole } from './auth';

const NavbarII = () => {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
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
      const response = await axios.get(`${baseURL}/api/user/GetUserByName?userName=${username}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  };

  const toggleMenu = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUserData(null);
    navigate('/');
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto mt-4 p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">E-fund</span>
        </Link>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userData ? (
            <div className="relative">
              <button
                type="button"
                className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open user menu</span>
                <img className="w-8 h-8 rounded-full" src={baseURL+userData.profilePicture} alt="user photo" />
              </button>
              {isNavOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="px-4 py-3">
                    <span className="block text-sm dark:text-white">{userData.userName}</span>
                    <span className="block text-sm text-gray-600 truncate dark:text-gray-400">{userData.email}</span>
                  </div>
                  <ul className="pt-2">
                    <li>
                    {hasRole('admin') || hasRole('superuser') ? (
                      <Link to="/admin" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      <button onClick={toggleMenu}>
                        Admin Dashboard
                      </button>
                      </Link>
                    ) : (
                      <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      <button onClick={toggleMenu}>
                        Dashboard
                      </button>
                      </Link>
                    )}
                    </li>
                    <li>
                      <Link to="/profile/account" className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                      <button onClick={toggleMenu}>
                        Account
                      </button>
                      </Link>
                    </li>
                    <li className="block px-4 py-2 text-sm text-red-700 hover:bg-red-100 dark:hover:bg-red-600 dark:text-red-200 dark:hover:text-white">
                      <button onClick={handleLogout} >
                          Sign out
                        </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/signin" className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded dark:bg-blue-800 dark:text-gray-200 dark:hover:text-white">
              Sign in
            </Link>
          )}
          <button
            onClick={toggleMenu}
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isNavOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`items-center justify-between ${isNavOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-user">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            
            <li>
              <Link to="/fundraisers/search" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Search
              </Link>
            </li>
            <li>
              <Link to="/create/fundraiser/category" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Start a fundraiser
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/about" className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavbarII;
