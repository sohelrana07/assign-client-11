import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import { format } from "date-fns";
import axios from "axios";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const { register, handleSubmit } = useForm();
  const axiosSecure = useAxiosSecure();
  const { updateUserProfile } = useAuth();

  const {
    isLoading,
    data: userData = [],
    refetch,
  } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/me");
      return res.data;
    },
  });

  // update profile
  const handleUpdateProfile = (data) => {
    console.log(data);
    let photoURL = userData?.profileImage;

    if (data.profileImage && data.profileImage.length > 0) {
      const formData = new FormData();
      formData.append("image", data.profileImage[0]);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMG_HOST_KEY
      }`;

      axios.post(image_API_URL, formData).then((imgRes) => {
        photoURL = imgRes.data.data.url;

        // updated data
        const updatedData = {
          name: data.name,
          dateOfBirth: data.dateOfBirth,
          profileImage: photoURL,
        };

        if (userData?.role === "hr") {
          updatedData.companyName = data.company;
        }

        axiosSecure.patch("/users/me", updatedData).then((res) => {
          if (res.data.modifiedCount) {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              text: "Your profile has been updated successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
          }

          //  update user profile to firebase
          const profile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(profile).catch((error) => {
            console.log("error Message", error.message);
          });

          refetch();
          setEditing(false);
        });
      });
    } else {
      // updated data
      const updatedData = {
        name: data.name,
        dateOfBirth: data.dateOfBirth,
      };

      if (userData?.role === "hr") {
        updatedData.companyName = data.company;
      }

      axiosSecure.patch("/users/me", updatedData).then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Your profile has been updated with out Image!",
            timer: 1500,
            showConfirmButton: false,
          });
        }

        // update user profile to firebase
        const profile = {
          displayName: data.name,
          photoURL: photoURL,
        };

        updateUserProfile(profile).catch((error) => {
          console.log("error Message", error.message);
        });

        refetch();
        setEditing(false);
      });
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="min-h-screen md:bg-gray-50 flex items-center justify-center md:p-4">
      <title>AssetVerse | Profile</title>
      <div className="w-full max-w-5xl bg-white shadow-xl p-6 md:p-10 grid md:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="flex flex-col items-center text-center border-b border-primary md:border-b-0 md:border-r pb-6">
          <div className="relative">
            <figure className="w-36 h-36 rounded-full border-4 border-primary overflow-hidden">
              <img
                src={
                  userData?.profileImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdZViE66j-NjGxox1Yz2JCNB7cP_byawE3w&s"
                }
                alt="profile"
                className="w-full h-full object-cover"
              />
            </figure>

            {editing && (
              <label className="absolute bottom-0 right-0 bg-primary text-white text-xs px-3 py-1 cursor-pointer">
                Upload
                <input
                  type="file"
                  title="upload your img"
                  {...register("profileImage")}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <h2 className="mt-4 text-xl font-semibold">{userData?.name}</h2>
          <p className="text-sm text-gray-500 font-semibold">
            {userData?.role}
          </p>

          <span className="mt-3 inline-block bg-secondary/10 text-secondary px-4 py-1 text-sm font-semibold">
            {userData?.companyName || "You don't have your own company"}
          </span>
        </div>

        {/* Right Side */}
        <div className="md:col-span-2">
          {!editing && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-primary">
                My Profile
              </h3>

              {/* View Info */}
              <div className="space-y-4 text-gray-700">
                <p>
                  <strong>Name:</strong> {userData?.name}
                </p>
                <p>
                  <strong>Email:</strong> {userData?.email}
                </p>
                <p>
                  <strong>Date of Birth:</strong>{" "}
                  {format(new Date(userData?.dateOfBirth), "dd MMM yyyy")}
                </p>
                <p>
                  <strong>Company:</strong>{" "}
                  {userData?.companyName || "You don't have your own company"}
                </p>

                <button
                  onClick={() => setEditing(true)}
                  className="mt-6 cursor-pointer bg-primary text-white px-6 py-2 hover:bg-primary/90 transition"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}

          {/* Edit Form */}
          {editing && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-primary">
                Edit Profile
              </h3>

              <form
                onSubmit={handleSubmit(handleUpdateProfile)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {/* Name */}
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userData?.name}
                    {...register("name")}
                    className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary transition"
                  />
                </div>

                {/* Email (Read only) */}
                <div>
                  <label className="text-sm text-gray-600">
                    Email (Read only)
                  </label>
                  <input
                    type="email"
                    readOnly
                    defaultValue={userData?.email}
                    className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary px-4 py-2 transition bg-gray-100 cursor-not-allowed"
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="text-sm text-gray-600">Date of Birth</label>
                  <input
                    type="date"
                    defaultValue={userData?.dateOfBirth?.slice(0, 10)}
                    {...register("dateOfBirth")}
                    className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary transition"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-sm text-gray-600">Company</label>
                  <input
                    type="text"
                    readOnly={userData?.role === "employee"}
                    defaultValue={
                      userData?.role === "hr"
                        ? userData?.companyName
                        : "You don't have your own company"
                    }
                    placeholder="Your company name"
                    {...register("company")}
                    className="input rounded-none w-full outline-none border border-gray-300 focus:border-primary transition"
                  />
                </div>

                {/* Button */}
                <div className="md:col-span-2 flex gap-4 mt-4">
                  <button
                    type="submit"
                    className="cursor-pointer bg-primary text-white px-6 py-2 hover:bg-primary/90 transition"
                  >
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="cursor-pointer bg-secondary text-white px-6 py-2 hover:bg-secondary/90 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
