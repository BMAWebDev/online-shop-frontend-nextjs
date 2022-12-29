import { axiosAuth } from "src/lib";

import { PublishStatus } from "src/types";

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
  publish_status: PublishStatus;
}

/**
 * @Docs Create category.
 *
 * @param {ICategoryData} data
 */
export const createCategory = async (data: ICategoryData) => {
  return await axiosAuth.post("categories/create", data);
};

/**
 * @Docs Delete category.
 *
 * @param {number} category_id
 */
export const deleteCategory = async (category_id: number) => {
  return await axiosAuth.delete(`categories/${category_id}`);
};

interface IProductData {
  name: string;
  sku: string;
  price: number;
  stock_qty: number;
  slug: string;
  category_id: number;
  publish_status: PublishStatus;
}

/**
 * @Docs Create product.
 *
 * @param {IProductData} data
 */
export const createProduct = async (data: IProductData) => {
  return await axiosAuth.post("products/create", data);
};

/**
 * @Docs Delete product.
 *
 * @param {number} product_id
 */
export const deleteProduct = async (product_id: number) => {
  return await axiosAuth.delete(`products/${product_id}`);
};
