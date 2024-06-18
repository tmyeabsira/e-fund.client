import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link to="/admin/fundraiserTable" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Fundraiser Table</h2>
            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Manage all the fundraisers from this table.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
        </Link>
        <Link to="/admin/blogTable" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-green-600 transition-colors">Blog Table</h2>
            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Manage all the blogs from this table.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-teal-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
        </Link>
        <Link to="/admin/usersTable" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">User Table</h2>
            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Manage all the users from this table.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
        </Link>
      </div>

      <h2 className="text-3xl font-bold mt-12 mb-6 text-gray-900 dark:text-white">Role Management</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-4xl">
        <Link to="/admin/roles/create" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Create Role</h2>
            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Create a new role in the system.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
        </Link>
        <Link to="/admin/roles/update" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">Update Role</h2>
            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Update an existing role in the system.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
        </Link>
        <Link to="/admin/roles/delete" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">Delete Role</h2>
            <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Delete an existing role from the system.</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
