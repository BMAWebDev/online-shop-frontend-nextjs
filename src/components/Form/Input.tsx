// Types
import { ReactElement } from "react";

interface IProps {
  name: string;
  type?: string;
}

// Modules
import { Field } from "formik";

export default function Input({ name, type }: IProps): ReactElement {
  return <Field type={type ?? "text"} id={name} name={name} />;
}
