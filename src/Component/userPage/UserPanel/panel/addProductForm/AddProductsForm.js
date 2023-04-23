import React, {useEffect} from "react";
import "./addProductsForm.scss"
import {Form,Formik} from "formik";
import {addProductsValidation} from "./addProductsValidation";
import supabase from "../../../../../supabase";
import CustomInput from "../../RegistrationForm/CustomInput";
import CustomSelect from "./customSelect/CustomSelect";
import {getAllProducts} from "../../../../../features/listOfProduct";
import {useDispatch} from "react-redux";

const AddProductsForm = ({setIsDisplay2}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        dispatch(getAllProducts({items:data}))
    }

    async function getBase64ImageFromUrl(imageUrl) {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    resolve(reader.result);
                },
                false
            );

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        });
    }


    const onSubmit = async (values, actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const doc = document.getElementById("1");

        const img = URL.createObjectURL(doc.files[0]);
        const imgBase64 = await getBase64ImageFromUrl(img);

        await supabase.from("products").insert({
            products_name: values.products_name,
            products_price: values.products_price,
            products_info: values.products_info,
            products_img: imgBase64,
            products_year: values.products_year,
            product_category: values.products_category,
        });
        getProducts();
        actions.resetForm();
    };

    return (
        <>
            <Formik
                initialValues={{
                    products_name: "",
                    products_info: "",
                    products_price: "",
                    products_year: "",
                    products_img:"",
                    products_category: "",
                }}
                validationSchema={addProductsValidation}
                onSubmit={onSubmit}

            >
                {({ isSubmitting }) => (
                    <Form className={"addProducts"}>
                        <i onClick={()=> setIsDisplay2(false)} className="fa-solid fa-x"></i>
                        <div className={"customInput"}>
                            <CustomInput
                                label={`Product Name`}
                                name={"products_name"}
                                type={"text"}
                                placeholder={"Enter product name"}
                            />
                        </div>

                        <div className={"customInput"}>

                            <CustomInput
                                label={"Product Info"}
                                name={"products_info"}
                                type={"text"}
                                placeholder={"Enter info about product!"}
                            />

                        </div>
                        <div className={"customInput"}>

                            <CustomInput
                                label={`Product Price`}
                                name={"products_price"}
                                type={"number"}
                                placeholder={"Enter product price"}
                            />
                        </div>
                        <div className={"customInput"}>
                            <CustomInput
                                label={`Products year`}
                                name={"products_year"}
                                type={"number"}
                                placeholder={"Product year"}
                            />
                        </div>

                        <div className={"customInput"}>

                            <CustomInput
                                id={1}
                                label={"Picture of products"}
                                name={"products_img"}
                                type={"file"}
                                placeholder={"Add Products img"}
                            />
                        </div>

                        <div className={"customSelect"}>
                            <CustomSelect
                                label="Job Type"
                                name="products_category"
                                placeholder="Please select a job"
                            >
                                <option value="">Please select a product type</option>
                                <option value="Phone">Phone</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Head-Set">Head-Set</option>
                            </CustomSelect>
                        </div>


                          <button className={"addProduct"}  type={"submit"}>Add Product</button>


                    </Form>
                )}
            </Formik>
        </>
    )
}
export default AddProductsForm;