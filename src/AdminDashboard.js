import React from 'react';
import { Link } from 'react-router-dom';
import DonationChart from './DonationChart';
import DonationsByCategoryChart from './charts/DonationsByCategoryChart';
import RecentDonations from './RecentDonations';
import RecentFundraisers from './RecentFundraisers';

const AdminDashboard = () => {
  return (
    <div className=''>
    <div className="min-h-screen dark:bg-gray-900 py-10 px-6">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white text-center">Admin Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Overview</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <DonationChart />
          <DonationsByCategoryChart />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Recent Activities</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentDonations />
          <RecentFundraisers />
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white text-center">Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <Link to="/admin/blogTable" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg">
          <div className="relative z-10">
            <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-notebook-pen"><path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/><path d="M2 6h4"/><path d="M2 10h4"/><path d="M2 14h4"/><path d="M2 18h4"/><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/></svg>              
              <h3 className="pl-4 text-2xl font-bold mb-2 ">Manage Blogs</h3>
            </div>
              <p className="text-gray-600">Add, remove, and edit users from here.</p>
            </div>
          </Link>
          <Link to="/admin/fundraiserTable" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg">
          <div className="relative z-10">
            <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-hand-coins"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>              
              <h3 className="pl-4 text-2xl font-bold mb-2 ">Manage Fundraisers</h3>
            </div>
              <p className="text-gray-600">Add, remove, and edit users from here.</p>
            </div>
          </Link>
          <Link to="/admin/usersTable" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg">
          <div className="relative z-10">
            <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <h3 className="pl-4 text-2xl font-bold mb-2 ">Manage Users</h3>
            </div>
              <p className="text-gray-600">Add, remove, and edit users from here.</p>
            </div>
          </Link>
          <Link to="/admin/rolemanagement" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg">
          <div className="relative z-10">
            <div className='flex items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-book-lock"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10"/><path d="M20 15v7H6.5a2.5 2.5 0 0 1 0-5H20"/><rect width="8" height="5" x="12" y="6" rx="1"/><path d="M18 6V4a2 2 0 1 0-4 0v2"/></svg>              
              <h3 className="pl-4 text-2xl font-bold mb-2 ">Manage Roles</h3>
            </div>
              <p className="text-gray-600">Add, remove, and edit users from here.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* <section>
        <h2 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Role Management</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link to="/admin/roles/create" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">Create Role</h3>
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Create a new role in the system.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
          </Link>
          <Link to="/admin/roles/update" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-yellow-600 transition-colors">Update Role</h3>
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Update an existing role in the system.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
          </Link>
          <Link to="/admin/roles/delete" className="group relative block bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white group-hover:text-red-600 transition-colors">Delete Role</h3>
              <p className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Delete an existing role from the system.</p>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 opacity-25 group-hover:opacity-50 transition-opacity"></div>
          </Link>
        </div>
      </section> */}
    </div>
      
      </div>
  );
};

export default AdminDashboard;
