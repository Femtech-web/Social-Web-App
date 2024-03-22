import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const privateRequest = axios.create({
  baseURL: BASE_URL,
});

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.interceptors.request.use((req) => {
  if (localStorage.getItem("bible-user")) {
    const token = JSON.parse(localStorage.getItem("bible-user")).token;
    req.headers.authorization = `Bearer ${token}`;
  }

  return req;
});

export { privateRequest, publicRequest };
