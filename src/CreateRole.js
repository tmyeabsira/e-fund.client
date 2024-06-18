import React, { useState } from 'react';
import axios from './api';
import { useSnackbar } from 'notistack';

const CreateRole = () => {
  const [roleName, setRoleName] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/Role/CreateRole', { roleName });
      enqueueSnackbar(response.data.result, { variant: 'success' });
      setRoleName('');
    } catch (error) {
      console.error('Error creating role:', error);
      enqueueSnackbar(error.response?.data?.error || 'Failed to create role', { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Create Role</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="mt-1 h-10 border-2 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-800">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateRole;
