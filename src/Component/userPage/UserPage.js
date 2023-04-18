import React, {useEffect, useState} from "react"

import Footer from "../footer/Footer";
import MainUserPage from "./UserPanel/MainUserPage";



const UserPage = () => {

    return (
         <>
             <MainUserPage />
             <Footer/>
         </>
     )
}
export default UserPage;