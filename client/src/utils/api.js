import axios from "axios";

const API = axios.create({
  

  baseURL: "http://localhost:6771/api", // for development

  withCredentials: true,
});

export default API;