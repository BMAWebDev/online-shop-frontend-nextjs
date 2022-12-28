export type Role = "customer" | "editor" | "admin" | "ceo";
export type StaffRole = "editor" | "admin" | "ceo";

export interface IUser {
  id: number;
  username?: string;
  email: string;
  role: Role;
  last_name: string;
  first_name: string;
  verification_code: string;
  verified: 0 | 1; // boolean, but mysql treats it as number
  created_at: string;
  verified_at?: string;
}

export interface IDecodedToken {
  email: string;
  id: number;
  iat: number;
  exp: number;
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
  publish_status: string;
  created_at: string;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock_qty: number;
  category_id: number;
  publish_status: string;
  created_at: string;
}
