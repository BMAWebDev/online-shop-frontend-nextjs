// Modules
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

// Functions
import { verifyUser } from "src/functions";

// Styles
import cs from "classnames";
import s from "./style.module.scss";

export default function Message() {
  const router = useRouter();

  const [statusMessage, setStatusMessage] = useState<string>("");

  useEffect(() => {
    if (router.query.code) {
      verifyUser({ code: router.query.code })
        .then((res: any) => {
          setStatusMessage(res.message);
        })
        .catch((err) => {
          setStatusMessage(err.message);
        });
    }
  }, [router.query.code]);

  return (
    <div className={cs(s.message)}>
      <p>{statusMessage}</p>

      <Link href="/" passHref={true}>
        <p className={cs(s.goHomeBtn)}>Go home</p>
      </Link>
    </div>
  );
}
