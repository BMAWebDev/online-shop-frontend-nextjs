import { StaffRole, Role } from "src/types";
import { ICartStoreProps } from "src/store/cart";

export const isStaff = (role: Role): role is StaffRole => {
  if (role && role !== "customer") return true;

  return false;
};

export const getTokenFromCookie = (cookie: string): string => {
  return cookie.split("=")[1];
};

export const getDate = (_isostring: string): string => {
  if (!_isostring) return "N/A";

  return _isostring.split("T")[0].split("-").reverse().join(".");
};

export const calculateCartPrice = (cart: ICartStoreProps): string => {
  let totalProductsPrice = 0;
  cart.products.forEach((product) => {
    totalProductsPrice += product.quantity * product.full_product.price;
  });

  return totalProductsPrice.toFixed(2);
};
