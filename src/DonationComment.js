import heart from './images/heart.png';
import CalculateTimeDifference from './CalculateTimeDifference'

const DonationComment = ({ donation }) => {
  // const time = (new Date().getTime() - new Date(donation.createdAt).getTime()) / (1000 * 60);
  const timeStamp = CalculateTimeDifference(donation.createdAt)
  return (
    <div>
    <div className=" w-auto my-4 flex ">
      <div className="mr-2">
        <img src={heart} alt="" className="w-5 mr-4 mt-3" />
      </div>
      <div>
      <p className="font-semibold text-gray-900 dark:text-white">
          {donation.firstName !== ""
            ? donation.firstName + " " + donation.lastName
            : "Anonymous"}
        </p>
        <div className="flex my-2 text-sm">
          <p className="text-gray-900 dark:text-white">
            ${donation.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <span className="text-gray-400 dark:text-gray-500 mx-1">·</span>
            {timeStamp}
            {/* {time < 1400
              ? time < 60
                ? Math.ceil(time) + ' min(s)'
                : Math.ceil(time / 60) + ' hr(s)'
              : Math.ceil(time / 1400) + ' d(s)'} */}
          </p>
        </div>
        <p className="my-2 text-gray-700 dark:text-gray-300">
          {donation.donationComments.$values[0]?.content}
        </p>
      </div>
    </div>
    </div>
  );
};

export default DonationComment;
