import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaPrint } from "react-icons/fa";
import { format } from "date-fns";
import Loading from "../../../../Components/Loading/Loading";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");

  const { isLoading, data } = useQuery({
    queryKey: ["my-assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-assets");
      return res.data;
    },
  });

  //   search & filter
  const filteredAssets = data
    ?.filter((asset) =>
      asset.assetName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((asset) => (filterType ? asset.assetType === filterType : true));

  // Return btn alert
  const handleReturn = (assetId) => {
    alert(`Return feature not implemented yet for ${assetId}`);
  };

  //   handle Print
  const handlePrint = () => {
    window.print();
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-10 space-y-6 bg-base-100">
      <title>AssetVerse | My Assets</title>
      {/* Heading */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Assets</h2>
          <p className="text-sm text-gray-500">
            All assets assigned to you from different companies
          </p>
        </div>

        {/* Print Btn */}
        <button
          onClick={handlePrint}
          className="btn btn-primary btn-sm md:btn-md gap-2"
        >
          <FaPrint />
          Print
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-10 md:mb-16">
        {/* Search */}
        <input
          type="text"
          placeholder="Search by asset name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input rounded-none w-full md:max-w-xs outline-none border border-gray-300 focus:border-primary"
        />

        {/* Filter */}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="select rounded-none w-full md:max-w-xs outline-none border border-gray-300 focus:border-primary"
        >
          <option value="">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
      </div>

      {/* Assets Table */}
      <div className="card bg-base-100 shadow-md">
        <div className="card-body p-0 overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr className="bg-base-200">
                <th>Image</th>
                <th>Name</th>
                <th>Type</th>
                <th>Company</th>
                <th>Request Date</th>
                <th>Approval Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAssets?.length ? (
                filteredAssets.map((asset) => (
                  <tr key={asset.assetId}>
                    <td>
                      <img
                        src={asset.assetImage}
                        alt={asset.assetName}
                        className="w-14 h-14 rounded-lg object-cover"
                      />
                    </td>
                    <td className="font-medium">{asset.assetName}</td>
                    <td>
                      <span className="badge badge-outline rounded-lg">
                        {asset.assetType}
                      </span>
                    </td>
                    <td>{asset.companyName}</td>
                    <td>
                      {asset.requestDate
                        ? format(new Date(asset.requestDate), "dd MMM yyyy")
                        : "-"}
                    </td>
                    <td>
                      {asset.approvalDate
                        ? format(new Date(asset.approvalDate), "dd MMM yyyy")
                        : "-"}
                    </td>
                    <td>
                      <span className="badge badge-success capitalize">
                        {asset.status}
                      </span>
                    </td>
                    <td>
                      {asset.status === "assigned" &&
                      asset.assetType === "Returnable" ? (
                        <button
                          onClick={() => handleReturn(asset.assetId)}
                          className="btn btn-error btn-xs"
                        >
                          Return
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center py-10 text-gray-500">
                    No assets found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssets;
