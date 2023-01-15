// Types
import { ReactElement } from "react";
import { GetServerSideProps } from "next";
import { IProduct } from "src/types";

interface IProps {
  latestProducts: IProduct[];
}

// Modules
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
// import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";

// Functions
import { getProducts } from "src/functions";

// Styles

import cs from "classnames";
import s from "src/components/Homepage/style.module.scss";

export default function Homepage({ latestProducts }: IProps): ReactElement {
  return (
    <div className={cs(s.latestProducts, "container")}>
      <div className="row">
        <h2>Latest products</h2>

        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          modules={[Navigation]}
          navigation
        >
          {latestProducts.map((product) => {
            return (
              <SwiperSlide key={product.id}>
                <Link href={`/products/${product.slug}`} passHref={true}>
                  <div className={cs(s.thumbnailContainer)}>
                    <h3 className={cs(s.latestProductsTitle)}>
                      {product.name}
                    </h3>

                    <Image
                      src="/img/default-product.jpg"
                      alt="default product icon"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const latestProductsRes: any = await getProducts(undefined, {
    limit: 3,
  });

  const { products } = latestProductsRes;

  return {
    props: {
      latestProducts: products,
    },
  };
};
