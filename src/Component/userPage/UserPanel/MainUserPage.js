import React, {useState} from "react";
import "./mainRegistrationLogin.scss"
import FormContainer from "./RegistrationForm/FormContainer";
import Panel from "./panel/Panel";
import {useSelector} from "react-redux";


const MainUserPage = () => {
    const user = useSelector((state)=>state.user.value)

    return (
        <>
           <main className={"mainRegistrationLogin"}>
               {user.user === null ? <FormContainer /> : <Panel />}
           </main>
        </>
    )
}

export default MainUserPage;