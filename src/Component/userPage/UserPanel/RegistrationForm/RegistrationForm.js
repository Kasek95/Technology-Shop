import React, {useState} from "react";
import {Formik,Form} from "formik"
import CustomInput from "./CustomInput";
import {advancedSchema} from "./Validation";
import supabase from "../../../../supabase";
import "./registrationForm.scss"


const RegistrationForm = ({setIsDisplay}) => {



    const onSubmit = async (values, actions,e)=> {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.pass1,
            options: {
                data: {
                    userName: values.user,
                    userType: values.adminKey === "Admin" ? "Admin" : "User"
                },
            },
        })
       

        actions.resetForm()
        setIsDisplay(false)

    }

    return (
        <>
            <Formik
                initialValues={{
                    user: "",
                    email: "",
                    pass1: "",
                    pass2: "",
                    adminKey:""
                }}
                validationSchema={advancedSchema}
                onSubmit={onSubmit}
            >
                {({ isSubmitting }) => (
                    <Form className={"registration"}>
                        <div className={"customInput"}>
                            <i className="fa-solid fa-user"></i>
                            <CustomInput
                                label={`User Name`}
                                name={"user"}
                                type={"text"}
                                placeholder={"Enter your user name!"}
                            />
                        </div>

                        <div className={"customInput"}>

                            <i  className="email fa-regular fa-envelope"></i>
                            <CustomInput
                                label={"E-mail"}
                                name={"email"}
                                type={"email"}
                                placeholder={"Enter your E-mail"}
                            />

                        </div>
                        <div className={"customInput"}>
                            <i className="fa-solid fa-lock"></i>
                            <CustomInput
                                label={`Password`}
                                name={"pass1"}
                                type={"password"}
                                placeholder={"Enter your password"}
                            />
                        </div>
                        <div className={"customInput"}>

                            <i className="lock fa-solid fa-lock"></i>
                            <CustomInput
                                label={`Repeat password`}
                                name={"pass2"}
                                type={"password"}
                                placeholder={"Repeat password"}
                            />
                        </div>

                        <div className={"customInput"}>
                            <i className="fa-solid fa-user-lock"></i>
                            <CustomInput
                                label={"Special Code To Admin Panel"}
                                name={"adminKey"}
                                type={"text"}
                                placeholder={"Write Special Key"}
                            />
                        </div>


                        <div className={"btnPanel"}>
                            <button className={"btn"}  type={"submit"}>Register</button>
                            <button type={"reset"} onClick={e => setIsDisplay(false)} className={"btn"}>Back to Login</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )

}

export default RegistrationForm;

