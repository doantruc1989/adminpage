import axios from "axios";

const token = localStorage.hasOwnProperty("user")
  ? JSON.parse(localStorage.getItem("user")).access_token
  : "";
const instance = axios.create({
  baseURL: "http://localhost:3006/",
  headers: { Authorization: `Bearer ${token}` },
});

export default instance;
