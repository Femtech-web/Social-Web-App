import axios from "axios";

const BASE_URL = 'http://localhost:5000/api'
const parsedToken =  JSON.parse(localStorage.getItem('user'))?.token;

const privateRequest = axios.create({
    baseURL: BASE_URL,
    headers: {token: `Bearer ${parsedToken}`},
})

const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export { privateRequest, publicRequest };