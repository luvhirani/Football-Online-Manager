import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001",
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.code === "INVALID_TOKEN"
    ) {
      toast.error("Session expired, please log in again.");

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
