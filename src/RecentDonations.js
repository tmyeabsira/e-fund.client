import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RecentDonations = () => {
  const [donations, setDonations] = useState([]);
  const [visibleDonations, setVisibleDonations] = useState(6);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchRecentDonations = async () => {
      try {
        const response = await axios.get('https://localhost:7062/api/Donation/GetRecentDonations');
        setDonations(response.data.$values);
        console.log("ssss",response.data.$values)
      } catch (error) {
        console.error('Error fetching recent donations', error);
      }
    };

    fetchRecentDonations();
  }, []);

  const handleSeeMore = () => {
    setVisibleDonations(visibleDonations + 6);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const filteredDonations = donations.filter((donation) =>
    (donation.firstName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (donation.lastName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (donation.fundraiserName || '').toLowerCase().includes(filterText.toLowerCase()) ||
    (donation.fundraiserCategory.name || '').toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6 font-sans">
      <h2 className="text-2xl font-bold mb-4">Recent Donations</h2>
      <input
        type="text"
        placeholder="Filter donations"
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
          {filteredDonations.slice(0, visibleDonations).map((donation) => (
            <tr key={donation.donationId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{donation.firstName} {donation.lastName}</td>
              <td className="py-2 px-4 border-b">${donation.amount}</td>
              <td className="py-2 px-4 border-b">{donation.fundraiserName}</td>
              <td className="py-2 px-4 border-b">{donation.fundraiserCategory.name}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleDonations < filteredDonations.length && (
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

export default RecentDonations;
