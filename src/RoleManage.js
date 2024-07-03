import React, { useState } from 'react';
import axios from './api';
import { useSnackbar } from 'notistack';
import { Tab } from '@headlessui/react';

const RoleManage = () => {
  const [roleName, setRoleName] = useState('');
  const [currentRoleName, setCurrentRoleName] = useState('');
  const [newRoleName, setNewRoleName] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleCreateRole = async (e) => {
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

  const handleUpdateRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/Role/UpdateRole', { currentRoleName, newRoleName });
      enqueueSnackbar(response.data.result, { variant: 'success' });
      setCurrentRoleName('');
      setNewRoleName('');
    } catch (error) {
      console.error('Error updating role:', error);
      enqueueSnackbar(error.response?.data?.error || 'Failed to update role', { variant: 'error' });
    }
  };

  const handleDeleteRole = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(`/api/Role/DeleteRole/${roleName}`);
      enqueueSnackbar(response.data.result, { variant: 'success' });
      setRoleName('');
    } catch (error) {
      console.error('Error deleting role:', error);
      enqueueSnackbar(error.response?.data?.error || 'Failed to delete role', { variant: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">Role Management</h1>
        <Tab.Group>
          <Tab.List className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-bold text-blue-800 rounded-lg
                ${selected ? 'bg-white shadow' : 'text-gray-700 hover:bg-gray-500 hover:text-gray-900'}`
              }
            >
              Create Role
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-bold text-blue-800 rounded-lg
                ${selected ? 'bg-white shadow' : 'text-gray-700 hover:bg-gray-500 hover:text-gray-900'}`
              }
            >
              Update Role
            </Tab>
            <Tab
              className={({ selected }) =>
                `w-full py-2.5 text-sm leading-5 font-bold text-blue-800 rounded-lg
                ${selected ? 'bg-white shadow' : 'text-gray-700 hover:bg-gray-500 hover:text-gray-900'}`
              }
            >
              Delete Role
            </Tab>
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleCreateRole}>
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
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-800 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-800"
                >
                  Create
                </button>
              </form>
            </Tab.Panel>
            <Tab.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleUpdateRole}>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Update Role</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Role Name</label>
                  <input
                    type="text"
                    value={currentRoleName}
                    onChange={(e) => setCurrentRoleName(e.target.value)}
                    className="mt-1 h-10 border-2 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">New Role Name</label>
                  <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="mt-1 h-10 border-2 block w-full border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-800 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-800"
                >
                  Update
                </button>
              </form>
            </Tab.Panel>
            <Tab.Panel className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
              <form onSubmit={handleDeleteRole}>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Delete Role</h2>
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
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 dark:bg-red-700 text-white rounded-md hover:bg-red-700 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-red-800"
                >
                  Delete
                </button>
              </form>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default RoleManage;
