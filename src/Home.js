import { Link } from "react-router-dom";
import hand from "./images/blue.png";
import React, { useEffect, useRef, useState } from "react";
import axios from "./api";
import FundraiserCard from "./FundraiserCard";
import myImage from "./images/together.webp";
import TotalDonations from "./TotalDonations";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <Howitworks />
      <FundraisersSection />
    </div>
  );
};

const HeroSection = () => {
  const handleButtonClick = (e) => {
    e.preventDefault();
    document
      .getElementById("target-section")
      .scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <section className="md:py-32 md:ml-16 lg:py-40 ">
        <div className="max-w-7xl px-4 md:px-6 lg:px-8 grid gap-5 md:grid-cols-2 items-center mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-blue-700 dark:text-[#87CEEB]">
              Make a Change
            </h1>
            <p className="text-lg md:text-xl  dark:text-white max-w-[600px]">
              Your donation can be the catalyst for transforming lives and
              building a brighter future for our community. Join us in this
              extraordinary journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                onClick={handleButtonClick}
                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-lg transition-colors hover:bg-[#5c82e6] focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:ring-offset-2 dark:bg-[#87CEEB] dark:text-[#1E1E1E] dark:hover:bg-[#9dd9f2] dark:focus:ring-offset-[#1E1E1E]"
              >
                Donate now
              </Link>
              <Link
                to={"/about"}
                className="inline-flex items-center justify-center rounded-md bg-transparent px-6 py-3 text-base font-medium text-blue-600 border border-[#4169E1] shadow-lg transition-colors hover:bg-[#4169E1] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#4169E1] focus:ring-offset-2 dark:border-[#87CEEB] dark:text-[#87CEEB] dark:hover:bg-[#87CEEB] dark:hover:text-[#1E1E1E] dark:focus:ring-offset-[#1E1E1E]"
              >
                Explore Our Mission
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img
                src={myImage}
                width="500"
                height="500"
                alt="welcome"
                className="rounded-lg shadow-lg"
                style={{ aspectRatio: 500 / 500, objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      <TotalDonations />
      <div className="flex flex-col items-center justify-center w-full h-full px-8 py-6 mx-auto text-sm text-gray-800 dark:text-gray-400 md:grid-cols-3 md:px-6">
        <div className="flex flex-col h-full items-center justify-center px-4 py-2 mx-auto lg:gap-8 xl:gap-0 lg:py-2"></div>
        <div className="my-3 grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-3xl lg:text-4xl font-serif font-extrabold tracking-tight leading-none dark:text-white">
              Start a <span style={{ color: "#0a66c2" }}>Fund</span>, Change a
              Life: Your Impact Begins Here
            </h1>
            <p className=" mt-3 mb-6 text-lg lg:mb-8">
              Welcome to our Fundraising Platform, where your initiative can
              spark real change in the world. Whether you're passionate about
              education, healthcare, environmental conservation, or community
              development, starting a fund in any of these categories can make a
              significant difference.
            </p>
            <Link
              to={"/create/fundraiser/category"}
              className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Start a Fundraiser
            </Link>
          </div>
          <div className="lg:mt-0 lg:col-span-5 lg:flex mt-4">
            <img
              src={hand}
              alt="mockup"
              className="w-full h-auto md:w-3/4 lg:w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Howitworks = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;

    const handleScroll = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          section.classList.add("animate-stretch");
          text.classList.add("animate-slide-up");
        }
      });
    };

    const observer = new IntersectionObserver(handleScroll, {
      threshold: 0.5,
    });

    observer.observe(section);

    return () => {
      observer.unobserve(section);
    };
  }, []);

  return (
    <div className="w-full py-32 bg-[#639fff6e] flex items-center justify-center">
      <section
        ref={sectionRef}
        className="w-4/5 mx-auto py-12 transition-all duration-1000 ease-in-out transform origin-center"
      >
        <div
          ref={textRef}
          className="max-w-5xl mx-auto px-4 opacity-0 translate-y-10 transition-all duration-1000 ease-in-out"
        >
          <h2 className="md:text-5xl text-3xl font-bold text-gray-900 mb-12">
            Fundraising on OurPlatform is easy, powerful, and trusted.
          </h2>
          <p className="md:text-2xl text-lg text-gray-900 mb-9">
            Get what you need to help your fundraiser succeed on OurPlatform,
            whether you’re raising money for yourself, friends, family, or
            charity. With no fee to start, OurPlatform is the world’s leading
            crowdfunding platform—from memorial tributes and funerals to medical
            emergencies and nonprofits. Whenever you need help, you can ask
            here.
          </p>
          <p className="md:text-2xl text-lg text-gray-900">
            Still have questions? Learn more about how OurPlatform works.
          </p>
        </div>
      </section>
    </div>
  );
};

const FundraisersSection = () => {
  const [fundraisers, setFundraisers] = useState([]);

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        const response = await axios.get("/api/Fundraiser/GetAllFundraisers");
        setFundraisers(response.data.$values);
      } catch (error) {
        console.error("Error fetching fundraisers", error);
      }
    };

    fetchFundraisers();
  }, []);

  return (
    <section id="target-section" className="bg-white py-8 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-8">
          Discover fundraisers inspired by what you care about
        </h2>
        <div className="flex justify-between items-center mb-4 sm:mb-8">
          <div>
            <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full">
              Happening worldwide
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="p-2 bg-gray-200 text-gray-700 rounded-full">
              ←
            </button>
            <button className="p-2 bg-gray-200 text-gray-700 rounded-full">
              →
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fundraisers.map((fundraiser) => (
            <FundraiserCard key={fundraiser.id} fundraiser={fundraiser} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Home;
