import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DonationChart = () => {
  const [data, setData] = useState([]);
  const [timeUnit, setTimeUnit] = useState('daily');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
  
    switch (timeUnit) {
      case 'weekly':
        // Format date as day of the week
        return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date); // 'Mon', 'Tue', etc.
        case 'monthly':
          // Show the month and day
          return `${new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)} ${date.getDate()}`;
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7062/api/Donation/GetAggregatedDonations?aggregationPeriod=${timeUnit}`);
        if (response.data.$values && Array.isArray(response.data.$values)) {
          // Assuming the response is directly the array
          setData(response.data.$values.map(item => ({
            ...item,
            PeriodStart: formatDate(item.periodStart),  // Format or convert date if necessary
            Total: item.total
          })));
        } else {
          setData([]); // Ensure data is always an array
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // Fallback to an empty array on error
      }
    };

    fetchData();
  }, [timeUnit]); // Refetch when timeUnit changes

  return (
    <div>
      <h2>Donation Trends</h2>
      <div>
        <label htmlFor="timeUnitSelect">Select Time Unit:</label>
        <select
          id="timeUnitSelect"
          value={timeUnit}
          onChange={(e) => setTimeUnit(e.target.value)}
          style={{ marginLeft: 8 }}
        >
          <option value="daily">24hrs</option>
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

export default DonationChart;