// Types
import { ReactElement } from "react";
import { ICartProduct } from "src/types";

interface ISubmitData {
  last_name: string;
  first_name: string;
  email: string;
  address: string;
  shipping_method: string;
  payment_method: "credit card" | "debit card" | "cash on delivery";
  products: ICartProduct[];
  user_id?: number;
}

// Components
import { Group } from "src/components/Form";

// Modules
import Image from "next/image";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "src/components";
import { useRouter } from "next/router";

// Store
import { cartStore, userStore } from "src/store";

// Functions
import { calculateCartPrice, createOrder } from "src/functions";

// Models
import { checkoutModel, checkoutInitialValues } from "src/models/checkout";

export default function Checkout(): ReactElement {
  const [products, setProducts] = useState<ICartProduct[]>([]);
  const [cartTotalPrice, setCartTotalPrice] = useState<string>("0.00");
  const router = useRouter();

  const cart = cartStore();

  const user = userStore().user;

  let initialValues = checkoutInitialValues;
  if (user) {
    initialValues = {
      last_name: user.last_name,
      first_name: user.first_name,
      email: user.email,
      address: "",
    };
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (cart.products.length) {
        setProducts(cart.products);
        setCartTotalPrice(calculateCartPrice(cart));
      } else router.push("/products");
    }
  }, [cart.products]);

  return (
    <div className="container">
      <div className="row">
        <h1 style={{ marginTop: "100px" }}>Welcome. Ready to checkout?</h1>

        <h2 style={{ marginTop: "25px", fontSize: "26px" }}>In your cart:</h2>

        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="col-lg-12 d-flex"
              style={{ gap: "30px" }}
            >
              <div
                className="image-container"
                style={{
                  width: "25%",
                  height: "200px",
                  position: "relative",
                  marginBottom: "15px",
                }}
              >
                <Image src="/img/default-product.jpg" fill alt="" />
              </div>

              <div className="product-details">
                <h3>{product.full_product.name}</h3>

                <p>Price: {product.full_product.price} RON</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            </div>
          );
        })}

        <h2 style={{ fontSize: "26px" }}>Cart price: {cartTotalPrice} RON</h2>
        <h2 style={{ fontSize: "26px" }}>Delivery fee: 0.00 RON</h2>
        <h2 style={{ fontSize: "26px" }}>
          Total price: {cartTotalPrice + 0} RON
        </h2>
      </div>

      <div className="row">
        <Formik
          initialValues={initialValues}
          onSubmit={async (values) => {
            const data: ISubmitData = {
              last_name: values.last_name,
              first_name: values.first_name,
              email: values.email,
              address: values.address,
              shipping_method: "courier",
              payment_method: "cash on delivery",
              products,
            };

            if (user) data.user_id = user.id;

            try {
              const res: any = await createOrder(data);
              toast.success(res.message);

              cart.clear();

              router.push("/");
            } catch (err: any) {
              toast.error(err.message);
            }
          }}
          validationSchema={checkoutModel}
        >
          {({ errors, touched }) => (
            <Form className="d-flex flex-column" style={{ gap: "30px" }}>
              <h2 style={{ fontSize: "26px", marginTop: "100px" }}>
                Delivery and billing info.
              </h2>

              <div className="row">
                <div className="col-lg-6">
                  <Group
                    labelText="Last name:"
                    name="last_name"
                    errors={errors}
                    touched={touched}
                  />
                </div>

                <div className="col-lg-6">
                  <Group
                    labelText="First name:"
                    name="first_name"
                    errors={errors}
                    touched={touched}
                  />
                </div>
              </div>

              <Group
                labelText="Email address:"
                name="email"
                errors={errors}
                touched={touched}
              />

              <Group
                labelText="Full location address:"
                name="address"
                errors={errors}
                touched={touched}
              />

              <h2 style={{ fontSize: "26px" }}>Shipping method: Fan Courier</h2>

              <h2 style={{ fontSize: "26px" }}>
                Payment method: Cash on delivery
              </h2>

              <Button type="submit">Place order</Button>
            </Form>
          )}
        </Formik>
      </div>

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
    </div>
  );
}
