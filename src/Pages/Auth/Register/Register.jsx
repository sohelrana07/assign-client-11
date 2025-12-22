import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";
import useAxios from "../../../Hooks/useAxios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const selectedRole = useWatch({ control, name: "role" });
  const { registerUser } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const handleRegister = (data) => {
    // register
    registerUser(data.email, data.password)
      .then(() => {
        // user data
        const userData = {
          name: data.name,
          email: data.email,
          dateOfBirth: data.dateOfBirth,
          role: data.role,

          ...(data.role === "hr" && {
            companyName: data?.companyName,
            companyLogo: data?.companyLogo,
            packageLimit: 5,
            currentEmployees: 0,
            subscription: "basic",
          }),
        };

        axiosInstance.post("/users", userData).then((res) => {
          if (res.data.insertedId) {
            toast.success("Registration successful! Welcome to AssetVerse.");
            setTimeout(() => {
              navigate("/dashboard/profile");
            }, 1200);
          }
        });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <title>AssetVerse | Register</title>
      <div className="w-full bg-base-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Create your account
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            Start managing assets with AssetVerse
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleRegister)} className="space-y-5">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="John Doe"
              className="input w-full outline-none focus:border-2 focus:border-primary"
            />
            {errors.name && (
              <p className="text-error text-sm mt-1">Name is required</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Email Address</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="john@example.com"
              className="input w-full outline-none focus:border-2 focus:border-primary"
            />
            {errors.email && (
              <p className="text-error text-sm mt-1">Email is required</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Account Type</span>
            </label>
            <select
              {...register("role", { required: true })}
              className="select w-full outline-none focus:border-2 focus:border-primary"
            >
              <option value="">Select role</option>
              <option value="employee">Employee</option>
              <option value="hr">HR Manager</option>
            </select>
            {errors.role && (
              <p className="text-error text-sm mt-1">Please select a role</p>
            )}
          </div>

          {/* Company Info */}
          {selectedRole === "hr" && (
            <>
              {/* company Name */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Company Name</span>
                </label>
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  className="input w-full outline-none focus:border-2 focus:border-primary"
                  placeholder="ABC Corporation"
                />
                {errors.companyName && (
                  <p className="text-error text-sm mt-1">
                    Company Name is required
                  </p>
                )}
              </div>

              {/* company logo */}
              <div>
                <label className="label">
                  <span className="label-text font-medium">Company Logo</span>
                </label>
                <input
                  type="url"
                  {...register("companyLogo", { required: true })}
                  className="input w-full outline-none focus:border-2 focus:border-primary"
                  placeholder="https://imgbb.com/..."
                />
                {errors.companyLogo && (
                  <p className="text-error text-sm mt-1">
                    Company Logo is required
                  </p>
                )}
              </div>
            </>
          )}

          {/* Date of Birth */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Date of Birth</span>
            </label>
            <input
              type="date"
              {...register("dateOfBirth", { required: true })}
              className="input w-full outline-none focus:border-2 focus:border-primary"
            />
            {errors.dateOfBirth && (
              <p className="text-error text-sm mt-1">
                Date of Birth is required
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true, minLength: 6 })}
                placeholder="••••••••"
                className="input w-full pr-12 outline-none focus:border-2 focus:border-primary"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 z-50"
              >
                {showPassword ? <IoEye /> : <IoEyeOff />}
              </span>
            </div>
            {errors.password && (
              <p className="text-error text-sm mt-1">
                Minimum 6 characters required
              </p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary text-black w-full mt-2"
          >
            Register
          </button>
        </form>

        {/* Link */}
        <p className="text-center text-sm font-medium text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
