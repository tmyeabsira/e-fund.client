import React, { useEffect, useState } from 'react';
import axios from './api';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/user/getallusers');
      setUsers(response.data.$values);
      console.log(typeof(response.data.$values))
      console.log(users)
    } catch (error) {
      console.error('Error fetching users', error);
      setMessage('Failed to fetch users.');
    }
  };

  const handleDeleteUser = async (email) => {
    try {
      const response = await axios.delete(`/api/admin/delete-user/${email}`);
      setMessage(response.data);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
      setMessage('Failed to delete user.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">User List</h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Email</th>
            <th className="py-2">Add to Role</th>
            <th className="py-2">Remove from Role</th>
            <th className="py-2">Delete User</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className="border-t">
              <td className="py-2">{user.email}</td>
              <td className="py-2">
                <button
                  onClick={() => navigate(`/admin/add-role/${user.email}`)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Add Role
                </button>
              </td>
              <td className="py-2">
                <button
                  onClick={() => navigate(`/admin/remove-role/${user.email}`)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                  Remove Role
                </button>
              </td>
              <td className="py-2">
                <button
                  onClick={() => handleDeleteUser(user.email)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
