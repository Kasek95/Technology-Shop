import * as yup from "yup"

export const addProductsValidation = yup.object().shape({
    products_name: yup
        .string()
        .min(5, "Products must be at least 5 characters long")
        .required("Required"),
    products_info: yup
        .string()
        .min(20, "Products info must have at least 20 characters")
        .required("Required"),
    products_price:yup
        .number()
        .positive()
        .required("Required"),
    products_year:yup
        .number()
        .positive()
        .required("Required"),
    products_img: yup
        .string()
        .required("Set Pictures of products"),
    products_category: yup
        .string()
        .oneOf(["Phone", "Monitor", "Head-Set"], "Select category")
        .required("Required"),
});