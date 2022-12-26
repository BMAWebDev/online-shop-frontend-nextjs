// Types
import { ReactElement } from "react";
import { IUser } from "src/types";
type DropdownMenus = "account" | "cart" | "products";

interface ILoginResponse {
  message: string;
  accessToken: string;
  user: IUser;
}

interface IProps {
  isPrivate?: boolean;
}

// Styles
import cs from "classnames";
import s from "./style.module.scss";
import "react-toastify/dist/ReactToastify.css";

// Components
import Logo from "../Logo";
import { Group } from "src/components/Form";

// Modules
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik, Form } from "formik";
import Cookies from "universal-cookie";

// Models
import { loginModel, loginInitialValues } from "src/models";

// Functions
import { login, isStaff } from "src/functions";
import { toast, ToastContainer } from "react-toastify";

// Store
import userStore from "src/store";

export default function Header({ isPrivate }: IProps): ReactElement {
  const [selectedDropdown, setSelectedDropdown] = useState<DropdownMenus | "">(
    ""
  );
  const [myAccountText, setMyAccountText] = useState<string>("My account");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<IUser | null>(null);

  const router = useRouter();
  const store = userStore();

  useEffect(() => {
    if (typeof window !== "undefined" && store.user) {
      setIsLoggedIn(true);

      setUser(store.user);

      setMyAccountText(
        `Hello, ${store.user.last_name} ${store.user.first_name}`
      );
    }
  }, [store]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      userStore.subscribe((state) => {
        if (state.user) {
          setIsLoggedIn(true);

          setUser(state.user);

          setMyAccountText(
            `Hello, ${state.user.last_name} ${state.user.first_name}`
          );
        } else {
          setIsLoggedIn(false);

          setUser(null);

          setMyAccountText("My account");
        }
      });
    }
  }, []);

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

  const defaultSecondLine = () => {
    return (
      <>
        <div
          className={cs(
            s.cardElement,
            selectedDropdown == "products" || router.route.includes("/products")
              ? s.active
              : ""
          )}
          onClick={() =>
            setSelectedDropdown(
              selectedDropdown == "products" ? "" : "products"
            )
          }
        >
          <Image src="/img/icons/menu-icon.svg" width={15} height={15} alt="" />
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
                    href={`/products?cat=${category.id}`}
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
      </>
    );
  };

  const privateSecondLine = () => {
    return (
      <>
        <div
          className={cs(
            s.cardElement,
            selectedDropdown == "products" ||
              router.route.includes("/admin/products")
              ? s.active
              : ""
          )}
          onClick={() =>
            setSelectedDropdown(
              selectedDropdown == "products" ? "" : "products"
            )
          }
        >
          <Image src="/img/icons/menu-icon.svg" width={15} height={15} alt="" />
          <span>Products</span>

          {selectedDropdown == "products" && (
            <ul
              className={cs(s.productsDropdown, s.menuDropdown)}
              onClick={(e) => e.stopPropagation()}
            >
              <Link passHref={true} href="/admin/products">
                <li className={cs(s.productsDropdownElement)}>
                  See all products
                </li>
              </Link>

              <Link passHref={true} href="/admin/categories">
                <li className={cs(s.productsDropdownElement)}>
                  See all categories
                </li>
              </Link>
            </ul>
          )}
        </div>
      </>
    );
  };

  const renderSecondLine = () => {
    return (
      <div className={cs(s.secondLine, "d-flex align-items-center")}>
        {(!isPrivate && defaultSecondLine()) ||
          (isPrivate && privateSecondLine())}
      </div>
    );
  };

  const logout = () => {
    const cookies = new Cookies();
    cookies.remove("access-token");

    store.setUser(null);
    setUser(null);

    toast.success("Successfully logged out.");
  };

  return (
    <header className={cs(s.header)}>
      <div
        className={cs(
          s.firstLine,
          "d-flex align-items-center justify-content-between"
        )}
      >
        <Logo />

        <div className={cs(s.myDetails, "d-flex")}>
          {!isPrivate && (
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
          )}

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

            <p className={cs(s.hideMobile)}>{myAccountText}</p>

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
                {(!isLoggedIn && (
                  <Formik
                    initialValues={loginInitialValues}
                    onSubmit={async (values) => {
                      try {
                        const loginRes = (await login(
                          values
                        )) as unknown as ILoginResponse;

                        // save the access token on cookie to be validated on the server requests, but the user on local storage for client manipulation
                        const cookies = new Cookies();
                        cookies.set("access-token", loginRes.accessToken, {
                          maxAge: 24 * 60 * 60, // cookie expires in: 1 day (60 = 1 minute)
                        });
                        store.setUser(loginRes.user);
                        setUser(loginRes.user);

                        toast.success(loginRes.message);
                      } catch (err: any) {
                        toast.error(err.message);
                      }
                    }}
                    validationSchema={loginModel}
                  >
                    {({ errors, touched }) => (
                      <Form>
                        <Group
                          labelText="Email address:"
                          name="email"
                          type="email"
                          errors={errors}
                          touched={touched}
                          className={cs(s.formInput)}
                        />

                        <Group
                          labelText="Password:"
                          name="password"
                          type="password"
                          errors={errors}
                          touched={touched}
                          className={cs(s.formInput)}
                        />

                        <div
                          className={cs(
                            s.buttonsContainer,
                            "d-flex flex-column"
                          )}
                        >
                          <button
                            type="submit"
                            className={cs(s.loginBtn)}
                            onClick={() => {
                              setTimeout(() => {
                                setSelectedDropdown("");
                              }, 500);
                            }}
                          >
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
                )) || (
                  <>
                    <Link
                      href={user && isStaff(user.role) ? "/admin" : "/profile"}
                      passHref={true}
                    >
                      <p>
                        Go to{" "}
                        {user && isStaff(user.role) ? "admin panel" : "profile"}
                      </p>
                    </Link>

                    <p onClick={() => logout()}>Log out</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {isSecondLineValid() && renderSecondLine()}

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </header>
  );
}
