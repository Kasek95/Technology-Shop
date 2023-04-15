import React, {useState} from "react";
import "./mainRegistrationLogin.scss"
import RegistrationForm from "./RegistrationForm/RegistrationForm";
const RegistrationLogin = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const setDisplay = (parm,e) => {
        e.preventDefault()
        setIsDisplay(parm)
    }

    return (
        <>
           <main className={"mainRegistrationLogin"}>
               <section className={"FormContainer"}>
                     <form className={isDisplay ? "Login Form-Box hide" : "Login Form-Box"}>
                         <h2>Login</h2>
                         <div className="inputbox">
                             <label htmlFor={"Email"}>E-mail</label>
                             <input type="email" required placeholder={"Write your e-mail"}/>
                             <i  className="email fa-regular fa-envelope"></i>
                         </div>
                         <div className="inputbox">
                             <i className="lock fa-solid fa-lock"></i>
                             <label htmlFor="Password">Password</label>
                             <input type="password" required placeholder={"Write your password"}/>
                         </div>
                         <button>Log in</button>
                         <div className="register">
                             <p>Don't have a account <span onClick={() => setIsDisplay(true)}>Register</span></p>
                         </div>
                     </form>
                     <section className={isDisplay ? "registerContainer Form-Box" : "registerContainer Form-Box hide"}>
                          <RegistrationForm isDisplay={isDisplay} setIsDisplay={setDisplay} />
                     </section>
               </section>
           </main>
        </>
    )
}

export default RegistrationLogin;