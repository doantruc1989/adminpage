import axios from "axios";

const config = {
  baseURL: "http://localhost:3006/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosAll = axios.create(config);

export default axiosAll;
