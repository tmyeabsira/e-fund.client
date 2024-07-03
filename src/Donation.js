import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from './api';

const Donation = () => {
  const location = useLocation();
  const { fundraiser } = location.state;
  const [user, setUser] = useState(null);
  const baseURL = 'https://localhost:7062';
  const [formData, setFormData] = useState({
    fundraiser: fundraiser,
    currency: 'ETB',
    amount: '',
    firstName: '',
    lastName: '',
    comment: ''
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`/api/user/getuserbyid/${fundraiser.userId}`);
        setUser(response.data);
        console.log("user:",response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const generateTxRef = () => {
    return 'negade-tx-' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const txRef = generateTxRef();
    // Set up the form data for Chapa API submission
    const chapaForm = document.createElement('form');
    chapaForm.method = 'POST';
    chapaForm.action = 'https://api.chapa.co/v1/hosted/pay';
    
    // Append the form data to the Chapa form
    chapaForm.innerHTML = `
      <input type="hidden" name="public_key" value="CHAPUBK_TEST-pnbYtqZ7hFSuujp6W2YI0L0xtEAtAnyk" />
      <input type="hidden" name="tx_ref" value="${txRef}" />
      <input type="hidden" name="return_url" value="http://localhost:3000/thank-you" />
      <input type="hidden" name="amount" value="${formData.amount}" />
      <input type="hidden" name="currency" value="${formData.currency}" />
      <input type="hidden" name="first_name" value="${formData.firstName}" />
      <input type="hidden" name="last_name" value="${formData.lastName}" />
      <input type="hidden" name="title" value="${fundraiser.title}" />
      <input type="hidden" name="description" value="Donation to ${fundraiser.title}" />
      <input type="hidden" name="logo" value="https://chapa.link/asset/images/chapa_swirl.svg" />
      <input type="hidden" name="meta[title]" value="${fundraiser.title}" />
    `;
    document.body.appendChild(chapaForm);
    chapaForm.submit();

    // Save the form data and txRef to local storage or state
    localStorage.setItem('formData', JSON.stringify({ ...formData, txRef }));
  };

  return (
    <div className="dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1200px] mx-auto w-full lg:flex item-center space-y-8 px-9 py-6 bg-white dark:bg-gray-800 rounded-lg">
        <div className='flex-1'>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Donate to {fundraiser.title}
          </h2>
          <img
            src={`${baseURL}${fundraiser.pictureUrl}`}
            alt={fundraiser.title}
            className="mt-4 w-auto h-96 rounded-lg"
          />
          <div className='flex items-center'>
            {/* <img src ={`${baseURL}${user.profilePicture}`}
            alt="s"
            className='w-8 my-2 mr-1 rounded-full border-blue-800 border' />
            <p className=''><span className='text-blue-800 font-bold'>{user.userName}</span> will be reciving your donation</p> */}
          </div>
        </div>
        <div>
        <form className="mt-14 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className='flex items-center'>
            <div className='pr-3'>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={formData.currency}
                onChange={handleChange}
              >
                <option value="ETB">ETB</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className='flex-1'>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Amount
              </label>
              <input
                id="amount"
                name="amount"
                type="number"
                min="1"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>
            </div>
            <div className='flex items-center'>
            <div className='pr-3 flex-1'>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                autoComplete="given-name"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="First Name (optional)"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className='flex-1'>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                autoComplete="family-name"
                className="mt-1 block w-full px-3 py-2 border border-gray-x300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Last Name (optional)"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Comment (optional)
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="3"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Comment (optional)"
                value={formData.comment}
                onChange={handleChange}
              />
            </div>
          </div>
          <div >
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Donate Now
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
  // return (
  //   <section className="bg-white dark:bg-gray-900">
  //     <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
  //       <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{fundraiser.title}</h2>
  //       <form onSubmit={handleSubmit}>
  //         <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
  //           <div className="sm:col-span-2">
  //             <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Blog Title</label>
  //             <input
  //               type="text"
  //               name="name"
  //               id="name"
  //               value={title}
  //               onChange={(e) => setTitle(e.target.value)}
  //               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  //               placeholder="Type fundraiser title"
  //               required
  //             />
  //           </div>
  //           <div className="sm:col-span-2">
  //             <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
  //             <textarea
  //               id="description"
  //               rows="8"
  //               value={content}
  //               onChange={(e) => setContent(e.target.value)}
  //               className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
  //               placeholder="Your description here"
  //               required
  //             />
  //           </div>
  //           <div className="sm:col-span-2">
  //             <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Blog image</label>
  //             <input
  //               className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
  //               id="file_input"
  //               type="file"
  //               onChange={handleImageChange}
  //               required
  //             />
  //           </div>
  //         </div>
  //         {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  //         <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
  //           Create Blog
  //         </button>
  //       </form>
  //     </div>
  //   </section>
  // );
};

export default Donation;
