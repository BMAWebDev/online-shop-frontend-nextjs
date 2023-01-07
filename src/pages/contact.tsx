// Types
import { ReactElement } from "react";

interface ISubmitData {
  last_name: string;
  first_name: string;
  email: string;
  message: string;
}

// Modules
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";

// Components
import { Group } from "src/components/Form";
import { Button } from "src/components";

// Models
import { contactModel, contactInitialValues } from "src/models/contact";

// Functions
import { createContactMessage } from "src/functions";

export default function Contact(): ReactElement {
  return (
    <div className="container">
      <div className="row">
        <h1 style={{ fontFamily: "Epilogue", fontWeight: "700" }}>
          Let&apos;s get in touch
        </h1>

        <h2 style={{ fontSize: "20px", lineHeight: "26px", fontWeight: "500" }}>
          Do you want to collaborate, participate as a member, or have
          questions, comments, or general inquiries?
        </h2>
        <h2 style={{ fontSize: "20px", lineHeight: "26px", fontWeight: "500" }}>
          Let us know, and we will get back to you within 24 hours.
        </h2>
      </div>

      <Formik
        onSubmit={async (values, { resetForm }) => {
          const data: ISubmitData = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            message: values.message,
          };

          try {
            const contactMessageRes: any = await createContactMessage(data);

            toast.success(contactMessageRes.message);

            resetForm();
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
        initialValues={contactInitialValues}
        validationSchema={contactModel}
      >
        {({ errors, touched }) => (
          <Form className="d-flex flex-column" style={{ gap: "30px" }}>
            <div className="row">
              <div className="col-lg-6">
                <Group
                  labelText="First name:"
                  name="first_name"
                  errors={errors}
                  touched={touched}
                />
              </div>
              <div className="col-lg-6">
                <Group
                  labelText="Last name:"
                  name="last_name"
                  errors={errors}
                  touched={touched}
                />
              </div>
            </div>

            <Group
              labelText="Email:"
              name="email"
              type="email"
              className="col-lg-12"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Message:"
              name="message"
              type="textarea"
              className="col-lg-12"
              errors={errors}
              touched={touched}
            />

            <Button type="submit">Send message</Button>
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
