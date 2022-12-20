import { ReactElement } from "react";

import Link from "next/link";
import Image from "next/image";

// Styles
import cs from "classnames";
import s from "./style.module.scss";

export default function Logo(): ReactElement {
  return (
    <Link href="/" passHref={true}>
      <Image
        src="/img/logo.png"
        className={cs(s.logo)}
        width={250}
        height={100}
        alt=""
        priority
      />
    </Link>
  );
}
