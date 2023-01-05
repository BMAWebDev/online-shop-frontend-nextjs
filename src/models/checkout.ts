import * as yup from "yup";

export const checkoutModel = yup.object().shape({
  last_name: yup.string().required("Last name is required"),
  first_name: yup.string().required("First name is required"),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required."),
  address: yup.string().required("Address is required"),
});

export const checkoutInitialValues = {
  last_name: "",
  first_name: "",
  email: "",
  address: "",
};
