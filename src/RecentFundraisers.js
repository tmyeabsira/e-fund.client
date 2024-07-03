import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentFundraisers = () => {
  const [fundraisers, setfundraisers] = useState([]);
  const [visiblefundraisers, setVisiblefundraisers] = useState(6);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchRecentfundraisers = async () => {
      try {
        const response = await axios.get('https://localhost:7062/api/fundraiser/GetRecentfundraisers');
        setfundraisers(response.data.$values);
        console.log("ssss",response.data.$values)
      } catch (error) {
        console.error('Error fetching recent fundraisers', error);
      }
    };

    fetchRecentfundraisers();
  }, []);

  const handleSeeMore = () => {
    setVisiblefundraisers(visiblefundraisers + 6);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredfundraisers = fundraisers.filter((fundraiser) =>
    (fundraiser.firstName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (fundraiser.lastName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (fundraiser.fundraiserName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (fundraiser.fundraiserCategory.name || '').toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Recent fundraisers</h2>
      <input
        type="text"
        placeholder="Filter fundraisers"
        value={filterText}
        onChange={handleFilterChange}
        className="mb-4 px-4 py-2 border rounded w-full"
      />
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Donor</th>
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Fundraiser</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredfundraisers.slice(0, visiblefundraisers).map((fundraiser) => (
            <tr key={fundraiser.fundraiserId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{fundraiser.firstName} {fundraiser.lastName}</td>
              <td className="py-2 px-4 border-b">${fundraiser.amount}</td>
              <td className="py-2 px-4 border-b">{fundraiser.fundraiserName}</td>
              <td className="py-2 px-4 border-b">{fundraiser.fundraiserCategory.name}</td>
              <td className="py-2 px-4 border-b">{new Date(fundraiser.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visiblefundraisers < filteredfundraisers.length && (
        <button
          onClick={handleSeeMore}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default RecentFundraisers;
