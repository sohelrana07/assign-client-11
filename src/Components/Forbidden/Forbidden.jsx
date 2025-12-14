import React from "react";
import { useNavigate } from "react-router";
import Lottie from "react-lottie";
import forbiddenAnimation from "../../assets/json/forbidden.json";

const Forbidden = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: forbiddenAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
      {/* Animation */}
      <Lottie options={defaultOptions} height={200} width={250} />

      {/* Message */}
      <h1 className="text-3xl font-bold text-red-500 mt-4">403 Forbidden</h1>
      <p className="text-gray-500 mt-2">
        Sorry! You don’t have permission to access this page.
      </p>

      {/* Back Btn */}
      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-secondary text-white rounded-md shadow hover:bg-primary-dark transition cursor-pointer"
      >
        Go Home
      </button>
    </div>
  );
};

export default Forbidden;
