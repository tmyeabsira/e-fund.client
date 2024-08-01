import React, { useState, useEffect } from 'react';
import axios from './api';

const RecentFundraisers = () => {
  const [fundraisers, setfundraisers] = useState([]);
  const [visiblefundraisers, setVisiblefundraisers] = useState(6);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchRecentfundraisers = async () => {
      try {
        const response = await axios.get('/api/Fundraiser/GetAllFundraisers');
        setfundraisers(response.data.$values);
        console.log("fundraiser data",response.data.$values)
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
    (fundraiser.title || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (fundraiser.goalAmount.toString() || '').toLowerCase().includes(filterText.toLowerCase()) ||
    // (fundraiser.fundraiser.fundraiserCategory || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (fundraiser.description || '').toLowerCase().includes(filterText.toLowerCase())
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
            <th className="py-2 px-4 border-b">Title</th>
            <th className="py-2 px-4 border-b">Goal</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Category</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredfundraisers.slice(0, visiblefundraisers).map((fundraiser) => (
            <tr key={fundraiser.fundraiserId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{fundraiser.title.slice(0,20)+'...'}</td>
              <td className="py-2 px-4 border-b">${fundraiser.goalAmount}</td>
              <td className="py-2 px-4 border-b">{fundraiser.description.slice(0,15)+"..."}</td>
              <td className="py-2 px-4 border-b">{fundraiser.firstName}</td>
              <td className="py-2 px-4 border-b">{new Date(fundraiser.createdAt).toLocaleDateString()}</td>
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
