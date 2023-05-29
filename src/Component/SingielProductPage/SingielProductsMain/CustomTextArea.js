import React from "react";
import {useField} from "formik";


const CustomTextArea = ({label,...props}) => {

    const [field, meta] = useField(props)


    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <textarea id={props.name}  {...field} {...props} className={meta.touched && meta.error ? "input-error" : ""}/>
            {meta.touched && meta.error && <div className={"error"}>{meta.error}</div> }
        </>
    )

}

export default CustomTextArea;