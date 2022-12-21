import * as yup from "yup";
import config from "src/config";

export const registerModel = yup.object().shape({
  last_name: yup.string().required("Last name is required."),
  first_name: yup.string().required("First name is required."),
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(
      config.password_min_characters,
      "Password is too short. Minimum: " + config.password_min_characters
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match."),
});

export const registerInitialValues = {
  last_name: "",
  first_name: "",
  email: "",
  password: "",
  confirm_password: "",
};
