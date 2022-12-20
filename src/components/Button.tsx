// Types
import { ReactElement } from "react";

interface IProps {
  type?: "button" | "submit" | "reset";
  children: string;
}

// Styles
import cs from "classnames";
import s from "./style.module.scss";

export default function Button({ type, children }: IProps): ReactElement {
  return (
    <button className={cs(s.button)} type={type ?? "button"}>
      {children}
    </button>
  );
}
