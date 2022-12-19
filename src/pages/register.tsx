import { ReactElement } from "react";
import { RegisterForm } from "src/components/Register";

// Styles
import cs from "classnames";
import s from "src/components/Register/style.module.scss";

export default function Register(): ReactElement {
  return (
    <div id={cs(s.pageRegister)} className="container">
      <RegisterForm />
    </div>
  );
}
