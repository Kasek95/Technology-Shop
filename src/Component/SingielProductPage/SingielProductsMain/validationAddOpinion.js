import * as yup from "yup"

export const addOpinionValidation = yup.object().shape({
    userName: yup
        .string()
        .min(5, "Username must 5 characters long")
        .required("Required"),
    description: yup
        .string()
        .min(20, "Opinion must have at least 20 characters")
        .required("Required"),
    rating: yup
        .string()
        .oneOf(["1","2","3","4","5"], "Select rating")
        .required("Required"),
});