// Modules
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";

// Components
import { Group } from "src/components/Form";
import { Button } from "src/components";

// Functions
import { register } from "src/functions";

// Styles
import "react-toastify/dist/ReactToastify.css";

// Models
import { registerModel, registerInitialValues } from "src/models/register";

export default function RegisterForm() {
  const [captchaValid, setRecaptchaValid] = useState<boolean>(false);

  return (
    <>
      <h1>Register form</h1>

      <Formik
        initialValues={registerInitialValues}
        onSubmit={async (values) => {
          if (!captchaValid) {
            toast.error("You need to complete the recaptcha!");

            return false;
          }

          try {
            const res: any = await register(values);
            toast.success(res.message);
          } catch (err: any) {
            toast.error(err.message);
          }
        }}
        validationSchema={registerModel}
      >
        {({ errors, touched }) => (
          <Form className="d-flex flex-column">
            <Group
              labelText="First name:"
              name="first_name"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Last name:"
              name="last_name"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Email address:"
              name="email"
              type="email"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Password:"
              name="password"
              type="password"
              errors={errors}
              touched={touched}
            />

            <Group
              labelText="Confirm password:"
              name="confirm_password"
              type="password"
              errors={errors}
              touched={touched}
            />

            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY as string}
              onChange={() => setRecaptchaValid(true)}
            />

            <Button type="submit">Register</Button>
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
    </>
  );
}
