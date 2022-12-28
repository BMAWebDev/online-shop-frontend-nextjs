// Types
import { ReactElement } from "react";
import { PublishStatus } from "src/types";

interface ISubmitData {
  name: string;
  slug: string;
  publish_status: PublishStatus;
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
import { categoryModel, categoryInitialValues } from "src/models/category";

// Functions
import { createCategory } from "src/functions";

export default function CreateCategory(): ReactElement {
  const router = useRouter();

  return (
    <div style={{ maxWidth: "500px", margin: "100px auto 0" }}>
      <h1 className="text-center" style={{ fontSize: "26px" }}>
        Add a new category
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
            const res: any = await createCategory(data);
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

            <Button type="submit">Add new category</Button>
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
