import { axiosAuth } from "src/lib";

/**
 * @Docs Read one user.
 *
 * @param {number} id user id
 * @param {string} accessToken optional, present if request was made on server, where you can't normally access the cookie
 */
export const getUser = async (id: number, accessToken?: string) => {
  return await axiosAuth.get(`users/${id}`, {
    data: {
      token: accessToken ? accessToken : null,
    },
  });
};
