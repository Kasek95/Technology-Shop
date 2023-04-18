import * as yup from "yup"
export const advancedSchema = yup.object().shape({
    user:yup.string().min(5,"User name must have at least 5 characters").required("User name is required"),
    email:yup.string().required("E-mail is required").email("E-mail is not valid!"),
    pass1:yup.string().min(6, "Password must have at least 6 character").required("Password is required"),
    pass2:yup.string().oneOf([yup.ref("pass1")], "Password must be match").required("Repeat password is required")
});