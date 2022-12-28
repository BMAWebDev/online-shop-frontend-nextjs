import * as yup from "yup";

export const categoryModel = yup.object().shape({
  name: yup.string().required("Category name is required"),
  will_publish: yup.bool(),
});

export const categoryInitialValues = {
  name: "",
  will_publish: false,
};
