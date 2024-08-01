import React, { useEffect, useState } from 'react';
import axios from './api';
import { jwtDecode } from 'jwt-decode';
import LoadingSpinner from './LoadingSpinner';
import FundraiserCard from './FundraiserCard';
import FundraiserNotifications from './FundraiserNotifications'; 
import { useSnackbar } from 'notistack';
import UserDonationsChart from './charts/UserDonationsChart';
import UserRecentDonations from './UserRecentDonations';
const UserDashboard = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [fundraisers, setFundraisers] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalMoneyRaised, setTotalMoneyRaised] = useState(0);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');

  const baseURL = 'https://localhost:7062';

  useEffect(() => {
      const fetchData = async () => {
          try {
              const token = localStorage.getItem('user');
              if (!token) {
                  throw new Error('No token found');
              }
              const decodedToken = jwtDecode(token);
              const username = decodedToken.sub;
              setUsername(username);

              const fundraisersResponse = await axios.get(`/api/fundraiser/user/${username}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              
              const userResponse = await axios.get(`/api/user/getuserbyname?UserName=${username}`)
              setUserId(userResponse.data.user.id)
            //   console.log("userId: ",userId)

              // Placeholder for future API calls to get donation and money raised data
              const donationsResponse = await axios.get(`/api/Donation/GetTotalDonorsByUser/${userId}`);
              const moneyRaisedResponse = await axios.get(`api/Donation/GetTotalDonationsByUser/${userId}`);

              setFundraisers(fundraisersResponse.data.$values);
              setTotalDonations(donationsResponse.data);
              setTotalMoneyRaised(moneyRaisedResponse.data);
          } catch (error) {
              console.error('Error fetching data', error);
          } finally {
              setLoading(false);
          }
      };

      fetchData();
  }, [userId]);

  const handleNewMessage = (message) => {
      enqueueSnackbar(message, { variant: 'info' });
  };

  if (loading) {
      return <LoadingSpinner />;
  }

  return (
      <div className="max-w-7xl mx-auto min-h-screen p-6 dark:bg-gray-900">
          <div className="container mx-auto">
              <h1 className="text-4xl font-semibold mb-8 text-center text-gray-800 dark:text-white">User Dashboard</h1>

            
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold">Total Donors</h2>
                      <p className="mt-4 text-3xl">{totalDonations}</p>
                  </div>
                  <div className="p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold">Total Money Raised</h2>
                      <p className="mt-4 text-3xl">${totalMoneyRaised}</p>
                  </div>
                  <div className="p-6 rounded-lg shadow-md">
                      <h2 className="text-2xl font-semibold">Total Fundraisers</h2>
                      <p className="mt-4 text-3xl">{fundraisers.length}</p>
                  </div>
              </div>
            <UserDonationsChart />
            <UserRecentDonations userId={userId} />

              <h2 className="text-3xl font-semibold mb-6 text-gray-800 dark:text-white">Your Fundraisers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {fundraisers.map((fundraiser) => (
                      <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} baseURL={baseURL} />
                  ))}
              </div>
          </div>
          <FundraiserNotifications username={username} onNewMessage={handleNewMessage} />
      </div>
  );
};

export default UserDashboard;

