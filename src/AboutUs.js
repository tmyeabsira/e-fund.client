import React from 'react';
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-4 py-16 mx-auto max-w-7xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-8">About Us</h1>

        <section className="flex flex-col lg:flex-row items-center justify-between w-full mb-16">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              Our fundraising platform was born out of the need to make a tangible difference in the world. We saw countless passionate individuals with innovative ideas and projects that lacked the necessary resources to come to fruition. Our platform serves as a bridge, connecting these changemakers with supporters who share their vision and passion.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              From grassroots community projects to large-scale environmental initiatives, we empower individuals and organizations to turn their ideas into reality. Our mission is to provide a transparent, efficient, and supportive platform where every contribution counts and every voice is heard.
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Join us on this journey of making the world a better place, one fundraiser at a time. Your support and participation can spark the change we all wish to see.
            </p>
          </div>
          <img src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" alt="About Us" className="w-full lg:w-1/2 rounded-lg shadow-lg" />
        </section>

        <section className="flex flex-col lg:flex-row items-center justify-between w-full mb-16">
          <img src="https://images.unsplash.com/photo-1522756890800-ac12d130a43f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWlzc2lvbnxlbnwwfHwwfHx8MA%3D%3D" alt="Our Mission" className="w-full lg:w-1/2 rounded-lg shadow-lg mb-8 lg:mb-0 lg:pr-8" />
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              Our mission is to empower individuals and organizations to achieve their fundraising goals. We strive to provide a platform that is not only easy to use but also highly effective in garnering support and raising funds. We believe that everyone has the power to make a difference, and we are here to facilitate that process.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              Transparency, accountability, and community are the core values that drive us. We are committed to maintaining an open and honest platform where fundraisers and donors alike can trust the process and see the impact of their contributions.
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Together, we can create a ripple effect of positive change, supporting causes that matter and making a real difference in the lives of individuals and communities around the world.
            </p>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row items-center justify-between w-full mb-16">
          <div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Our Team</h2>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              Behind our platform is a dedicated team of professionals who are passionate about making a difference. Our team comprises individuals from diverse backgrounds, each bringing unique skills and perspectives to the table. Together, we work tirelessly to ensure that our platform is continuously improving and meeting the needs of our users.
            </p>
            <p className="text-gray-700 dark:text-gray-400 mb-4">
              From customer support to technical development, our team is here to support you every step of the way. We believe in the power of collaboration and are always open to feedback and suggestions from our community.
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              Meet the faces behind our platform and learn more about the passionate individuals who are driving our mission forward.
            </p>
          </div>
          <img src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d" alt="Our Team" className="w-full lg:w-1/2 rounded-lg shadow-lg" />
        </section>

        <section className="w-full text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Join Our Community</h2>
          <p className="text-gray-700 dark:text-gray-400 mb-8">
            Ready to make a difference? Join our community of fundraisers and supporters today. Whether you are looking to start a fundraiser or support a cause, we are here to help you every step of the way.
          </p>
          <Link to={'/create/fundraiser/category'} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Start a Fundraiser
          </Link>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
