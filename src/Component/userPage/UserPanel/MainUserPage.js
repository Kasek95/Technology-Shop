import React, {useState} from "react";
import "./mainRegistrationLogin.scss"
import FormContainer from "./RegistrationForm/FormContainer";
import Panel from "./panel/Panel";


const MainUserPage = () => {
      const [user,setUser] = useState(null)

      const getUser = (parm) => {
          setUser(parm)
      }

    return (
        <>
           <main className={"mainRegistrationLogin"}>
               {user === null ? <FormContainer getUser={getUser}/> : <Panel getUser={getUser} />}
           </main>
        </>
    )
}

export default MainUserPage;