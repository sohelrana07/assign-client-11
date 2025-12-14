import React from "react";
import Lottie from "react-lottie";
import { Link, useNavigate } from "react-router";
import errorAnimationData from "../../assets/json/Page 404.json";

const ErrorPage = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-100">
      {/* Zoomed Animation */}
      <div className="w-[420px] md:w-[560px] lg:w-[650px] scale-[1]">
        <Lottie
          options={defaultOptions}
          height="100%"
          width="100%"
          isClickToPauseDisabled
        />
      </div>

      {/* Buttons */}
      <div className="mt-12 flex gap-5">
        <Link
          to="/"
          className="px-7 py-2 text-sm md:text-base font-semibold text-white 
               bg-gradient-to-r from-indigo-500 to-purple-500
               hover:from-indigo-600 hover:to-purple-600
               transition-all duration-200"
        >
          Go Home
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="px-7 py-2 text-sm md:text-base font-semibold 
          text-gray-700 border border-gray-300 hover:bg-gray-200
          hover:border-gray-400 transition-all duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
