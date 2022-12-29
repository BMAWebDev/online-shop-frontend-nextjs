// Types
import { ReactElement } from "react";
import { PublishStatus, ICategory } from "src/types";

interface IProps {
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
import { productModel, productInitialValues } from "src/models/product";

// Functions
import {
  createProduct,
  getCategories,
  getTokenFromCookie,
} from "src/functions";

// Styles
import "react-dropdown/style.css";

// Auth
import { checkAuth } from "src/auth";

export default function CreateProduct({ categories }: IProps): ReactElement {
  const router = useRouter();

  const categoriesDropdown = categories.map((category) => {
    return {
      value: category.id.toString(),
      label: category.name,
    };
  });

  return (
    <div style={{ maxWidth: "500px", margin: "100px auto 0" }}>
      <h1 className="text-center" style={{ fontSize: "26px" }}>
        Add a new product
      </h1>

      <Formik
        initialValues={productInitialValues}
        onSubmit={async (values) => {
          const data: ISubmitData = {
            name: values.name,
            sku: values.sku,
            price: parseFloat(values.price),
            stock_qty: parseInt(values.stock_qty),
            slug: slugify(values.name, {
              lower: true,
            }),
            category_id: values.category_id,
            publish_status: values.will_publish ? "live" : "draft",
          };

          try {
            const res: any = await createProduct(data);
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
              onChange={(e) => setFieldValue("category_id", e.value)}
              placeholder="Select a category"
            />

            <Group
              labelText="Publish product?"
              name="will_publish"
              type="checkbox"
              showInRow
              errors={errors}
              touched={touched}
            />

            <Button type="submit">Add new product</Button>
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
  let { redirect, props } = authRes;

  if (redirect) return authRes;

  const categoriesRes: any = await getCategories(
    getTokenFromCookie(req.headers.cookie as string)
  );

  const categories: ICategory[] = categoriesRes.categories;
  props = { ...props, categories };

  return {
    props,
  };
};
