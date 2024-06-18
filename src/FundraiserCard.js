import axios from './api';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { jwtDecode } from 'jwt-decode';

const FundraiserCard = ({ fundraiser }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [raised, setRaised] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const baseURL = 'https://localhost:7062';
  const { enqueueSnackbar } = useSnackbar();
  const [title, setTitle] = useState(fundraiser.title);
  const [category, setCategory] = useState(fundraiser.categoryId);
  const [goalAmount, setGoalAmount] = useState(fundraiser.goalAmount);
  const [description, setDescription] = useState(fundraiser.description);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fundraiserResponse = await axios.get(`/api/fundraiser/GetRaised/${fundraiser.id}`);
        const categoriesResponse = await axios.get('/api/category/GetCategories');
        
        setRaised(fundraiserResponse.data.totalRaised);
        setCategories(categoriesResponse.data.$values);

        const token = localStorage.getItem('user');
        if (!token) {
          throw new Error('No token found');
        }

        const decodedToken = jwtDecode(token);
        const UserName = decodedToken.sub;
        const userResponse = await axios.get(`/api/User/GetUserByName?UserName=${UserName}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(userResponse.data.user);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };
    fetchData();
  }, [fundraiser.id]);

  const handleDelete = async () => {
    try {
      const deleteResponse = await axios.delete(`/api/fundraiser/delete/${fundraiser.id}`);
      console.log(deleteResponse.data);
      enqueueSnackbar('Fundraiser deleted successfully', { variant: 'success' });
      setIsModalOpen(false);
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('GoalAmount', goalAmount);
    formData.append('CategoryId', category);
    if (image) {
      formData.append('Picture', image);
    }

    try {
      await axios.put(`/api/fundraiser/update/${fundraiser.id}`, formData);
      enqueueSnackbar("Fundraiser updated successfully.", { variant: 'success' });
      setIsModalOpen(false);
      
      window.location.reload();
    } catch (error) {
      console.error('Error updating fundraiser', error);
      enqueueSnackbar("Failed to update the fundraiser. Please try again.", { variant: 'error' });
    }
  };
  

  const progressPercentage = Math.min((raised / fundraiser.goalAmount) * 100, 100);

  return (
    <div className="max-w-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow overflow-hidden">
      <Link to={`/fundraisers/${fundraiser.id}`} className="block">
        <div className="relative overflow-hidden h-48 rounded-t-lg">
          {fundraiser.pictureUrl && (
            <img
              src={`${baseURL}${fundraiser.pictureUrl}`}
              alt={fundraiser.title}
              className="w-full h-full object-cover absolute inset-x-0 top-0 transition-transform duration-300 transform-gpu hover:scale-105"
            />
          )}
        </div>
      </Link>
      <div className="p-2">
        <Link to={`/fundraisers/${fundraiser.id}`} className="block">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
            {fundraiser.title}
          </h5>
        </Link>
        <div className="bg-gray-200 dark:bg-gray-700 rounded-sm h-1 mt-1 overflow-hidden">
          <div className="bg-blue-600 h-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
        <p className="mt-2 mb-3 text-gray-700 dark:text-gray-400">${raised.toFixed(0)} raised</p>
      </div>
      {/* {isCreator && (
        <div className="mt-1 flex justify-end">
          <button
            onClick={handleUpdateClick}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Update
          </button>
        </div>
      )} */}
      {/* {isModalOpen && (
        <div id="updateProductModal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-gray-900 bg-opacity-50">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
            <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Update Fundraiser
                </h3>
                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleCloseModal}>
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 mb-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Ex. Apple iMac 27&ldquo;"
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="file_input">Upload file</label>
                    <input
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file_input"
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                  </div>
                  <div>
                    <label htmlFor="goalAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Goal</label>
                    <input
                      type="number"
                      name="goalAmount"
                      id="goalAmount"
                      value={goalAmount}
                      onChange={(e) => setGoalAmount(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="$299"
                    />
                  </div>
                  <div>
                    <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    >
                      <option value="" disabled>Select category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea
                      id="description"
                      rows="5"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Write a description for your fundraiser..."
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button type="submit" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                    Update fundraiser
                  </button>
                  <button type="button" onClick={handleDelete} className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                    <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Delete
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default FundraiserCard;
