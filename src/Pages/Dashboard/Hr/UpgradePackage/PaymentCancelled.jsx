import React from "react";
import { Link } from "react-router";
import { MdCancel } from "react-icons/md";

const PaymentCancelled = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-amber-600/10 to-red-500/25 px-4">
      <div className="bg-white rounded-sm shadow-xl p-10 max-w-md w-full text-center animate-fade-in">
        {/* Icon */}
        <MdCancel className="text-9xl text-red-500 mb-6 animate-pulse" />

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-red-600 mb-4">
          Payment Cancelled!
        </h2>

        {/* Description */}
        <p className="text-red-700 font-medium text-lg md:text-xl mb-8">
          Your payment could not be completed. Please try again.
        </p>

        {/* Retry Button */}
        <Link
          to="/dashboard/package"
          className="btn btn-lg bg-red-600 text-white hover:bg-red-800 hover:text-yellow-200 transition-all duration-300 rounded-sm px-6 py-3"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancelled;
