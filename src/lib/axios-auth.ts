import axios from "axios";
import Cookies from "universal-cookie/cjs/Cookies";

const Axios = axios.create({
  baseURL: process.env.SERVER_URL + "/",
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
  const token = new Cookies().get("access-token");

  req.headers.authorization = `Bearer ${token}`;

  return req;
};

Axios.interceptors.request.use(bearerToken);
Axios.interceptors.response.use(success, error);

export default Axios;
