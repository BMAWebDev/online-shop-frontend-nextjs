// Types
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { IOrder } from "src/types";

interface IProps {
  orders: IOrder[];
}

// Auth
import { checkAuth } from "src/auth";

// Modules
import Chart from "chart.js/auto";
import { useEffect } from "react";

// Functions
import { getOrdersAnalytics } from "src/functions";

const getDateLabels = (_orders: IOrder[]): string[] => {
  const dates: string[] = [];

  _orders.forEach((_o) => {
    const date = _o.created_at.split("T")[0].split("-").reverse().join(".");

    if (!dates.includes(date)) dates.push(date);
  });

  return dates;
};

const getChartData = (
  _orders: IOrder[]
): { labels: string[]; data: number[] } => {
  const labels = getDateLabels(_orders);
  const data: number[] = [];

  labels.forEach((date) => {
    data.push(
      _orders.filter(
        (o) =>
          o.created_at.split("T")[0].split("-").reverse().join(".") === date
      ).length
    );
  });

  return { labels, data };
};

export default function Admin({ orders }: IProps): ReactElement {
  let chart: any = null;

  useEffect(() => {
    if (typeof window !== "undefined" && !chart) {
      const { labels, data } = getChartData(orders);

      chart = new Chart("current-month-order-stats", {
        type: "bar",
        data: {
          datasets: [
            {
              data,
            },
          ],
          labels,
        },
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      });
    }
  }, [chart]);

  return (
    <>
      <p>Welcome to the admin dashboard page, hope you like it here!</p>

      <h2>Current month number of orders:</h2>
      <canvas id="current-month-order-stats"></canvas>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await checkAuth(context);
  const { redirect, props } = res as any;

  if (redirect) return { redirect };

  const ordersStatsRes: any = await getOrdersAnalytics();
  props.orders = ordersStatsRes.orders;

  return { props };
};
