import { Navigate } from "react-router";
import useRole from "../../Hooks/useRole";
import Loading from "../Loading/Loading";

const DashboardIndexRedirect = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading />;
  }

  if (role === "hr") {
    return <Navigate to="assets" replace />;
  }

  if (role === "employee") {
    return <Navigate to="my-assets" replace />;
  }

  return <Navigate to="/" replace />;
};

export default DashboardIndexRedirect;
