import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: "https://assign-server-11.vercel.app",
});
const useAxiosSecure = () => {
  const { logOutUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // reqInterceptor
    const reqInterceptor = axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    });

    // resInterceptor
    const resInterceptor = axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          logOutUser()
            .then(() => {
              navigate("/login");
            })
            .catch((error) => {
              console.log(error.message);
            });
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [logOutUser, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
