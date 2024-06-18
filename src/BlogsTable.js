import { useNavigate } from 'react-router-dom';
import axios from './api';
import React, { useState, useEffect } from 'react';

const BlogsTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const totalPages = Math.ceil(blogs.length / itemsPerPage);

  const currentItems = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get('/api/blog/getallblogs');
        const userResponse = await axios.get('/api/auth/getallusers');

        setBlogs(blogResponse.data.$values);
        console.log(blogResponse.data.$values)
        setUsers(userResponse.data.$values);
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

  const handleDelete = ()=>{

  }


  const handleRowClick = (id) => {
    navigate(`/blogs/${id}`);
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
            <th className="px-4 py-2 border-b">Description</th>
            <th className="px-4 py-2 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((blog, index) => (
            <tr key={index}
            className="cursor-pointer"
            onClick={() => handleRowClick(blog.blogId)}>
              <td className="px-4 py-2 border-b">{blog.title}</td>
              <td className="px-4 py-2 border-b">{blog.userName}</td>
              <td className="px-4 py-2 border-b">{blog.content.substring(0, 30) + '...'}</td>
              <td className="px-4 py-2 border-b">
                <button onClick={handleDelete} className="text-red-500 hover:text-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {currentPage * itemsPerPage - itemsPerPage + 1}-
          {Math.min(currentPage * itemsPerPage, blogs.length)} of{' '}
          {blogs.length}
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

export default BlogsTable;
