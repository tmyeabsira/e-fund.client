import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = ['#62D952', '#201E50', '#525B76', '#F2542D', '#1E152A', '#a43860', '#71bFF2'];

const DonationsByCategoryChart = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const fetchDonationsByCategory = async () => {
      try {
        const response = await axios.get('https://localhost:7062/api/Donation/GetDonationsByCategory');
        const fetchedData = response.data.$values ? response.data.$values : response.data;
        console.log('Fetched data:', fetchedData); // Debug: Check fetched data
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching donations data', error);
      }
    };

    fetchDonationsByCategory();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredData = selectedCategory
    ? data.filter(item => item.category.name === selectedCategory)
    : data;

    const totalSum = filteredData.reduce((acc, item) => acc + item.totalAmount, 0);

    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {/* ... (existing JSX code remains unchanged) */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={filteredData}
              dataKey="totalAmount"
              nameKey="category.name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              innerRadius={70}
              fill="#8884d8"
              label={({ name, value }) => `${name}: ${(value / totalSum * 100).toFixed(2)}%`} // Display percentage
              labelLine={false}
              style={{ fontSize: '14px', fontWeight: 'bold' }}
            >
              {filteredData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: 'none', borderRadius: '5px' }} />
            <Legend layout="vertical" align="right" verticalAlign="middle" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
};

export default DonationsByCategoryChart;
