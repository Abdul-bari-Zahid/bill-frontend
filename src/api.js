import axios from "axios";

export const API = axios.create({
  baseURL: "https://ai-doc-ser.vercel.app/", // backend URL
  withCredentials: true, // JWT cookie
});
