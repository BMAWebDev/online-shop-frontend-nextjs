// Types
import { CSSProperties, ReactElement } from "react";

interface IProps {
  type?: "button" | "submit" | "reset";
  buttonType?: "danger" | "success";
  isSmall?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  disabled?: boolean;
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
  style,
  disabled,
  children,
}: IProps): ReactElement {
  return (
    <button
      className={cs(
        s.button,
        buttonType == "danger" ? s.buttonDanger : "",
        buttonType == "success" ? s.buttonSuccess : "",
        isSmall ? s.buttonSmall : ""
      )}
      type={type ?? "button"}
      onClick={onClick}
      style={style}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
