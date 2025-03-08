import axios from "axios";

const API = axios.create({
  baseURL: "https://sheetsdash-backend.onrender.com/api",

  withCredentials: true,
});

export default API;
