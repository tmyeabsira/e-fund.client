import React, { useEffect, useState } from 'react';
import axios from './api';
import LoadingSpinner from './LoadingSpinner';
import FundraiserCard from './FundraiserCard';
// import axiosInstance from './axiosConfig';

const Fundraisers = () => {
    const [fundraisers, setFundraisers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFundraisers = async () => {
            try {
                const response = await axios.get('/api/fundraiser/getallfundraisers');
                setFundraisers(response.data.$values);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFundraisers();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-8">Fundraisers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fundraisers.map((fundraiser) => (
                <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
            ))}
            </div>
        </div>
    );
};

export default Fundraisers;
