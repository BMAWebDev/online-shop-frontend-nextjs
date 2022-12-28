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

/**
 * @Docs Read all products.
 *
 * @param {string} accessToken optional, present if request was made on server, where you can't normally access the cookie
 */
export const getProducts = async (accessToken?: string) => {
  return await axiosAuth.get("products", {
    data: {
      token: accessToken ? accessToken : null,
    },
  });
};

/**
 * @Docs Read all categories.
 *
 * @param {string} accessToken optional, present if request was made on server, where you can't normally access the cookie
 */
export const getCategories = async (accessToken?: string) => {
  return await axiosAuth.get("categories", {
    data: {
      token: accessToken ? accessToken : null,
    },
  });
};

interface ICategoryData {
  name: string;
  slug: string;
  publish_status: string;
}

/**
 * @Docs Create category.
 *
 * @param {ICategoryData} data
 */
export const createCategory = async (data: ICategoryData) => {
  return await axiosAuth.post("categories/create", data);
};
