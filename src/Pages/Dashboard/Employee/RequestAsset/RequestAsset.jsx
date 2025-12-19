import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const assetRef = useRef();

  const { isLoading, data: assets = [] } = useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/assets");
      return res.data;
    },
  });

  // Open modal
  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);
    assetRef.current.showModal();
  };

  // Close modal
  const handleCloseModal = () => {
    setSelectedAsset(null);
    setNote("");
    assetRef.current.close();
  };

  // Asset request
  const handleAssetRequest = () => {
    if (!note.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Note is required",
        text: "Please add a note for your request",
      });
      handleCloseModal();
      return;
    }

    // request data
    const assetRequest = {
      assetId: selectedAsset._id,
      assetName: selectedAsset.productName,
      assetType: selectedAsset.productType,
      hrEmail: selectedAsset.hrEmail,
      companyName: selectedAsset.companyName,
      note: note,
    };

    axiosSecure.post("/requests", assetRequest).then((res) => {
      if (res.data.insertedId) {
        console.log(res.data);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Request submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        handleCloseModal();
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 md:p-10 bg-gray-50 min-h-screen">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Total Assets: <span className="text-amber-600">{assets.length}</span>
        </h2>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Request an Asset
        </h2>
      </div>

      {/* Asset Cards Container */}
      {assets.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-6">
          No assets available
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 p-4 flex flex-col justify-between"
            >
              <div className="flex justify-center mb-4">
                <img
                  src={asset.productImage}
                  alt={asset.productName}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {asset.productName}
                </h3>

                <p className="text-sm font-medium text-amber-700">
                  Company: {asset.companyName}
                </p>

                <p className="text-gray-500 text-sm">
                  Type: {asset.productType}
                </p>
                
                <p className="text-gray-500 text-sm">
                  Available: {asset.availableQuantity}
                </p>
              </div>
              <button
                className={`w-full py-2 rounded-lg font-medium text-white transition ${
                  Number(asset.availableQuantity) === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-amber-600 hover:bg-amber-700 cursor-pointer"
                }`}
                onClick={() => handleOpenModal(asset)}
                disabled={Number(asset.availableQuantity) === 0}
              >
                Request
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      <dialog ref={assetRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box bg-white rounded-none shadow-xl p-6">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Request: {selectedAsset?.productName}
          </h3>

          <textarea
            className="w-full border border-gray-300 p-3 mb-4 outline-none focus:ring-2 focus:ring-amber-600 resize-none"
            placeholder="Add a note for your request"
            rows={4}
            value={note}
            onChange={(e) => setNote(e.target.value)}
          ></textarea>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              className="btn btn-sm border border-gray-300 hover:bg-gray-100 transition"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm bg-amber-600 hover:bg-amber-700 text-white font-medium transition"
              onClick={handleAssetRequest}
            >
              Submit
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default RequestAsset;
