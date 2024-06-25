import React, { useState } from 'react';

const CurrencyInputForm = ({ setGoalAmount }) => {
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
    setGoalAmount(newAmount);
  };

  return (
    <form className="w-full flex relative">
      <label htmlFor="currency-input" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Amount</label>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
          </svg>
        </div>
        <input
          type="number"
          id="currency-input"
          value={amount}
          onChange={handleAmountChange}
          className="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-s-lg border-e-gray-50 border-e-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-e-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          placeholder="Enter amount"
          required
        />
      </div>
      <button
        className=" flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-e-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
        type="button"
        disabled
      >
        {currency}
      </button>
    </form>
  );
};

export default CurrencyInputForm;
