// Types
import { ReactElement } from "react";
import { PublishStatus, ICategory, IProduct } from "src/types";

interface IProps {
  product: IProduct;
  categories: ICategory[];
}

interface ISubmitData {
  name: string;
  price: number;
  sku: string;
  stock_qty: number;
  slug: string;
  category_id: number;
  publish_status: PublishStatus;
}

// Modules
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import slugify from "slugify";
import { useRouter } from "next/router";
import Dropdown from "react-dropdown";

// Components
import { Group } from "src/components/Form";
import { Button } from "src/components";

// Models
import { productModel } from "src/models/product";

// Functions
import {
  updateProduct,
  getCategories,
  getProduct,
  getTokenFromCookie,
} from "src/functions";

// Styles
import "react-dropdown/style.css";

// Auth
import { checkAuth } from "src/auth";

export default function CreateProduct({
  product,
  categories,
}: IProps): ReactElement {
  const router = useRouter();

  const defaultOption = {
    value: "0",
    label: "Select a category",
  };
  const categoriesDropdown = [
    defaultOption,
    ...categories.map((category) => {
      return {
        value: category.id.toString(),
        label: category.name,
      };
    }),
  ];

  let selectedCategoryIndex: number | null = null;
  if (product.category_id) {
    selectedCategoryIndex =
      categories.map((cat) => cat.id).indexOf(product.category_id) + 1; // + 1 comes from the default option added above, if that's deleted then we can also delete the +1
  }

  const productInitialValues = {
    name: product.name,
    sku: product.sku,
    price: product.price,
    stock_qty: product.stock_qty,
    category_id: product.category_id ?? 0,
    will_publish: product.publish_status == "live",
  };

  return (
    <div style={{ maxWidth: "500px", margin: "100px auto 0" }}>
      <h1 className="text-center" style={{ fontSize: "26px" }}>
        Edit {product.name}
      </h1>

      <Formik
        initialValues={productInitialValues}
        onSubmit={async (values) => {
          const data: ISubmitData = {
            name: values.name,
            sku: values.sku,
            price: values.price,
            stock_qty: values.stock_qty,
            slug: slugify(values.name, {
              lower: true,
            }),
            category_id: values.category_id,
            publish_status: values.will_publish ? "live" : "draft",
          };

          try {
            const res: any = await updateProduct(product.id, data);
            toast.success(res.message);

            router.push("/admin/products");
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
        validationSchema={productModel}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form
            className="d-flex flex-column"
            style={{ gap: "30px", marginTop: "50px" }}
          >
            <Group
              labelText="Product name:"
              name="name"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Product SKU (stock keeping unit, identifier):"
              name="sku"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Product price:"
              name="price"
              type="number"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Quantity:"
              name="stock_qty"
              type="number"
              errors={errors}
              touched={touched}
            />

            <Dropdown
              options={categoriesDropdown}
              value={
                selectedCategoryIndex !== null
                  ? categoriesDropdown[selectedCategoryIndex]
                  : undefined
              }
              onChange={(e) => setFieldValue("category_id", e.value)}
              placeholder="Select a category"
            />

            <Group
              labelText="Publish category?"
              name="will_publish"
              type="checkbox"
              showInRow
              errors={errors}
              touched={touched}
            />

            <Button type="submit">Edit</Button>
          </Form>
        )}
      </Formik>

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

import { GetServerSideProps } from "next";
export const getServerSideProps: GetServerSideProps = async (context) => {
  const authRes: any = await checkAuth(context);
  const { req } = context;
  const { id } = context.query;
  let { redirect, props } = authRes;

  if (redirect) return authRes;

  const tokenFromCookie = getTokenFromCookie(req.headers.cookie as string);

  const productRes: any = await getProduct(
    parseInt(id as string),
    tokenFromCookie
  );
  const product: IProduct = productRes.product;

  const categoriesRes: any = await getCategories(tokenFromCookie);
  const categories: ICategory[] = categoriesRes.categories;

  props = { ...props, product, categories };

  return {
    props,
  };
};
