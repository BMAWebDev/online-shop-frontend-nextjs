import axios from 'axios';

const Axios = axios.create({
  baseURL: process.env.SERVER_URL + '/',
  withCredentials: false,
  timeout: 4000,
  headers: {
    'Content-Type': 'application/json',
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
