import React from "react";
import { Outlet } from "react-router";
import Logo from "../Components/Logo/Logo";
import welcomeImg from "../assets/Hello.svg";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Logo */}
      <header className="absolute top-6 left-10 z-50">
        <Logo />
      </header>

      <div className="flex min-h-screen">
        {/* Left side */}
        <div className="hidden md:flex w-1/2 bg-primary/8 items-center justify-center">
          <img
            src={welcomeImg}
            alt="Welcome Illustration"
            className="max-w-lg w-full"
          />
        </div>

        {/* Right side */}
        <div className="w-full md:w-1/2 flex items-center justify-center px-4">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Toast */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AuthLayout;
