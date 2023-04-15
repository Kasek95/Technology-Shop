import React, {useEffect, useState} from "react"
import Header from "../header/Header";
import Footer from "../footer/Footer";
import RegistrationLogin from "./UserPanel/RegistrationLogin";
import supabase from "../../supabase";


const UserPage = () => {
    const [user,setUser] = useState([])

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        const { data } = await supabase.from("users").select();
        setUser(data);
    }


    return (
         <>
             <Header/>
             <RegistrationLogin/>
             <Footer/>
         </>
     )
}
export default UserPage;