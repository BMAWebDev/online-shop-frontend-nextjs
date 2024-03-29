export type Role = "customer" | "editor" | "admin" | "ceo";
export type StaffRole = "editor" | "admin" | "ceo";
export type PublishStatus = "draft" | "live";

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
  publish_status: PublishStatus;
  created_at: string;
  total_products: number;
}

export interface IProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: number;
  stock_qty: number;
  category_id: number;
  publish_status: PublishStatus;
  created_at: string;
}

export interface ICartProduct {
  id: number;
  quantity: number;
  full_product: IProduct;
}

export interface IOrder {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  address: string;
  price_products: number;
  price_taxes: number;
  price_total: number;
  status: string;
  shipping_method: string;
  payment_method: string;
  customer_id?: number;
  created_at: string;
}
