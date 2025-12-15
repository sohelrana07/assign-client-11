import React from "react";
import { Link, Outlet } from "react-router";
import { AiOutlineAppstore, AiOutlineProfile } from "react-icons/ai";
import { MdAddBox, MdManageAccounts } from "react-icons/md";
import { FaUsers, FaFileInvoiceDollar } from "react-icons/fa";
import { TbHexagonLetterA } from "react-icons/tb";
import useRole from "../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-[1440px] mx-auto bg-gray-200/90">
      <title>AssetVerse | Dashboard</title>
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar w-full bg-base-100 sticky top-0 z-10">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
          <div className="px-4">
            <Link
              to="/"
              title="Click to home"
              className="flex items-center gap-1 select-none"
            >
              <TbHexagonLetterA size={32} className="text-primary" />
              <h1 className="text-2xl font-bold tracking-wide">
                Asset<span className="text-secondary">Verse</span>
              </h1>
            </Link>
          </div>
        </nav>

        {/* Page content */}
        <div className="p-6 md:p-12">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-100 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow z-50">
            {/* Common Link */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Homepage"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="currentColor"
                  className="my-1.5 inline-block size-4"
                >
                  <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                  <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                </svg>
                <Link to="/" className="is-drawer-close:hidden">
                  Homepage
                </Link>
              </button>
            </li>

            {/* Employee Links */}
            {role === "employee" && (
              <>
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Assets"
                  >
                    <AiOutlineAppstore size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/my-assets"
                    >
                      My Assets
                    </Link>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Request Asset"
                  >
                    <MdAddBox size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/request-asset"
                    >
                      Request Asset
                    </Link>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="My Team"
                  >
                    <FaUsers size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/my-team"
                    >
                      My Team
                    </Link>
                  </button>
                </li>
              </>
            )}

            {/* HR Manager Links */}
            {role === "hr" && (
              <>
                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Asset List"
                  >
                    <AiOutlineAppstore size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/assets"
                    >
                      Asset List
                    </Link>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Add Asset"
                  >
                    <MdAddBox size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/add-asset"
                    >
                      Add Asset
                    </Link>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="All Requests"
                  >
                    <MdManageAccounts size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/requests"
                    >
                      All Requests
                    </Link>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Employee List"
                  >
                    <FaUsers size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/employees"
                    >
                      Employee List
                    </Link>
                  </button>
                </li>

                <li>
                  <button
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Upgrade Package"
                  >
                    <FaFileInvoiceDollar size={18} className="inline-block" />
                    <Link
                      className="is-drawer-close:hidden"
                      to="/dashboard/package"
                    >
                      Upgrade Package
                    </Link>
                  </button>
                </li>
              </>
            )}

            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Profile"
              >
                <AiOutlineProfile size={18} className="inline-block" />
                <Link
                  className="is-drawer-close:hidden"
                  to="/dashboard/profile"
                >
                  Profile
                </Link>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
