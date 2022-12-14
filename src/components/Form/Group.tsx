// Types
import { ReactElement } from "react";

interface IProps {
  labelText: string;
  name: string;
  type?: string;
  errors?: Record<string, string | undefined>;
  touched?: Record<string, boolean | undefined>;
  className?: string;
  showInRow?: boolean;
}

// Modules
import { Field } from "formik";
import Error from "./Error";
import Label from "./Label";

// Styles
import cs from "classnames";
import s from "./style.module.scss";

export default function Group({
  labelText,
  name,
  type,
  errors,
  touched,
  className,
  showInRow,
}: IProps): ReactElement {
  return (
    <div
      className={cs(s.formGroup, `d-flex flex-${showInRow ? "row" : "column"}`)}
    >
      <Label name={name} labelText={labelText} />

      {type == "textarea" && (
        <Field
          component="textarea"
          rows="4"
          id={name}
          name={name}
          className={cs(s.input, className && `${className}`)}
          style={{ minHeight: "150px" }}
        />
      )}

      {type !== "textarea" && (
        <Field
          type={type ?? "text"}
          id={name}
          name={name}
          className={cs(s.input, className && `${className}`)}
        />
      )}

      <Error name={name} errors={errors} touched={touched} />
    </div>
  );
}
