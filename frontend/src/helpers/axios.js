import axios from "axios";

const backend = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3331",
});

export default backend;
