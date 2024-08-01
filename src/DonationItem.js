import heart from "./images/heart.png";
import React from "react";
import CalculateTimeDifference from "./CalculateTimeDifference";

const DonationItem = ({ donation }) => {
  const timeDifference = CalculateTimeDifference(donation.createdAt);
  console.log("Time",donation.createdAt)

  
// const createdAt = new Date(donation.createdAt.replace(" ", "T"));
// const currentTime = new Date().getTime();
// const timeDifference = (currentTime - createdAt.getTime()) / (1000 * 60);
  return (
    <div className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800">
      <div className="mr-4">
        <img src={heart} alt="" className="w-5" />
      </div>
      <div>
        <p className="font-semibold text-gray-900 dark:text-white">
          {donation.firstName !== ""
            ? donation.firstName + " " + donation.lastName
            : "Anonymous"}
        </p>
        <div className="flex my-2">
          <p className="text-sm text-gray-700 dark:text-gray-100">
            ${donation.amount}
            <span className="text-gray-400 mx-1">·</span> {timeDifference}
            {/* {timeDifference < 1440
  ? timeDifference < 60
    ? Math.ceil(timeDifference) + " min(s)"
    : Math.ceil(timeDifference / 60) + " hr(s)"
  : Math.ceil(timeDifference / 1440) + " d(s)"} */}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationItem;
