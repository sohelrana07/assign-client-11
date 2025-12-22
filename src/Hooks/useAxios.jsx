import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://assign-server-11.vercel.app",
});

const useAxios = () => {
  return axiosInstance;
};

export default useAxios;
