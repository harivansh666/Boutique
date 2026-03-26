import axios from "axios";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:3000/api",
  baseURL: "https://boutique-five-ashy.vercel.app/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
