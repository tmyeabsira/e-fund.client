import { useNavigate } from 'react-router-dom';
import axios from './api';
import React, { useState, useEffect } from 'react';

const FundraiserTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fundraisers, setFundraisers] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b">Title</th>
            <th className="px-4 py-2 border-b">Owner</th>
            <th className="px-4 py-2 border-b">Category</th>
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Goal</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((fundraiser, index) => (
            <tr key={index}
            className="cursor-pointer"
            onClick={() => handleRowClick(fundraiser.id)}>
              <td className="px-4 py-2 border-b">{fundraiser.title}</td>
              <td className="px-4 py-2 border-b">{getUsernameById(fundraiser.userId)}</td>
              <td className="px-4 py-2 border-b">{getCategoryNameById(fundraiser.categoryId)}</td>
              <td className="px-4 py-2 border-b">{fundraiser.description.substring(0, 30) + '...'}</td>
              <td className="px-4 py-2 border-b">${fundraiser.goalAmount}</td>
              <td className="px-4 py-2 border-b">
                <button className="text-gray-500 hover:text-gray-700">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage * itemsPerPage - itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, fundraisers.length)} of{' '}
          {fundraisers.length}
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
