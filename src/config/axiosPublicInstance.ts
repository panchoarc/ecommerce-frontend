import axios from "axios";

const publicInstance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_API_URL}/api`,
  headers: {
    "Allow-Control-Allow-Origin": `${import.meta.env.VITE_BACKEND_API_URL}`,
  },
});

export default publicInstance;
