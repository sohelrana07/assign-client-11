import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (data) => {
    console.log("Login Data:", data);

    // Sign In
    signInUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login successful! Welcome back.");
        setTimeout(() => {
          navigate("/");
        }, 1200);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <title>AssetVerse | Login</title>
      <div className="w-full bg-base-100 p-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Login to your account
          </h1>
          <p className="text-xs md:text-sm text-gray-500 mt-2">
            Access your AssetVerse account
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
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
            className="btn btn-primary w-full text-black mt-2"
          >
            Login
          </button>
        </form>

        {/* Link */}
        <p className="text-center text-sm font-medium text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-bold hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
