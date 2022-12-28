import * as yup from "yup";

export const productModel = yup.object().shape({
  name: yup.string().required("Name is required"),
  sku: yup.string().required("SKU is required"),
  price: yup.number().required("Price is required"),
  stock_qty: yup.number().required("Quantity is required"),
  category_id: yup.number(),
  will_publish: yup.bool(),
});

export const productInitialValues = {
  name: "",
  sku: "",
  price: "",
  stock_qty: "",
  category_id: 0,
  will_publish: false,
};
