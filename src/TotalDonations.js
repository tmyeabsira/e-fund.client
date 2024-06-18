import React, { useEffect, useState } from "react";
import axios from "./api"; // Adjust the import path as needed
import LoadingSpinner from "./LoadingSpinner";

const TotalDonations = () => {
  const [totalDonations, setTotalDonations] = useState(0);
  const [displayedDonations, setDisplayedDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTotalDonations = async () => {
      try {
        const response = await axios.get("/api/donation/GetTotalDonations");
        if (response.data && typeof response.data === "number") {
          setTotalDonations(parseInt(response.data) * 55);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching total donations:", err);
        setError("Error fetching total donations");
      } finally {
        setLoading(false);
      }
    };

    fetchTotalDonations();
  }, []);

  useEffect(() => {
    if (!loading && totalDonations > 0) {
      let start = 0;
      const duration = 2000; // Duration of the animation in milliseconds
      const increment = totalDonations / (duration / 10);

      const counter = setInterval(() => {
        start += increment;
        if (start >= totalDonations) {
          setDisplayedDonations(totalDonations);
          clearInterval(counter);
        } else {
          setDisplayedDonations(Math.ceil(start));
        }
      }, 10);

      return () => clearInterval(counter);
    }
  }, [loading, totalDonations]);

  if (loading) {
    <LoadingSpinner />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    // <div className="h-64 p-6 text-center">
    //   <h2 className="md:text-6xl text-2xl font-bold text-gray-800 m-6">Total Donations <span className=' text-blue-600'>so far</span></h2>
    //   <p className="md:text-4xl text-xl font-semibold text-gray-700">{displayedDonations.toLocaleString()} ETB</p>
    // </div>
    <section class="bg-gray-100 py-12 dark:bg-gray-900">
      <div class="container mx-auto px-4 md:px-6">
        <div class="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="rounded-full bg-gray-200 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-8 w-8"
              >
                <rect x="3" y="8" width="18" height="4" rx="1"></rect>
                <path d="M12 8v13"></path>
                <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path>
                <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path>
              </svg>
            </div>
            <div class="text-4xl font-bold">${displayedDonations.toLocaleString()}</div>
            <p class="text-gray-500 dark:text-gray-400">Total Donations</p>
          </div>
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="rounded-full bg-gray-200 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-8 w-8"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div class="text-4xl font-bold">3,456</div>
            <p class="text-gray-500 dark:text-gray-400">Donors</p>
          </div>
          <div class="flex flex-col items-center justify-center gap-4">
            <div class="rounded-full bg-gray-200 p-4 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-8 w-8"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div class="text-4xl font-bold">365</div>
            <p class="text-gray-500 dark:text-gray-400">Days Active</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TotalDonations;
