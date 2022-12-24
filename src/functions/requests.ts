import { axiosAuth } from "src/lib";

export const getUser = async (id: number) => {
  return await axiosAuth.get(`users/${id}`);
};
