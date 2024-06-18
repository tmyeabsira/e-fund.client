import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './api';

const RemoveRole = () => {
  const { email } = useParams();
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`/api/role/getrolesforuser/${email}` ); 
      setRoles(response.data.$values);
    } catch (error) {
      console.error('Error fetching roles', error);
      setMessage('Failed to fetch roles.');
    }
  };

  const handleRemoveRole = async () => {
    if (!selectedRole) {
        setMessage('Please select a role before adding.');
        return;
    }

    try {
      const response = await axios.post('/api/admin/remove-role', { email:email, role:selectedRole });
      setMessage(response.data);
      navigate('/');
    } catch (error) {
      console.error('Error adding role', error);
      setMessage('Failed to add role.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Remove Role from {email}</h2>
      {message && <p className="mb-4 text-center text-red-500">{message}</p>}
      {roles.length > 0 ? (
        <>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="">Select a role</option>
            {roles.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          <button
            onClick={handleRemoveRole}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Remove Role
          </button>
        </>
      ) : (
        <p className="text-center text-gray-600">This user has no roles.</p>
      )}
    </div>
  );
};

export default RemoveRole;
