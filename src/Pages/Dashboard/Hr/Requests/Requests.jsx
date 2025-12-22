import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { FaCheck, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router";

const Requests = () => {
  const axiosSecure = useAxiosSecure();
  const Navigate = useNavigate();

  const {
    isLoading,
    data: requests = [],
    refetch,
  } = useQuery({
    queryKey: ["requests", "requestStatus"],
    queryFn: async () => {
      const res = await axiosSecure.get("/requests");
      return res.data;
    },
  });

  // approve btn validate data
  const { data: currentUser } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  //   handle approve
  const handleApprove = async (req) => {
    axiosSecure.patch(`/requests/approve/${req._id}`).then((res) => {
      if (res.data.modifiedCount) {
        console.log(res.data);
        Swal.fire({
          icon: "success",
          title: "Request Approved",
          text: `${req.assetName} assigned to ${req.requesterName}`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  //   handle reject
  const handleReject = async (req) => {
    axiosSecure.patch(`/requests/reject/${req._id}`).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "info",
          title: "Request Rejected",
          text: `${req.assetName} request rejected`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      <title>AssetVerse | Requests</title>
      {/* Heading */}
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
        Employee Asset Requests:
        <span className="text-amber-600"> {requests.length}</span>
      </h2>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow">
        <table className="w-full table-auto min-w-[700px] border-separate border-spacing-y-2">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Employee</th>
              <th className="py-3 px-4 text-left">Asset</th>
              <th className="py-3 px-4 text-left">Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, index) => (
              <tr
                key={req._id}
                className="bg-white hover:bg-gray-50 transition-all duration-300 shadow-sm hover:shadow-lg border border-gray-100"
              >
                <td className="py-3 px-4 font-semibold">{index + 1}</td>
                <td className="py-3 px-4 font-medium">{req.requesterName}</td>
                <td className="py-3 px-4">{req.assetName}</td>
                <td className="py-3 px-4">
                  {new Date(req.requestDate).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full shadow-sm capitalize ${
                      req.requestStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : req.requestStatus === "approved"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {req.requestStatus}
                  </span>
                </td>

                <td className="py-3 px-4 text-center flex justify-center gap-2">
                  {req.requestStatus === "pending" ? (
                    <>
                      {/* Approve Btn */}
                      <button
                        onClick={
                          currentUser?.currentEmployees >=
                          currentUser?.packageLimit
                            ? Navigate("/dashboard/UpgradePackage")
                            : () => handleApprove(req)
                        }
                        className={`btn btn-sm bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg ${
                          currentUser?.currentEmployees >=
                          currentUser?.packageLimit
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                      >
                        <FaCheck size={14} /> Approve
                      </button>

                      {/* Reject Btn */}
                      <button
                        onClick={() => handleReject(req)}
                        className="btn btn-sm bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg"
                      >
                        <FaTimes size={14} /> Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Requests;
