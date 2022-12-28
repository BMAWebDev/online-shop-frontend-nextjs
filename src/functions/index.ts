// Auth
import { register, login, verifyUser } from "./auth";

// Requests
import {
  getUser,
  getProducts,
  getCategories,
  createCategory,
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
};
