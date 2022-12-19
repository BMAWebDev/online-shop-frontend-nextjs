// Types
import { ReactElement } from "react";
type DropdownMenus = "account" | "cart" | "products";

// Styles
import cs from "classnames";
import s from "./style.module.scss";

// Modules
import { useRouter } from "next/router";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Field, Form } from "formik";

// Models
import { loginModel, loginInitialValues } from "src/models";

export default function Header(): ReactElement {
  const [selectedDropdown, setSelectedDropdown] = useState<DropdownMenus | "">(
    ""
  );

  const router = useRouter();

  // blacklist means where not to show the specific element, in our case the second line
  const routesBlacklist = ["/register", "/login"];
  const isSecondLineValid = (): boolean => {
    if (routesBlacklist.includes(router.route)) return false;

    return true;
  };

  const productsCategories = [
    {
      name: "Articole de gradinarit",
      slug: "articole-de-gradinarit",
      id: 0,
    },
    {
      name: "Teste de dev",
      slug: "teste-de-dev",
      id: 1,
    },
    {
      name: "Test123",
      slug: "test123",
      id: 2,
    },
  ];

  return (
    <header className={cs(s.header)}>
      <div
        className={cs(
          s.firstLine,
          "d-flex align-items-center justify-content-between"
        )}
      >
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

        <div className={cs(s.myDetails, "d-flex")}>
          <div
            className={cs(s.myDetailsElement, "d-flex align-items-center")}
            onClick={() =>
              setSelectedDropdown(selectedDropdown == "cart" ? "" : "cart")
            }
          >
            <Image
              src="/img/icons/shopping-cart.png"
              alt=""
              width={32}
              height={32}
            />

            <p className={cs(s.hideMobile)}>My cart</p>

            <Image
              src="/img/icons/arrow-down.svg"
              alt=""
              width={16}
              height={16}
              className={cs(
                s.hideMobile,
                selectedDropdown == "cart" ? "rotate-180" : ""
              )}
            />

            {selectedDropdown == "cart" && (
              <div
                className={cs(s.cartDropdown, s.menuDropdown)}
                onClick={(e) => e.stopPropagation()}
              >
                Your cart is currently empty.{" "}
                <Link href="/products" passHref={true}>
                  <span
                    style={{
                      color: "cyan",
                      textDecoration: "underline",
                    }}
                  >
                    Click here
                  </span>
                </Link>{" "}
                to see the products available.
              </div>
            )}
          </div>

          <div
            className={cs(s.myDetailsElement, "d-flex align-items-center")}
            onClick={() =>
              setSelectedDropdown(
                selectedDropdown == "account" ? "" : "account"
              )
            }
          >
            <Image
              src="/img/icons/my-account.png"
              alt=""
              width={32}
              height={32}
              style={{ filter: "invert(1)" }}
            />

            <p className={cs(s.hideMobile)}>My account</p>

            <Image
              src="/img/icons/arrow-down.svg"
              alt=""
              width={16}
              height={16}
              className={cs(
                s.hideMobile,
                selectedDropdown == "account" ? "rotate-180" : ""
              )}
            />

            {selectedDropdown == "account" && (
              <div
                className={cs(s.accountDropdown, s.menuDropdown)}
                onClick={(e) => e.stopPropagation()}
              >
                <Formik
                  initialValues={loginInitialValues}
                  onSubmit={(values) => {
                    console.log(values);
                  }}
                  validationSchema={loginModel}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <label htmlFor="email">Email address: </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={cs(s.formInput)}
                      />
                      {errors.email && touched.email ? (
                        <p className="error">{errors.email}</p>
                      ) : null}

                      <label htmlFor="password">Password: </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className={cs(s.formInput)}
                      />
                      {errors.password && touched.password ? (
                        <p className="error">{errors.password}</p>
                      ) : null}

                      <div
                        className={cs(s.buttonsContainer, "d-flex flex-column")}
                      >
                        <button type="submit" className={cs(s.loginBtn)}>
                          Login
                        </button>

                        <p>
                          Don&apos;t have an account?{" "}
                          <Link
                            href="/register"
                            passHref={true}
                            onClick={() => setSelectedDropdown("")}
                          >
                            <span
                              style={{
                                color: "cyan",
                                textDecoration: "underline",
                              }}
                            >
                              Click here
                            </span>
                          </Link>{" "}
                          to register.
                        </p>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            )}
          </div>
        </div>
      </div>

      {isSecondLineValid() && (
        <div className={cs(s.secondLine, "d-flex align-items-center")}>
          <div
            className={cs(
              s.cardElement,
              selectedDropdown == "products" ||
                router.route.includes("/products")
                ? s.active
                : ""
            )}
            onClick={() =>
              setSelectedDropdown(
                selectedDropdown == "products" ? "" : "products"
              )
            }
          >
            <Image
              src="/img/icons/menu-icon.svg"
              width={15}
              height={15}
              alt=""
            />
            <span>Products</span>

            {selectedDropdown == "products" && (
              <ul
                className={cs(s.productsDropdown, s.menuDropdown)}
                onClick={(e) => e.stopPropagation()}
              >
                {productsCategories.map((category) => {
                  return (
                    <Link
                      passHref={true}
                      href={`/products?cat=${category.slug}`}
                      as="/products"
                      key={category.id}
                    >
                      <li className={cs(s.productsDropdownElement)}>
                        {category.name}
                      </li>
                    </Link>
                  );
                })}

                <Link passHref={true} href="/products">
                  <li
                    className={cs(s.productsDropdownElement, s.viewAllProducts)}
                  >
                    View all products
                  </li>
                </Link>
              </ul>
            )}
          </div>

          <Link href="/contact" passHref={true}>
            <p
              className={cs(
                s.cardElement,
                router.route.includes("/contact") ? s.active : ""
              )}
            >
              Contact
            </p>
          </Link>

          <Link href="/app-description.pdf" passHref={true}>
            <p className={cs(s.cardElement)}>About us</p>
          </Link>
        </div>
      )}
    </header>
  );
}
