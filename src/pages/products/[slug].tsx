// Types
import { ReactElement } from "react";
import { IProduct, ICartProduct } from "src/types";

// Components
import { Button } from "src/components";

// Modules
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

// Functions
import { getProduct, getDate } from "src/functions";

// Store
import { cartStore } from "src/store";

export default function Product(): ReactElement {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [alreadyInCart, setAlreadyInCart] = useState<boolean>(false);
  const router = useRouter();
  const cart = cartStore();

  useEffect(() => {
    const slug = router.query.slug;

    if (slug) {
      getProduct({ product_slug: slug as string }).then((res: any) => {
        setProduct(res.product as IProduct);

        setAlreadyInCart(
          cart.products.find((_prod) => _prod.id == res.product.id)
            ? true
            : false
        );
      });
    }
  }, [router.query]);

  const addToCart = () => {
    if (!product) return null;

    const cartProduct: ICartProduct = {
      id: product.id,
      quantity: 1,
      full_product: product,
    };

    cart.addProduct(cartProduct);

    setAlreadyInCart(true);

    toast.success("Product added to cart.");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div
            className="master-container"
            style={{ position: "relative", height: "100%" }}
          >
            <Image
              src="/img/default-product.jpg"
              alt="default product icon"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="master-container">
            <h1 className="title">{product.name}</h1>

            <p>Identifier: {product.sku}</p>

            <p>Price: {product.price} RON</p>

            <p>
              Stock availability:{" "}
              {product.stock_qty > 0 ? "In stock" : "Out of stock"}
            </p>

            <p>On our site since: {getDate(product.created_at)}</p>

            <Button onClick={() => addToCart()} disabled={alreadyInCart}>
              {alreadyInCart ? "Product already in cart" : "Buy now"}
            </Button>
          </div>
        </div>
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
