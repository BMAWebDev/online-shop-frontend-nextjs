import { StaffRole, Role } from "src/types";

export const isStaff = (role: Role): role is StaffRole => {
  if (role && role !== "customer") return true;

  return false;
};
