import axios from 'src/lib/axios';

export const register = async (data: any) => {
  return await axios.post('register', data);
};

export const verifyUser = async (data: any) => {
  return await axios.post('verify-user', data);
};
