import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { MdCheckCircle } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [paymentInfo, setPaymentInfo] = useState({});
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentInfo({
            transactionId: res.data.payment?.transactionId,
            packageName: res.data.payment?.packageName,
            amount: res.data.payment?.amount,
          });
        });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-500/10 via-green-500/20 to-green-500/30 px-4 text-center">
      <div className="bg-white rounded-sm shadow-xl p-10 max-w-md w-full animate-fade-in">
        {/* Success Icon */}
        <MdCheckCircle className="text-9xl text-green-500 mb-6 animate-bounce" />

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-green-600 mb-6">
          Payment Successful!
        </h2>

        {/* Payment Details */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 text-left">
          <p className="text-green-700 font-medium text-lg mb-2">
            <span className="font-bold">Package:</span>{" "}
            {paymentInfo.packageName || "Not Available"}
          </p>
          <p className="text-green-700 font-medium text-lg mb-2">
            <span className="font-bold">Amount Paid:</span> $
            {paymentInfo.amount || 0}
          </p>
          <p className="text-green-700 font-medium text-lg break-all">
            <span className="font-bold">Transaction ID:</span>{" "}
            {paymentInfo.transactionId || "Not Available"}
          </p>
        </div>

        {/* Back Button */}
        <Link
          to="/dashboard/package"
          className="btn btn-lg bg-green-600 text-white hover:bg-green-800 transition-all duration-300"
        >
          Back to Upgrade Package
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
