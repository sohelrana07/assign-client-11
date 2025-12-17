import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // handle add asset
  const handleAddAsset = (data) => {
    const assetData = {
      productName: data.productName,
      productImage: data.productImage,
      productType: data.productType,
      productQuantity: data.productQuantity,
      availableQuantity: data.productQuantity,
      hrEmail: user.email,
    };

    axiosSecure.post("/assets", assetData).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New Asset Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    });
  };

  return (
    <div className="bg-base-100 min-h-screen flex justify-center items-center p-4">
      <div className="max-w-2xl w-full bg-white border border-gray-200 p-8">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Add New Asset
        </h2>

        <form onSubmit={handleSubmit(handleAddAsset)} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="label text-gray-700">
              Product Name <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="Laptop, Keyboard, Chair"
              className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary"
              {...register("productName", { required: true })}
            />
            {errors.productName && (
              <p className="text-error text-sm mt-1">
                Product name is required
              </p>
            )}
          </div>

          {/* Product image */}
          <div>
            <label className="label text-gray-700">
              Product Image URL <span className="text-error">*</span>
            </label>
            <input
              type="url"
              placeholder="https://imgbb.com/..."
              className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary"
              {...register("productImage", { required: true })}
            />
            {errors.productImage && (
              <p className="text-error text-sm mt-1">
                Product image URL is required
              </p>
            )}
          </div>

          {/* Product type */}
          <div>
            <label className="label text-gray-700">
              Product Type <span className="text-error">*</span>
            </label>
            <select
              className="select rounded-none w-full outline-none border border-gray-300 focus:border-primary"
              {...register("productType", { required: true })}
            >
              <option value="">Select asset type</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            {errors.productType && (
              <p className="text-error text-sm mt-1">
                Please select a product type
              </p>
            )}
          </div>

          {/* Product Quantity */}
          <div>
            <label className="label text-gray-700">
              Product Quantity <span className="text-error">*</span>
            </label>
            <input
              type="number"
              placeholder="Enter quantity"
              className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary"
              {...register("productQuantity", {
                required: true,
                min: 1,
              })}
            />
            {errors.productQuantity && (
              <p className="text-error text-sm mt-1">
                Quantity must be at least 1
              </p>
            )}
          </div>

          {/* Submit Btn */}
          <button
            type="submit"
            className="btn btn-primary w-full py-3 font-semibold text-base"
          >
            Add Asset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAsset;
