// Types
import { ReactElement } from "react";

// Styles
import cs from "classnames";
import s from "./style.module.scss";

// Modules
import Image from "next/image";
import Link from "next/link";

// Components
import Logo from "../Logo";

// Settings
import config from "src/config";

export default function Footer(): ReactElement {
  const usefulLinks = [
    {
      extern: true,
      href: "https://anpc.ro/",
      name: "ANPC",
    },
    {
      extern: false,
      href: "/privacy-policy",
      name: "Privacy Policy",
    },
    {
      extern: false,
      href: "/terms-and-conditions",
      name: "Terms and conditions",
    },
  ];

  return (
    <footer className={cs(s.footer)}>
      <div className="container">
        <div className="row text-center">
          <div className="col-lg-4">
            <Logo />
          </div>

          <div className="col-lg-4">
            <p className={cs(s.columnHeadline)}>Sitemap</p>

            <ul className={cs(s.sitemap)}>
              {config.pages.map((page, index) => {
                return (
                  <Link key={index} href={page.href} passHref={true}>
                    <li>{page.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>

          <div className="col-lg-4">
            <p className={cs(s.columnHeadline)}>Useful links</p>

            <ul className={cs(s.sitemap)}>
              {usefulLinks.map((link, index) => {
                return link.extern ? (
                  <li key={index}>
                    <a href={link.href} target="_blank" rel="noreferrer">
                      {link.name}
                    </a>
                  </li>
                ) : (
                  <Link key={index} href={link.href} passHref={true}>
                    <li>{link.name}</li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
