// Types
import { IAnalyticsProps } from "../types";
import { ReactElement } from "react";

// Styles
import cs from "classnames";
import s from "src/components/Homepage/style.module.scss";

export default function Analytics({
  registered_accounts,
  total_orders,
  finished_orders,
}: IAnalyticsProps): ReactElement {
  return (
    <div className={cs(s.analytics, "container")}>
      <div className="row">
        <h2>
          Analytics{" "}
          <span style={{ fontSize: "12px" }}>(static data available)</span>
        </h2>
      </div>

      <div className="row">
        <div className="col-lg-4">
          <h3>Registered accounts:</h3>
          <p>{registered_accounts}</p>
        </div>

        <div className="col-lg-4">
          <h3>Orders placed:</h3>
          <p>{total_orders}</p>
        </div>

        <div className="col-lg-4">
          <h3>Orders completed:</h3>
          <p>{finished_orders}</p>
        </div>
      </div>
    </div>
  );
}
