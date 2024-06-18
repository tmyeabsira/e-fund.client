import React, { useState, useEffect } from "react";
import axios from "./api";
import FundraiserCard from "./FundraiserCard";

const SearchDropdown = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [fundraisers, setFundraisers] = useState([]);
  const [trendingFundraisers, setTrendingFundraisers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/category/GetCategories");
        setCategories(response.data.$values);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    const fetchTrendingFundraisers = async () => {
      try {
        const response = await axios.get("/api/fundraiser/trending");
        setTrendingFundraisers(response.data.$values);
      } catch (error) {
        console.error("Error fetching trending fundraisers", error);
      }
    };

    fetchCategories();
    fetchTrendingFundraisers();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownVisible(false);
    if (searchInput) {
      fetchFundraisers(searchInput, category);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchInput(searchValue);
    if (searchValue) {
      fetchFundraisers(searchValue, selectedCategory);
    } else {
      setFundraisers([]);
    }
  };

  const fetchFundraisers = async (search, category) => {
    try {
      const response = await axios.get("/api/fundraiser/search", {
        params: {
          title: search,
          category: category !== "All categories" ? category : "All categories",
        },
      });
      setFundraisers(response.data.$values);
      setCurrentPage(1); // Reset to the first page whenever a new search is made
    } catch (error) {
      console.error("Error fetching fundraisers", error);
    }
  };

  const currentFundraisers = (searchInput ? fundraisers : trendingFundraisers).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage * itemsPerPage < (searchInput ? fundraisers : trendingFundraisers).length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className=" bg-white border-gray-200 dark:bg-gray-900">
    <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
      <form className="max-w-lg mx-auto">
        <div className="flex">
          <label
            htmlFor="search-dropdown"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <button
            id="dropdown-button"
            onClick={toggleDropdown}
            type="button"
            className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          >
            {selectedCategory}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          {dropdownVisible && (
            <div
              id="dropdown"
              className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                <li>
                  <button
                    type="button"
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={() => handleCategorySelect("All categories")}
                  >
                    All categories
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category.id}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategorySelect(category.name)}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search Fundraisers..."
              value={searchInput}
              onChange={handleSearchChange}
              required
            />
            <button
              type="submit"
              className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      {currentFundraisers.length > 0 && (
        <div className="mx-4">
            {trendingFundraisers.length > 0 && (
              <h2 className="text-xl font-bold">Popular:</h2>
            )}
            <div className="flex flex-wrap -mx-2">
                {currentFundraisers.map((fundraiser) => (
                    <div key={fundraiser.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-2 mb-4">
                        <FundraiserCard fundraiser={fundraiser} />
                    </div>
                ))}
            </div>
        </div>
    )}
          <div className="flex justify-end mt-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Previous
            </button>
            <button
              onClick={nextPage}
              disabled={currentPage * itemsPerPage >= (searchInput ? fundraisers : trendingFundraisers).length}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            >
              Next
            </button>
          </div>
      </div>
      </div>
  );
};

export default SearchDropdown;
