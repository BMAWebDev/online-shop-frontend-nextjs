// Types
import { ReactElement } from "react";
import { PublishStatus, ICategory } from "src/types";

interface ISubmitData {
  name: string;
  slug: string;
  publish_status: PublishStatus;
}

interface IProps {
  category: ICategory;
}

// Modules
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import slugify from "slugify";
import { useRouter } from "next/router";

// Components
import { Group } from "src/components/Form";
import { Button } from "src/components";

// Models
import { categoryModel } from "src/models/category";

// Functions
import { getCategory, getTokenFromCookie, updateCategory } from "src/functions";

// Auth
import { checkAuth } from "src/auth";

export default function EditCategory({ category }: IProps): ReactElement {
  const router = useRouter();

  const categoryInitialValues = {
    name: category.name,
    will_publish: category.publish_status == "live",
  };

  return (
    <div style={{ maxWidth: "500px", margin: "100px auto 0" }}>
      <h1 className="text-center" style={{ fontSize: "26px" }}>
        Update category {category.name}
      </h1>

      <Formik
        initialValues={categoryInitialValues}
        onSubmit={async (values) => {
          const data: ISubmitData = {
            name: values.name,
            slug: slugify(values.name, {
              lower: true,
            }),
            publish_status: values.will_publish ? "live" : "draft",
          };

          try {
            const res: any = await updateCategory(category.id, data);
            toast.success(res.message);

            router.push("/admin/categories");
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
        validationSchema={categoryModel}
      >
        {({ errors, touched }) => (
          <Form
            className="d-flex flex-column"
            style={{ gap: "30px", marginTop: "50px" }}
          >
            <Group
              labelText="Category name:"
              name="name"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Publish category?"
              name="will_publish"
              type="checkbox"
              showInRow
              errors={errors}
              touched={touched}
            />

            <Button type="submit">Update</Button>
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
  const { id } = context.query;
  let { redirect, props } = authRes;

  if (redirect) return authRes;

  const categoryRes: any = await getCategory(
    parseInt(id as string),
    getTokenFromCookie(context.req.headers.cookie as string)
  );

  const category: ICategory = categoryRes.category;
  props = { ...props, category };

  return {
    props,
  };
};
