import React from "react";
import { TbHexagonLetterA } from "react-icons/tb";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOutUser } = useAuth();
  const navigate = useNavigate();

  // logOut
  const handleLogOut = () => {
    logOutUser()
      .then(() => {
        toast.success("Sign-out successful");
        navigate("/login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // Active style
  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-secondary font-semibold border-b-2 border-secondary pb-1"
      : "hover:text-primary transition";

  // Navigation links
  const links = (
    <>
      <li>
        <NavLink className={navLinkStyle} to="/">
          Home
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink className={navLinkStyle} to="/dashboard">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="navbar bg-base-100 shadow-xs backdrop-blur-sm bg-opacity-50">
      <div className="max-w-[1440px] w-full mx-auto lg:px-6 flex justify-between items-center h-16">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 select-none">
            <TbHexagonLetterA size={42} className="text-primary" />
            <h1 className="text-2xl md:text-3xl font-bold tracking-wide">
              Asset<span className="text-secondary">Verse</span>
            </h1>
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="navbar-center hidden lg:flex gap-6 items-center font-medium">
          {links}
        </ul>

        {/* Profile & Button */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="relative w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photoURL ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTdZViE66j-NjGxox1Yz2JCNB7cP_byawE3w&s"
                    }
                    alt="avatar"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1.5 w-4 h-4 bg-green-600 rounded-full border-2 border-white animate-pulse"></div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/dashboard/profile">Profile</Link>
                </li>
                <li>
                  <button type="button" onClick={handleLogOut}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/register"
                className="btn btn-outline btn-secondary md:hidden"
              >
                Join Now
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-secondary hidden md:flex"
              >
                Join as Employee
              </Link>
              <Link
                to="/register"
                className="btn bg-secondary text-white hover:opacity-90 hidden md:flex"
              >
                Join as HR Manager
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
