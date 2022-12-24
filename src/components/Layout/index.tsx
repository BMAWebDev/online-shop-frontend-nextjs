// Types
import { ReactElement } from "react";
interface IProps {
  children: JSX.Element; // content of the page
  isPrivate?: boolean; // detect whether the page is staff/admin only or not
}

// Components
import Header from "./Header";
import Footer from "./Footer";

// Styles
import cs from "classnames";
import s from "./style.module.scss";

// Modules
import { useRouter } from "next/router";

export default function Layout({
  children,
  isPrivate = false,
}: IProps): ReactElement {
  const router = useRouter();

  const verticalCenterRoutes = ["/verify-user"];

  /**
   * @Docs Checks if the current route should have margin-top: auto
   */
  const verticalCenterStyle = (): boolean => {
    let isValid = false;

    verticalCenterRoutes.forEach((bypassedRoute) => {
      if (router.pathname.includes(bypassedRoute)) isValid = true;
    });

    return isValid;
  };

  return (
    <div id={cs(s.layout)}>
      <Header isPrivate={isPrivate} />

      <main
        className="page-content"
        style={{ marginTop: verticalCenterStyle() ? "auto" : "inherit" }}
      >
        {children}
      </main>

      {!isPrivate && <Footer />}
    </div>
  );
}
