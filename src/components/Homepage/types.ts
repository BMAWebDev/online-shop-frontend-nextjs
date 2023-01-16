import { IProduct } from "src/types";

export interface IAnalyticsProps {
  registered_accounts: number;
  total_orders: number;
  finished_orders: number;
}

export interface IProps {
  latestProducts: IProduct[];
  analytics: IAnalyticsProps;
}
