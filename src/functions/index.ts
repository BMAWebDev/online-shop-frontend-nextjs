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
  createOrder,
  createContactMessage,
} from "./requests";

// Helpers
import {
  isStaff,
  getTokenFromCookie,
  getDate,
  calculateCartPrice,
} from "./helpers";

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
  getDate,
  calculateCartPrice,
  createOrder,
  createContactMessage,
};
