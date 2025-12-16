import { createBrowserRouter, Navigate } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ErrorPage from "../Components/ErrorPage/ErrorPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import DashboardIndexRedirect from "../Components/DashboardIndexRedirect/DashboardIndexRedirect";
import AddAsset from "../Pages/Dashboard/Hr/AddAsset/AddAsset";
import RequestAsset from "../Pages/Dashboard/Employee/RequestAsset/RequestAsset";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        Component: Home,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardIndexRedirect />,
      },
      // HR Routes
      {
        path: "assets",
        // element: <AssetList />,
      },
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "requests",
        // element: <Requests />,
      },
      {
        path: "employees",
        // element: <Employees />,
      },
      {
        path: "package",
        // element: <UpgradePackage />,
      },

      // Employee Routes
      {
        path: "my-assets",
        // element: <MyAssets />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "my-team",
        // element: <MyTeam />,
      },

      // Shared Route
      {
        path: "profile",
        // element: <Profile />,
      },
    ],
  },
]);

export default router;
