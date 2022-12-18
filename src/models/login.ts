import * as yup from "yup";
import config from "src/config";

const loginModel = yup.object().shape({
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
    )
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

export default loginModel;
