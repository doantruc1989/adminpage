import axios from "axios";

const config = {
  baseURL: "https://quocson.fatcatweb.top/",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const axiosAll = axios.create(config);

export default axiosAll;
