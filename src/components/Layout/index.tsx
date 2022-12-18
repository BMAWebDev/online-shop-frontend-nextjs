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

export default function Layout({
  children,
  isPrivate = false,
}: IProps): ReactElement {
  return (
    <div id={cs(s.layout)}>
      <Header />

      <main className="page-content">{children}</main>

      <Footer />
    </div>
  );
}
