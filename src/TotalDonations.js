import React, { useEffect, useState } from "react";
import axios from "./api"; // Adjust the import path as needed
import LoadingSpinner from "./LoadingSpinner";

const TotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [displayedDonations, setDisplayedDonations] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [displayedDonors, setDisplayedDonors] = useState(0);
  const [totalDaysActive, setTotalDaysActive] = useState(0); // Assuming a static value for demo
  const [displayedDaysActive, setDisplayedDaysActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalData = async () => {
      try {
        const [donationsResponse, donorsResponse] = await Promise.all([
          axios.get("/api/donation/GetTotalDonations"),
          axios.get("/api/donation/GetTotalDonors")
        ]);

        if (donationsResponse.data && typeof donationsResponse.data === "number") {
          setTotalDonations(parseInt(donationsResponse.data));
          
        } else {
          throw new Error("Unexpected donations response format");
        }

        if (donorsResponse.data && typeof donorsResponse.data === "number") {
          setTotalDonors(donorsResponse.data);
        } else {
          throw new Error("Unexpected donors response format");
        }

        const startDate = Date.parse("2024-06-01");
        const currentDate = Date.now();
        const daysActive = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
        setTotalDaysActive(daysActive);

      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalData();
  }, []);

  const animateCounter = (start, end, duration, setter) => {
    let current = start;
    const increment = end / (duration / 10);

    const counter = setInterval(() => {
      current += increment;
      if (current >= end) {
        setter(end);
        clearInterval(counter);
      } else {
        setter(Math.ceil(current));
      }
    }, 10);
  };

  useEffect(() => {
    if (!loading) {
      animateCounter(0, totalDonations, 2000, setDisplayedDonations);
      animateCounter(0, totalDonors, 2000, setDisplayedDonors);
      animateCounter(0, totalDaysActive, 2000, setDisplayedDaysActive);
    }
  }, [loading, totalDonations, totalDonors, totalDaysActive]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="bg-gray-100 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-gray-200 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                <path d="M12 8v13"></path>
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
              </svg>
            </div>
            <div className="text-4xl font-bold">${displayedDonations.toLocaleString()}</div>
            <p className="text-gray-500 dark:text-gray-400">Total Donations</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-gray-200 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className="text-4xl font-bold">{displayedDonors.toLocaleString()}</div>
            <p className="text-gray-500 dark:text-gray-400">Donors</p>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="rounded-full bg-gray-200 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div className="text-4xl font-bold">{displayedDaysActive}</div>
            <p className="text-gray-500 dark:text-gray-400">Days Active</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalDonations;
