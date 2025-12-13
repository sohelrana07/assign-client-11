import React from "react";
import Lottie from "react-lottie";
import { Link } from "react-router";

import errorAnimationData from "../../assets/Hello.svg";

const ErrorPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: errorAnimationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="max-w-lg w-full text-center">
        {/* Lottie Animation */}
        <Lottie options={defaultOptions} height={300} width={300} />

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mt-6">
          Oops! Page Not Found
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 mt-2 mb-6">
          The page you are looking for does not exist or has been moved.
        </p>

        {/* Go Home Button */}
        <Link
          to="/"
          className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
