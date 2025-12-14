import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRole = () => {
  const { user } = useAuth();
  const axiosInstance = useAxios();

  const { isLoading: roleLoading, data: role = "employee" } = useQuery({
    queryKey: ["user-role", user.email],
    queryFn: async () => {
      const res = await axiosInstance.get(`/users/${user?.email}/role`);
      return res.data?.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
