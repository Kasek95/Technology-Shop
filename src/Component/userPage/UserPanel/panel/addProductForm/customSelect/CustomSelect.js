import { useField } from "formik";


const CustomSelect = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.name}>{label}</label>
            <select
                {...field}
                {...props}
                className={"selectBox"}
                id={props.name}
            />
            {meta.touched && meta.error && <div className="error">{meta.error}</div>}
        </>
    );
};
export default CustomSelect;