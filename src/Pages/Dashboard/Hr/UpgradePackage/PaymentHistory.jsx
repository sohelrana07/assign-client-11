// PaymentHistory.jsx
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";

const PaymentHistory = () => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const res = await axiosSecure.get("/payments/history");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="px-4 md:px-10 py-8 bg-gray-50 min-h-screen">
      <title>AssetVerse | Payment History</title>

      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          Payment History
        </h1>
        <p className="mt-3 text-gray-500 max-w-2xl mx-auto">
          All your successful payments and subscription details in one place.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="text-gray-700">#</th>
              <th className="text-gray-700">Package</th>
              <th className="text-gray-700">Amount</th>
              <th className="text-gray-700">Status</th>
              <th className="text-gray-700">Paid At</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-400">
                  No payment history found.
                </td>
              </tr>
            ) : (
              payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`hover:bg-gray-50 transition-colors ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <th>{index + 1}</th>
                  <td>{payment.packageName}</td>
                  <td>${payment.amount.toFixed(2)}</td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        payment.paymentStatus === "paid"
                          ? "bg-green-100 text-green-500"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {payment.paymentStatus.toUpperCase()}
                    </span>
                  </td>
                  <td className="text-gray-600 text-sm">
                    {new Date(payment.paidAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
