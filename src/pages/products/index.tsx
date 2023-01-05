// Types
import { ReactElement } from "react";
import { IProduct } from "src/types";

// Functions
import { getProducts } from "src/functions";

// Modules
import { useEffect, useState } from "react";
import { Button } from "src/components";
import Link from "next/link";
import Image from "next/image";

export default function Products(): ReactElement {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    getProducts().then((productsRes: any) => {
      setProducts(productsRes.products);
    });
  }, []);

  if (!products.length) return <p>No products available!</p>;

  return (
    <div className="container">
      <div className="row" style={{ padding: "15px" }}>
        {products.map((product) => {
          return (
            <div
              key={product.id}
              className="col-lg-3"
              style={{ marginBottom: "25px" }}
            >
              <div className="master-container">
                <div
                  className="image-container"
                  style={{
                    width: "100%",
                    height: "200px",
                    position: "relative",
                    marginBottom: "15px",
                  }}
                >
                  <Image
                    src="/img/default-product.jpg"
                    alt="default product picture"
                    fill
                    style={{ objectFit: "cover" }}
                    priority
                  />
                </div>

                <p>Name: {product.name}</p>
                <p>Price: {product.price} RON</p>
                <p>
                  Stock: {product.stock_qty > 0 ? "In stock" : "Out of stock"}
                </p>

                <Link href={`/products/${product.slug}`}>
                  <Button style={{ marginTop: "15px", width: "100%" }}>
                    Buy now
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
