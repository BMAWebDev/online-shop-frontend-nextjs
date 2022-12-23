import axios from "axios";

const backendURL =
  process.env.NODE_ENV == "production"
    ? process.env.SERVER_URL
    : "http://localhost:9000/";

const Axios = axios.create({
  baseURL: backendURL,
  withCredentials: false,
  timeout: 4000,
  headers: {
    "Content-Type": "application/json",
  },
});

const success = (res: any) => {
  return res.data;
};

const error = async (err: any) => {
  throw err.response.data;
};

Axios.interceptors.response.use(success, error);

export default Axios;
