import React from "react";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";

const EmployeeRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <p>Loading...</p>;
  }

  if (role !== "employee") {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Forbidden Access</h1>
      </div>
    );
  }

  return children;
};

export default EmployeeRoute;
