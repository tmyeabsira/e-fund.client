import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./api";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    phoneNumber: "",
    publicApi: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameValidation, setUsernameValidation] = useState({ valid: null, message: "" });
  const [emailValidation, setEmailValidation] = useState({ valid: null, message: "" });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    if (name === "username") {
      checkUsernameExists(value);
    }

    if (name === "email") {
        checkEmailExists(value);
    }
  };

  const checkUsernameExists = async (username) => {
    if (username.trim() === "") {
      setUsernameValidation({ valid: null, message: "" });
      return;
    }

    try {
      const response = await axios.get(`/api/auth/CheckUsername?username=${username}`);
      setUsernameValidation({
        valid: !response.data,
        message: response.data ? "Username is already taken" : "Username is available",
      });
    } catch (error) {
      setUsernameValidation({
        valid: false,
        message: "Error checking username",
      });
    }
  };

  const checkEmailExists = async (email) => {
    if (email.trim() === "") {
      setEmailValidation({ valid: null, message: "" });
      return;
    }

    try {
      const response = await axios.get(`/api/auth/CheckEmail?email=${email}`);
      setEmailValidation({
        valid: !response.data,
        message: response.data ? "Email is already taken" : "Email is available",
      });
    } catch (error) {
      setEmailValidation({
        valid: false,
        message: "Error checking email",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      setUsernameValidation({ valid: false, message: 'Passwords do not match.' });
      return;
    }

    if (usernameValidation.valid === false) {
      return;
    }

    try {
      const response = await axios.post('/api/auth/register', formData);
      navigate('/signin');
    } catch (error) {
      setUsernameValidation({ valid: false, message: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="h-screen bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl items-center justify-between mx-auto p-4">
        <h1 className="text-3xl my-3 text-black dark:text-gray-100">
          Welcome to E-Fund
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="john.doe"
                required
                value={formData.username}
                onChange={handleChange}
              />
              {usernameValidation.message && (
                <p className={`mt-2 text-sm ${
                  usernameValidation.valid === false ? 'text-red-600 dark:text-red-500' : usernameValidation.valid === true ? 'text-green-600 dark:text-green-500' : ''
                }`}>
                  <span className="font-medium">{usernameValidation.valid === false ? 'Oh, snap!' : 'Well done!'}</span> {usernameValidation.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="0912345678"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="publicApi"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your chappa public Api
            </label>
            <input
              type="text"
              id="publicApi"
              name="publicApi"
              className="mb-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="CHAPUBK_TEST-pnbYtqZ7hFSuujp6W2YI0L0xtEAtAnyk"
              required
              value={formData.publicApi}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="john.doe@company.com"
              required
              value={formData.email}
              onChange={handleChange}
            />
            {emailValidation.message && (
                <p className={`mt-2 text-sm ${
                  emailValidation.valid === false ? 'text-red-600 dark:text-red-500' : emailValidation.valid === true ? 'text-green-600 dark:text-green-500' : ''
                }`}>
                  <span className="font-medium">{emailValidation.valid === false ? 'Oh, snap!' : 'Well done!'}</span> {emailValidation.message}
                </p>
              )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              required
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-start mb-6">
            <div className="flex items-center h-5">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                required
              />
            </div>
            <label
              htmlFor="remember"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              I agree with the{" "}
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-500"
              >
                terms and conditions
              </a>
              .
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
