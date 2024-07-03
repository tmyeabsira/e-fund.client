import React, { useState, useEffect } from 'react';
import axios from '../api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { jwtDecode } from 'jwt-decode';

const UserDonationsChart = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);
  const [aggregationPeriod, setAggregationPeriod] = useState('daily');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    switch (aggregationPeriod) {
      case 'weekly':
        // Format date as day of the week
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date); // 'Mon', 'Tue', etc.
      case 'yearly':
        // Format date to show the month
        return new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date); // 'Jan', 'Feb', etc.
      case 'daily':
        // Show time in 24-hour format with minutes
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`; // '13:01', '0:59'
      default:
        // Default to full date with 12-hour time
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        const minutesStr = minutes < 10 ? '0' + minutes : minutes;
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${hours}:${minutesStr} ${ampm}`;
    }
  };
  

  useEffect(() => {
    const fetchUser = async()=>{
        try{
            const token = localStorage.getItem('user');
              if (!token) {
                throw new Error('No token found');
              }
            const decodedToken = jwtDecode(token);
              const UserName = decodedToken.sub;
              const userResponse = await axios.get(`/api/User/GetUserByName?UserName=${UserName}`, {
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              setUser(userResponse.data.user);
              console.log(user)
      
          } catch(error) {
            if (error.response) {
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log('Error', error.message);
            }
          }
    }
    fetchUser();
  },[])

  useEffect(() => {
    fetchAggregatedDonations();
  }, [aggregationPeriod, user]);

  const fetchAggregatedDonations = async () => {
    try {
      const response = await axios.get(`/api/donation/GetDonationsForUser`, {
        params: { userId: user.id, aggregationPeriod }
      });
      setData(response.data.$values.map(item => ({
        ...item,
        PeriodStart: formatDate(item.periodStart),  // Format or convert date if necessary
        Total: item.total})));
    } catch (error) {
      console.error("Error fetching aggregated donations data", error);
    }
  };

  

  return (
    <div>
      <h2>Total user Donations </h2>
      <div>
        <label htmlFor="timeUnitSelect">Select Time Unit:</label>
        <select
          id="timeUnitSelect"
          value={aggregationPeriod}
          onChange={(e) => setAggregationPeriod(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value="daily">12hrs</option>
          <option value="weekly">7days</option>
          <option value="monthly">30days</option>
          <option value="yearly">365days</option>
        </select>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="PeriodStart" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Total" stroke="red" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserDonationsChart;
