// Types
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { IProps } from "src/components/Homepage/types";

// Functions
import { getProducts, getAnalytics } from "src/functions";

// Components
import { LatestProducts, Analytics } from "src/components/Homepage/components";
import { Spacer } from "src/components";

export default function Homepage({
  latestProducts,
  analytics,
}: IProps): ReactElement {
  const { registered_accounts, total_orders, finished_orders } = analytics;

  return (
    <>
      <LatestProducts latestProducts={latestProducts} />

      <Spacer />

      <Analytics
        registered_accounts={registered_accounts}
        total_orders={total_orders}
        finished_orders={finished_orders}
      />

      <Spacer />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const latestProductsRes: any = await getProducts(undefined, {
    limit: 3,
  });

  const { products } = latestProductsRes;

  const analyticsRes: any = await getAnalytics();
  const { analytics } = analyticsRes;

  return {
    props: {
      latestProducts: products,
      analytics,
    },
  };
};
