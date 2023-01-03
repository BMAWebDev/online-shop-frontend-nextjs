import { StaffRole, Role } from "src/types";

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
