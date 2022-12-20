// Types
import { ReactElement } from "react";

interface IProps {
  name: string;
  labelText: string;
}

export default function Label({ name, labelText }: IProps): ReactElement {
  return <label htmlFor={name}>{labelText}</label>;
}
