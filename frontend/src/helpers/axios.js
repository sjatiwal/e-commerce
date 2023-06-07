import axios from "axios";

const backend = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3330",
});

export default backend;
