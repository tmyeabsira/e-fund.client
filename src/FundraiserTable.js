import { useNavigate } from 'react-router-dom';
import axios from './api';
import React, { useState, useEffect } from 'react';

const FundraiserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fundraisers, setFundraisers] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterText, setFilterText] = useState('');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(fundraisers.length / itemsPerPage);

  const currentItems = fundraisers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fundraiserResponse = await axios.get('/api/fundraiser/getallfundraisers');
        const userResponse = await axios.get('/api/auth/getallusers');
        const categoryResponse = await axios.get('/api/category/getcategories');

        setFundraisers(fundraiserResponse.data.$values);
        setUsers(userResponse.data.$values);
        setCategories(categoryResponse.data.$values);
      } catch (err) {
        console.error(`Error fetching data: ${err.message}`);
      }
    };

    fetchData(); // Call the function
  }, []);

  const getUsernameById = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.userName : 'Unknown';
  };

  const getCategoryNameById = (categoryId) => {
    const category = categories.find((category) => category.categoryId === categoryId);
    return category ? category.name : 'Unknown';
  };

  const handleRowClick = (id) => {
    navigate(`/fundraisers/${id}`);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredFundraisers = fundraisers.filter((fundraiser) =>
    (fundraiser.title || '').toLowerCase().includes(filterText.toLowerCase()) ||
    getUsernameById(fundraiser.userId).toLowerCase().includes(filterText.toLowerCase()) ||
    getCategoryNameById(fundraiser.categoryId).toLowerCase().includes(filterText.toLowerCase()) ||
    (fundraiser.description || '').toLowerCase().includes(filterText.toLowerCase())
  );

  const currentFilteredItems = filteredFundraisers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4">
      <div className=''>
        <h1 className='text-3xl font-semibold mt-16'>Fundraiser Table</h1>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mb-6" />
        <p className='text-lg my-4'>Here you can find all fundraisers. You can also filter by fundraiser title, owner, category and more.</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Filter fundraisers"
          value={filterText}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-r">Title</th>
            <th className="px-4 py-2 border-b border-r">Owner</th>
            <th className="px-4 py-2 border-b border-r">Category</th>
            <th className="px-4 py-2 border-b border-r">Description</th>
            <th className="px-4 py-2 border-b border-r">Goal</th>
          </tr>
        </thead>
        <tbody>
          {currentFilteredItems.map((fundraiser, index) => (
            <tr
              key={index}
              className="cursor-pointer"
              onClick={() => handleRowClick(fundraiser.id)}
            >
              <td className="px-4 py-2 border-b border-r">{fundraiser.title}</td>
              <td className="px-4 py-2 border-b border-r">{getUsernameById(fundraiser.userId)}</td>
              <td className="px-4 py-2 border-b border-r">{getCategoryNameById(fundraiser.categoryId)}</td>
              <td className="px-4 py-2 border-b border-r">
                {fundraiser.description.substring(0, 30) + '...'}
              </td>
              <td className="px-4 py-2 border-b border-r">${fundraiser.goalAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage * itemsPerPage - itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredFundraisers.length)} of{' '}
          {filteredFundraisers.length}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg"
          >
            {'<<'}
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-lg"
          >
            {'<'}
          </button>
          {[...Array(totalPages).keys()].map((number) => (
            <button
              key={number + 1}
              onClick={() => setCurrentPage(number + 1)}
              className={`px-4 py-2 border rounded-lg ${
                currentPage === number + 1 ? 'bg-blue-600 text-white' : ''
              }`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg"
          >
            {'>'}
          </button>
          <button
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-lg"
          >
            {'>>'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FundraiserTable;
