// Types
import { ReactElement } from "react";

// Components
import { Message } from "src/components/VerifyUser";

// Styles
import cs from "classnames";
import s from "src/components/VerifyUser/style.module.scss";

export default function VerifyUser(): ReactElement {
  return (
    <div id={cs(s.pageVerifyUser)} className="container">
      <Message />
    </div>
  );
}
