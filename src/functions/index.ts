// Auth
import { register, login, verifyUser } from "./auth";

// Requests
import {
  getUser,
  getProducts,
  getCategories,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getCategory,
  getProduct,
  updateCategory,
  updateProduct,
} from "./requests";

// Helpers
import { isStaff, getTokenFromCookie } from "./helpers";

export {
  register,
  login,
  verifyUser,
  getUser,
  isStaff,
  getTokenFromCookie,
  getCategories,
  getProducts,
  createCategory,
  createProduct,
  deleteCategory,
  deleteProduct,
  getCategory,
  getProduct,
  updateCategory,
  updateProduct,
};
