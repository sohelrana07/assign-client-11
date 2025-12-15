// DashboardIndexRedirect.jsx
import { Navigate } from "react-router";
import useRole from "../../Hooks/useRole";

const DashboardIndexRedirect = () => {
  const { role } = useRole();

  if (role === "hr") return <Navigate to="assets" replace />;
  return <Navigate to="my-assets" replace />;
};

export default DashboardIndexRedirect;
