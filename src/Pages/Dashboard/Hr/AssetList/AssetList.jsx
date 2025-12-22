import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaEdit, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [selectedAsset, setSelectedAsset] = useState(null);
  const modalRef = useRef();

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  //  Load Data
  const {
    data: assets = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["hr-assets", search, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/hr/assets?search=${search}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
  });

  //  handle delete Asset
  const handleDeleteAsset = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This asset will be permanently deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/assets/${id}`).then((res) => {
          if (res.data.deletedCount) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Asset deleted successfully",
              showConfirmButton: false,
              timer: 1500,
            });

            refetch();
          }
        });
      }
    });
  };

  //  Modal Open
  const handleOpenModal = (asset) => {
    setSelectedAsset(asset);

    reset({
      productName: asset.productName,
      productImage: asset.productImage,
      productType: asset.productType,
      productQuantity: asset.productQuantity,
    });

    modalRef.current.showModal();
  };

  // update asset
  const handleUpdateAsset = (data) => {
    axiosSecure.patch(`/assets/${selectedAsset._id}`, data).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Asset updated successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        modalRef.current.close();
        reset();
        refetch();
      }
    });

    console.log(data);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-white">
      <title>AssetVerse | Asset-List</title>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Asset List: <span className="text-amber-600">{assets.length}</span>
        </h2>

        {/* search */}
        <input
          type="text"
          placeholder="Search asset..."
          className="input w-full md:w-64 outline-none focus:border-2 focus:border-primary"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-sm">
        <table className="table table-zebra">
          <thead className="bg-base-200">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {assets.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No assets found
                </td>
              </tr>
            )}

            {assets.map((asset) => (
              <tr key={asset._id}>
                <td>
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </td>

                <td className="font-medium">{asset.productName}</td>

                {/* badge */}
                <td>
                  <span
                    className={`badge ${
                      asset.productType === "Returnable"
                        ? "badge-success"
                        : "badge-warning"
                    }`}
                  >
                    {asset.productType}
                  </span>
                </td>

                <td>{asset.productQuantity}</td>

                <td>{new Date(asset.createdAt).toLocaleDateString()}</td>

                <td className="text-center space-x-2">
                  <button
                    onClick={() => handleOpenModal(asset)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteAsset(asset._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/*  Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box rounded-none">
          <h3 className="font-bold text-lg mb-4">Edit Asset</h3>

          <form
            onSubmit={handleSubmit(handleUpdateAsset)}
            className="space-y-4"
          >
            <input
              {...register("productName")}
              placeholder="Asset Name"
              className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary"
            />

            <input
              {...register("productImage")}
              placeholder="Image URL"
              className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary"
            />

            <select
              {...register("productType")}
              className="select rounded-none w-full outline-none border border-gray-300 focus:border-primary"
            >
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>

            <input
              type="number"
              {...register("productQuantity")}
              placeholder="Quantity"
              className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary"
            />

            {/* Action btn */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => modalRef.current.close()}
                className="btn btn-sm border border-gray-300 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-sm bg-amber-600 hover:bg-amber-700 text-white font-medium transition"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* Pagination System */}
      <div className="flex justify-center items-center gap-3 mt-6">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span className="text-sm font-medium">Page {page}</span>

        <button
          className="btn btn-sm"
          disabled={assets.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AssetList;
