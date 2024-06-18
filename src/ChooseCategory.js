import React, { useEffect, useState } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';
import { hasRole } from './auth';
import { useSnackbar } from 'notistack';

const ChooseCategory = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (hasRole('admin')) {
      enqueueSnackbar('Admins cannot create a fundraiser', { variant: 'error' });
      navigate('/');
    } else if (hasRole('superuser')) {
      enqueueSnackbar('Superusers cannot create a fundraiser', { variant: 'error' });
      navigate('/')
    }

    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/category/GetCategories');
        setCategories(response.data.$values);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedCategory) {
      setError('Please select a category first.');
      return;
    }

    navigate('/create/fundraiser/goal', { state: { category: selectedCategory} });
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex flex-col items-center justify-center py-12">
      <div className="relative w-full h-80 mb-12">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-gray-700">
          <h1 className="text-4xl font-semibold mb-2">Let's Begin Your Fundraising Journey</h1>
          <p className="text-lg">We're here to guide you every step of the way.</p>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">What best describes why you're fundraising?</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  type="button"
                  className={`px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-full text-gray-500 dark:text-gray-100 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none ${selectedCategory === category.name ? 'bg-blue-200 dark:bg-blue-700 text-blue-600 dark:text-white ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mt-8 flex justify-between">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600">
              <span className="sr-only">Back</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 12H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-800">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChooseCategory;
