import React, { useState } from 'react';
import authService from './authService';
import logo from './images/logo.png'
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await authService.login(username, password);
      window.location.href = '/dashboard';
      setMessage('Login Success');
    } catch (error) {
      setMessage('Login failed');
    }
  };

  //return (
    // <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
    //     <div className="w-full h-full bg-white rounded-lg shadow-md flex flex-col md:flex-row overflow-hidden">
    //         <div className="w-full md:w-1/2 p-8 md:p-12 bg-gray-100">
    //             <div className="flex items-center justify-between">
    //                 <img src="path/to/logo.png" alt="Logo" className="h-8 w-auto mb-4" />
    //             </div>
    //             <h2 className="text-lg text-gray-600">Welcome back</h2>
    //             <h1 className="text-3xl font-semibold text-gray-800">Sign in to GoFundMe</h1>
    //         </div>
    //         <div className="flex-1 p-8 md:p-12">
    //             <div className="text-right pb-12">
    //                 <span className="text-sm text-gray-600">Don't have an account? </span>
    //                 <Link to='../signup' className="text-sm text-green-500 hover:underline">Sign up</Link>
    //             </div>
    //             <h2 className="text-lg text-gray-600 mb-4">Your account details</h2>
    //             <form onSubmit={handleLogin}>
    //                 <div className="mb-4">
    //                     <label className="block text-gray-700">Username</label>
    //                     <input
    //                         type="text"
    //                         value={username}
    //                         onChange={(e) => setUsername(e.target.value)}
    //                         className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    //                         required
    //                     />
    //                 </div>
    //                 <div className="mb-4">
    //                     <label className="block text-gray-700">Password</label>
    //                     <div className="relative">
    //                         <input
    //                             type={showPassword ? 'text' : 'password'}
    //                             value={password}
    //                             onChange={(e) => setPassword(e.target.value)}
    //                             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    //                             required
    //                         />
    //                         <button
    //                             type="button"
    //                             onClick={() => setShowPassword(!showPassword)}
    //                             className="absolute inset-y-0 right-0 px-4 text-gray-600 focus:outline-none"
    //                         >
    //                             <svg
    //                                 className="h-6 w-6"
    //                                 fill="none"
    //                                 stroke="currentColor"
    //                                 viewBox="0 0 24 24"
    //                                 xmlns="http://www.w3.org/2000/svg"
    //                             >
    //                                 {showPassword ? (
    //                                     <path
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         strokeWidth="2"
    //                                         d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 1 12 1c.909 0 1.793.125 2.637.36M15 6l3 3m0 0l-3 3m3-3H9"
    //                                     />
    //                                 ) : (
    //                                     <path
    //                                         strokeLinecap="round"
    //                                         strokeLinejoin="round"
    //                                         strokeWidth="2"
    //                                         d="M15 6l3 3m0 0l-3 3m3-3H9"
    //                                     />
    //                                 )}
    //                             </svg>
    //                         </button>
    //                     </div>
    //                 </div>
    //                 <div className="mb-4 text-right">
    //                     <Link to="/forgotpassword" className="text-sm text-green-500 hover:underline">Forgot your password?</Link>
    //                 </div>
    //                 <button
    //                     type="submit"
    //                     className="w-full py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
    //                 >
    //                     Sign in
    //                 </button>
    //             </form>
    //             <p className="mt-8 text-sm text-center text-gray-600">
    //                 By clicking the Sign In button below, you agree to the GoFundMe{' '}
    //                 <a href="#" className="text-green-500 hover:underline">
    //                     Terms of Service
    //                 </a>{' '}
    //                 and acknowledge the{' '}
    //                 <a href="#" className="text-green-500 hover:underline">
    //                     Privacy Notice
    //                 </a>.
    //             </p>
    //         </div>
    //     </div>
    // </div>
   // <>
        {/* <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  onClick={handleLogin}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Start a 14 day free trial
              </a>
            </p>
          </div>
        </div>
      </> */}
      return (
        <div className="min-h-screen flex items-center justify-center bg-primary">
          <div className="bg-secondary p-8 rounded-lg max-w-md w-full">
             <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="text-3xl font-bold text-neon text-center mb-6">Sign in to your account</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="email">
                  Username
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 rounded-lg bg-primary text-white focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-3 py-2 rounded-lg bg-primary text-white focus:outline-none focus:ring-2 focus:ring-neon focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-neon text-primary font-bold rounded-lg hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition duration-300"
                >
                  Sign In
                </button>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs mt-4">
              ©2024 Futuristic Inc. All rights reserved.
            </p>
          </div>
        </div>
      
);
};

export default Login;
