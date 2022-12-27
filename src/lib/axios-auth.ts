import axios from "axios";
import { getCookie } from "cookies-next";

const backendURL =
  process.env.NODE_ENV == "production"
    ? process.env.SERVER_URL
    : "http://localhost:9000/";

const Axios = axios.create({
  baseURL: backendURL,
  withCredentials: true,
  timeout: 4000,
});

const success = (res: any) => {
  return res.data;
};

const error = async (err: any) => {
  throw err.response.data;
};

const bearerToken = (req: any) => {
  let token = getCookie("access-token");

  if (!token && req.data.token) token = req.data.token;

  req.headers.authorization = `Bearer ${token}`;

  return req;
};

Axios.interceptors.request.use(bearerToken);
Axios.interceptors.response.use(success, error);

export default Axios;
