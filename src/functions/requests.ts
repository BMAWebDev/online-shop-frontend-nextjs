import { axiosAuth, axios } from "src/lib";

import { ICartProduct, PublishStatus } from "src/types";

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
 * @param {string} accessToken optional, present if request was made on server, where you can't normally access the cookie. Pass access token if you want to make a request as an admin (for dashboard purposes)
 */
export const getProducts = async (accessToken?: string) => {
  if (accessToken)
    return await axiosAuth.get("products", {
      data: {
        token: accessToken,
      },
    });

  return await axios.get("products");
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

/**
 * @Docs Get category.
 *
 * @param {number} category_id
 * @param {string} accessToken optional, present if request was made on server, where you can't normally access the cookie
 */
export const getCategory = async (
  category_id: number,
  accessToken?: string
) => {
  return await axiosAuth.get(`categories/${category_id}`, {
    data: {
      token: accessToken ? accessToken : null,
    },
  });
};

interface IGetProduct {
  product_id?: number;
  product_slug?: string;
}

/**
 * @Docs Get product. One parameter is optional
 *
 * @param {IGetProduct} data
 * @param {string} accessToken optional, present if request was made on server, where you can't normally access the cookie
 */
export const getProduct = async (data: IGetProduct, accessToken?: string) => {
  const { product_id, product_slug } = data;

  return await axios.get(`products/${product_id}`, {
    params: {
      slug: product_slug,
    },
    data: {
      token: accessToken ? accessToken : null,
    },
  });
};

/**
 * @Docs Update category.
 *
 * @param {number} category_id
 * @param {ICategoryData} data
 */
export const updateCategory = async (
  category_id: number,
  data: ICategoryData
) => {
  return await axiosAuth.patch(`categories/${category_id}`, data);
};

/**
 * @Docs Update product.
 *
 * @param {number} product_id
 * @param {IProductData} data
 */
export const updateProduct = async (product_id: number, data: IProductData) => {
  return await axiosAuth.patch(`products/${product_id}`, data);
};

interface IOrderData {
  last_name: string;
  first_name: string;
  email: string;
  address: string;
  shipping_method: string;
  payment_method: "credit card" | "debit card" | "cash on delivery";
  products: ICartProduct[];
  user_id?: number;
}
/**
 * @Docs Create order.
 *
 * @param {IProductData} data
 */
export const createOrder = async (data: IOrderData) => {
  return await axios.post("orders/create", data);
};

interface IContactMessageData {
  last_name: string;
  first_name: string;
  email: string;
  message: string;
}
/**
 * @Docs Create order.
 *
 * @param {IProductData} data
 */
export const createContactMessage = async (data: IContactMessageData) => {
  return await axios.post("contact/create", data);
};
