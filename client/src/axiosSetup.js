import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const privateRequest = axios.create({
  baseURL: BASE_URL,
});

const publicRequest = axios.create({
  baseURL: BASE_URL,
});

privateRequest.interceptors.request.use((req) => {
  if (localStorage.getItem("user")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("user")).token
    }`;
  }

  return req;
});

export { privateRequest, publicRequest };
