// Modules
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";

// Functions
import { register } from "src/functions";

// Styles
import cs from "classnames";
import s from "./style.module.scss";
import "react-toastify/dist/ReactToastify.css";

// Models
import { registerModel, registerInitialValues } from "src/models/register";

export default function RegisterForm() {
  const [captchaValid, setRecaptchaValid] = useState<boolean>(false);
  const [messageResponse, setMessageResponse] = useState<string>("");

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

          const res: any = await register(values);
          setMessageResponse(res.message);
        }}
        validationSchema={registerModel}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="form-group">
              <label htmlFor="first_name">First name: </label>
              <Field
                id="first_name"
                name="first_name"
                type="first_name"
                className={cs(s.formInput)}
              />
              {errors.first_name && touched.first_name ? (
                <p className="error">{errors.first_name}</p>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last name: </label>
              <Field
                id="last_name"
                name="last_name"
                type="last_name"
                className={cs(s.formInput)}
              />
              {errors.last_name && touched.last_name ? (
                <p className="error">{errors.last_name}</p>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address: </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={cs(s.formInput)}
              />
              {errors.email && touched.email ? (
                <p className="error">{errors.email}</p>
              ) : null}
            </div>

            <div className="form-group">
              <label htmlFor="password">Password: </label>
              <Field
                id="password"
                name="password"
                type="password"
                className={cs(s.formInput)}
              />
              {errors.password && touched.password ? (
                <p className="error">{errors.password}</p>
              ) : null}
            </div>

            <ReCAPTCHA
              sitekey={process.env.RECAPTCHA_SITE_KEY as string}
              onChange={() => setRecaptchaValid(true)}
            />

            <button type="submit">Register</button>
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
