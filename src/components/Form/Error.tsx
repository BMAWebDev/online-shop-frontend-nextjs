// Types
import { ReactElement } from "react";

interface IProps {
  name: string;
  errors?: Record<string, string | undefined>;
  touched?: Record<string, boolean | undefined>;
}

export default function Error({
  name,
  errors,
  touched,
}: IProps): ReactElement | null {
  if (!errors || !touched) return null;

  return errors[name] && touched[name] ? (
    <p className="error">{errors[name]}</p>
  ) : null;
}
