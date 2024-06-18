import React, { useState, useEffect } from 'react';
import axios from './api';

const SearchFundraisers = () => {
  const [searchType, setSearchType] = useState('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // Fetch all categories for the dropdown
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories/getallcategories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (searchType === 'name') {
        response = await axios.get(`/api/fundraiser/searchbyname/${searchQuery}`);
      } else {
        response = await axios.get(`/api/fundraiser/searchbycategory/${searchQuery}`);
      }
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-4">Search Fundraisers</h1>
        <form onSubmit={handleSearch} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchType">
              Search By
            </label>
            <select
              id="searchType"
              name="searchType"
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="category">Category</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="searchQuery">
              {searchType === 'name' ? 'Fundraiser Name' : 'Category'}
            </label>
            {searchType === 'name' ? (
              <input
                id="searchQuery"
                name="searchQuery"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            ) : (
              <select
                id="searchQuery"
                name="searchQuery"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Search
          </button>
        </form>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchResults.map((fundraiser) => (
              <div key={fundraiser.id} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-2">{fundraiser.title}</h2>
                <p className="text-gray-700 mb-4">{fundraiser.description}</p>
                {fundraiser.pictureUrl && (
                  <img
                    src={`${fundraiser.pictureUrl}`}
                    alt={fundraiser.title}
                    className="mt-4 w-full h-auto rounded-lg"
                  />
                )}
                <button
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => window.location.href = `/fundraiser/${fundraiser.id}`}
                >
                  View Fundraiser
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFundraisers;
