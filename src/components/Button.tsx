// Types
import { ReactElement } from "react";

interface IProps {
  type?: "button" | "submit" | "reset";
  buttonType?: "danger" | "alert";
  isSmall?: boolean;
  onClick?: () => void;
  children: string;
}

// Styles
import cs from "classnames";
import s from "./style.module.scss";

export default function Button({
  type,
  buttonType,
  isSmall,
  onClick,
  children,
}: IProps): ReactElement {
  return (
    <button
      className={cs(
        s.button,
        buttonType == "danger" ? s.buttonDanger : "",
        isSmall ? s.buttonSmall : ""
      )}
      type={type ?? "button"}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
