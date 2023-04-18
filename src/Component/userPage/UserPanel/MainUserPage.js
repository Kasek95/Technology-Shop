import React, {useState} from "react";
import "./mainRegistrationLogin.scss"
import FormContainer from "./RegistrationForm/FormContainer";


const MainUserPage = () => {
      const [user,setUser] = useState(null)

      const getUser = (parm) => {
          setUser(parm)
      }

    return (
        <>
           <main className={"mainRegistrationLogin"}>
               {user === null ? <FormContainer getUser={getUser}/> : <div>Hello Paweł</div>}
           </main>
        </>
    )
}

export default MainUserPage;