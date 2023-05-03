import React, {useState} from "react";
import {useField} from "formik";


const CustomTextArea = ({label,...props}) => {

    const [field, meta] = useField(props)


    return (
        <>
            <label>{label}</label>
            <textarea  {...field} {...props} className={meta.touched && meta.error ? "input-error" : ""}/>
            {meta.touched && meta.error && <div className={"error"}>{meta.error}</div> }
        </>
    )

}

export default CustomTextArea;