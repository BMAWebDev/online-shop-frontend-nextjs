import { axios } from "src/lib";

interface IRegister {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export const register = async (data: IRegister) => {
  return await axios.post("register", data);
};

interface IVerifyUser {
  code: string;
}
export const verifyUser = async (data: IVerifyUser) => {
  return await axios.post("verify-user", data);
};

interface ILogin {
  email: string;
  password: string;
}
export const login = async (data: ILogin) => {
  return await axios.post("login", data);
};
