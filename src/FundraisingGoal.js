import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import CurrencyInputForm from './CurrencyInputForm';

const FundraisingGoal = () => {
  const [goalAmount, setGoalAmount] = useState(0);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { category, country } = location.state || {}; // Destructure category and country from location state

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!goalAmount) {
      setError('Please enter a goal amount.');
    } else {
      // Proceed with the next steps
      console.log('Goal Amount:', goalAmount);
      const fundraiserData = {
        category,
        country, // Include the country in the state
        goalAmount,
      };
      navigate('/create/fundraiser/details', { state: fundraiserData });
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex flex-col items-center">
      <div className="relative w-full h-80 mb-12">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white bg-gray-700">
          <h1 className="text-4xl font-semibold mb-2">How much would you like to raise?</h1>
          <p className="text-lg">You can always change your goal as you go.</p>
        </div>
      </div>

      <div className="mt-12 w-4/5 max-w-4xl bg-white dark:bg-gray-800 p-10 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Your starting goal</h2>
          <div className="mb-4">
            <label htmlFor="goal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Enter your goal amount
            </label>
            <CurrencyInputForm setGoalAmount={setGoalAmount} />
            {error && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Keep in mind that transaction <Link to='/howitworks' className="text-blue-500 dark:text-blue-400">fees</Link>, including credit and debit charges, are deducted from each donation.
          </p>
          <div className="mt-6 bg-blue-50 dark:bg-gray-800 p-4 rounded-md">
            <p className="text-sm text-gray-800 dark:text-gray-300">To receive money raised, please make sure the person withdrawing has:</p>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
              <li>A chappa account</li>
              <li>A bank account and a valid bank name</li>
            </ul>
          </div>
          <div className="mt-8 flex justify-between">
            <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-indigo-600">
              <span className="sr-only">Back</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 16.293a1 1 0 010-1.414L15.586 12H4a1 1 0 110-2h11.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <button type="submit" className="px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-800">
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FundraisingGoal;
