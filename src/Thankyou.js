import React, { useEffect, useState } from 'react';
import axios from './api';
import FundraiserCard from './FundraiserCard';
import hand from './images/blue.png'
import DonationNotifications from './DonationNotifications';

const ThankYou = () => {
  const [relatedFundraisers, setRelatedFundraisers] = useState([]);
  const [message, setMessage] = useState('');
  const [storedFormData, setStoredFormData] = useState(null);
  const [user, setUser] = useState(null);


  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData'));
    if (storedData) {
      setStoredFormData(storedData);

    }
  }, []);

  useEffect(() => {
    const verifyAndCreateDonation = async () => {
      if (storedFormData) {
        try {
          await axios.post('/api/donation/createdonation', {
            fundraiserId: storedFormData.fundraiser.id,
            amount: storedFormData.amount,
            firstName: storedFormData.firstName,
            lastName: storedFormData.lastName,
            comment: storedFormData.comment,
            currency: storedFormData.currency,
          });
        } catch (error) {
          console.error('Error creating donation', error);
        }
      }
    };

    const fetchRelatedFundraisers = async () => {
      if (storedFormData) {
        try {
          const response = await axios.get(`/api/fundraiser/GetFundraiserByCategory/${storedFormData.fundraiser.categoryId}`);
          setRelatedFundraisers(response.data.$values);
        } catch (error) {
          console.error('Error fetching related fundraisers', error);
        }
      }
    };

    const fetchUser = async () => {
      if (storedFormData) {
        try {
          const response = await axios.get(`/api/user/getuserbyid/${storedFormData.fundraiser.userId}`);
          setUser(response.data);
          localStorage.removeItem('formData');
        } catch (error) {
          console.error(error);
        }
      }
    };

    if (storedFormData) {
      verifyAndCreateDonation();
      fetchRelatedFundraisers();
      fetchUser();
    }
  }, [storedFormData]);

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 min-h-screen">

<section class="w-full py-20 md:py-32 lg:py-40">
  <div class="container grid items-center gap-8 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
    <img
      src={hand}
      width="800"
      height="600"
      alt="Fundraiser Cause"
      class="mx-auto aspect-[4/3] overflow-hidden rounded-xl object-cover"
    />
    <div class="space-y-4">
      <DonationNotifications user={user} />
      <h1 class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Thank You for Your Donation</h1>
      <p class="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
      Your generous contribution makes a real difference in the lives of those we serve. We are deeply grateful for your support.
      </p>
      <div class="flex flex-col gap-2 sm:flex-row">
        <button className='bg-black text-white py-2 px-4 rounded'>Share on Social</button>
      </div>
    </div>
  </div>
</section>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Other Fundraisers in the Same Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedFundraisers.map((relatedFundraiser) => (
            <FundraiserCard key={relatedFundraiser.id} fundraiser={relatedFundraiser} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
