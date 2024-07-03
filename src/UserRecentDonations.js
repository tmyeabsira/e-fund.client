import React, { useState, useEffect } from 'react';
import axios from './api';

const UserRecentDonations = ({ userId }) => {
  const [donations, setDonations] = useState([]);
  const [visibleDonations, setVisibleDonations] = useState(6);
  const [filterText, setFilterText] = useState('');

  useEffect(() => {
    const fetchRecentDonationsForUser = async () => {
      try {
        const response = await axios.get(`/api/Donation/GetRecentDonationsForUser/${userId}`);
        setDonations(response.data.$values);
      } catch (error) {
        console.error('Error fetching recent donations for user', error);
      }
    };

    fetchRecentDonationsForUser();
  }, [userId]);

  const handleSeeMore = () => {
    setVisibleDonations(visibleDonations + 6);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const safeToString = (value) => {
    return value ? String(value).toLowerCase() : '';
  };

  const filteredDonations = donations.filter((donation) =>
    safeToString(donation.firstName).includes(filterText.toLowerCase()) ||
    safeToString(donation.lastName).includes(filterText.toLowerCase()) ||
    safeToString(donation.fundraiserName).includes(filterText.toLowerCase()) ||
    safeToString(donation.fundraiserCategory.name).includes(filterText.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Recent Donations made for your fundraisers</h2>
      <input
        type="text"
        placeholder="Filter donations"
        value={filterText}
        onChange={handleFilterChange}
        className="mb-4 px-4 py-2 border rounded w-1/3"
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
            <tr key={donation.DonationId} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{donation.firstName === '' ? 'Anonymous' : `${donation.firstName} ${donation.lastName}`}</td>
              <td className="py-2 px-4 border-b">${donation.amount}</td>
              <td className="py-2 px-4 border-b">{donation.fundraiserName}</td>
              <td className="py-2 px-4 border-b">{donation.fundraiserCategory.name}</td>
              <td className="py-2 px-4 border-b">{new Date(donation.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {visibleDonations < filteredDonations.length && (
        <button
          onClick={handleSeeMore}
          className="mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-900"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default UserRecentDonations;
