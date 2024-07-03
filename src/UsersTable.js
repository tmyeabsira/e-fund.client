import axios from './api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(users.length / itemsPerPage);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/auth/getallusers');
        setUsers(response.data.$values);
      } catch (err) {
        console.error(`Error fetching users: ${err.message}`);
      }
    };

    fetchUsers();
  }, []);

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    (user.firstName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (user.lastName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (user.userName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (user.email || '').toLowerCase().includes(filterText.toLowerCase())
  );

  const currentFilteredItems = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function formatDateToDdMmYyyy(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <div className="container mx-auto p-4">
      <div className=''>
        <h1 className='text-3xl font-semibold mt-16'>User Table</h1>
        <hr className="my-4 border-gray-200 sm:mx-auto dark:border-gray-700 lg:mb-6" />
        <p className='text-lg my-4'>Here you can find all users border-r. You can also filter by user's username, first name, last name and more.</p>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users"
          value={filterText}
          onChange={handleFilterChange}
          className="px-4 py-2 border rounded-lg"
        />
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 border-b border-r">First Name</th>
            <th className="px-4 py-2 border-b border-r">Last Name</th>
            <th className="px-4 py-2 border-b border-r">Username</th>
            <th className="px-4 py-2 border-b border-r">Email</th>
            <th className="px-4 py-2 border-b border-r">Created at</th>
          </tr>
        </thead>
        <tbody>
          {currentFilteredItems.map((user, index) => (
            <tr
              key={index}
              className="cursor-pointer"
              onClick={() => navigate(`/admin/user/${user.id}`)}
            >
              <td className="px-4 py-2 border-b border-r">{user.firstName}</td>
              <td className="px-4 py-2 border-b border-r">{user.lastName}</td>
              <td className="px-4 py-2 border-b border-r">{user.userName}</td>
              <td className="px-4 py-2 border-b border-r">{user.email}</td>
              <td className="px-4 py-2 border-b border-r">{formatDateToDdMmYyyy(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage * itemsPerPage - itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{' '}
          {filteredUsers.length}
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

export default UsersTable;
