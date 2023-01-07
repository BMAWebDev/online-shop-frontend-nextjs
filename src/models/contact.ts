import * as yup from "yup";

export const contactModel = yup.object().shape({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required."),
  message: yup.string().required("Message is required"),
});

export const contactInitialValues = {
  first_name: "",
  last_name: "",
  email: "",
  message: "",
};
