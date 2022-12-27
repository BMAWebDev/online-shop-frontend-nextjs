// Types
import { CSSProperties, ReactElement } from "react";

interface IProps {
  type?: "button" | "submit" | "reset";
  buttonType?: "danger" | "alert";
  isSmall?: boolean;
  onClick?: () => void;
  style?: CSSProperties;
  children: string;
}

// Styles
import cs from "classnames";
import s from "./style.module.scss";
import { StyledJsxStyleRegistry } from "styled-jsx";

export default function Button({
  type,
  buttonType,
  isSmall,
  onClick,
  style,
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
      style={style}
    >
      {children}
    </button>
  );
}
