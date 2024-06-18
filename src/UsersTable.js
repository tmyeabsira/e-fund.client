import axios from './api';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UsersTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const currentItems = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/auth/getallusers');
        setUsers(response.data.$values);
      } catch (err) {
        console.error(`Error fetching users: ${err.message}`);
      }
    };

    fetchUsers(); // Call the function
  }, []);

  function formatDateToDdMmYyyy(timestamp) {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

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
            <th className="px-4 py-2 border-b">First Name</th>
            <th className="px-4 py-2 border-b">Last Name</th>
            <th className="px-4 py-2 border-b">Username</th>
            <th className="px-4 py-2 border-b">Email</th>
            <th className="px-4 py-2 border-b">Created AT</th>
            <th className="px-4 py-2 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((user, index) => (
            <tr
              key={index}
              className="cursor-pointer"
              onClick={() => navigate(`/admin/user/${user.id}`)}
            >
              <td className="px-4 py-2 border-b">{user.firstName}</td>
              <td className="px-4 py-2 border-b">{user.lastName}</td>
              <td className="px-4 py-2 border-b">{user.userName}</td>
              <td className="px-4 py-2 border-b">{user.email}</td>
              <td className="px-4 py-2 border-b">{formatDateToDdMmYyyy(user.createdAt)}</td>
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
          {Math.min(currentPage * itemsPerPage, users.length)} of{' '}
          {users.length}
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
