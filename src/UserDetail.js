import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from './api';
import LoadingSpinner from './LoadingSpinner';
import FundraiserCard from './FundraiserCard';

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [fundraisers, setFundraisers] = useState([]);
  const [fundraiserCount, setFundraiserCount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userResponse = await axios.get(`/api/user/getuserbyid/${id}`);
        setUser(userResponse.data);
        console.log('User data:', userResponse.data);

        const roleResponse = await axios.get(`/api/role/getrolesforuser/${userResponse.data.email}`);
        setRoles(roleResponse.data.$values);
        console.log('Roles:', roleResponse.data.$values);

        // const availableRolesResponse = await axios.get(`/api/role/getrolesnotforuser/${user.email}` ); 
        // setAvailableRoles(availableRolesResponse.data.$values);

        const allRolesResponse = await axios.get('/api/role/getallroles');
        setAllRoles(allRolesResponse.data.$values);
        console.log('All roles:', allRolesResponse.data.$values);

        const fundraiserResponse = await axios.get(`/api/fundraiser/getbyuser/${id}`);
        setFundraisers(fundraiserResponse.data.$values);
        setFundraiserCount(fundraiserResponse.data.$values.length);
        console.log('Fundraisers:', fundraiserResponse.data.$values);

        const totalDonationsResponse = await axios.get(`/api/donation/GetTotalDonationsByUser/${id}`);
        setTotalDonations(totalDonationsResponse.data);
        console.log('Total donations:', totalDonationsResponse.data.total);
      } catch (error) {
        console.error('Error fetching user details', error);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleAddRole = async (role) => {
    try {
      await axios.post(`/api/admin/add-role`, { userId: id, role });
      setRoles([...roles, { name: role }]);
      setAllRoles(allRoles.filter(r => r.name !== role));
    } catch (error) {
      console.error('Error adding role', error);
      setError('Error adding role');
    }
  };

  const handleRemoveRole = async (role) => {
    try {
      await axios.post(`/api/admin/remove-role`, { userId: id, role });
      setRoles(roles.filter(r => r.name !== role));
      setAllRoles([...allRoles, { name: role }]);
    } catch (error) {
      console.error('Error removing role', error);
      setError('Error removing role');
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.delete(`/api/admin/delete-user/${user.email}`);
      navigate('/admin/usersTable');
    } catch (error) {
      console.error('Error deleting user', error);
      setError('Error deleting user');
    }
  };

  if (!user) {
    return <LoadingSpinner />;
  }

  // Filter out the roles that the user already has from the allRoles list
  const availableRoles = allRoles.filter(
    (role) => !roles.some((userRole) => userRole.name === role.name)
  );

  return (
    <div className="max-w-5xl mx-auto p-4 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-10">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">{user.userName}</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">Created at: {new Date(user.createdAt).toLocaleDateString()}</p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4 dark:text-white">Roles</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Current Roles</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {roles.map((role, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRemoveRole(role.name)}
                        className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">Available Roles</th>
                  <th className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {availableRoles.map((role, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-300">{role.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleAddRole(role.name)}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-600"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Statistics</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">Total Fundraisers: {fundraiserCount}</p>
          <p className="text-gray-700 dark:text-gray-300">Total Donations: {totalDonations.toLocaleString()} ETB</p>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2 dark:text-white">Fundraisers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundraisers.map((fundraiser, index) => (
              <FundraiserCard key={index} fundraiser={fundraiser} />
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleDeleteUser}
            className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600"
          >
            Delete User
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default UserDetail;
