import React, {useState} from "react";
import RegistrationForm from "./RegistrationForm";
import {useDispatch} from "react-redux";
import {login} from "../../../../features/user"
import supabase from "../../../../supabase";



const  FormContainer  = () => {
    const [isDisplay, setIsDisplay] = useState(false)
    const [email,setEmail] = useState();
    const [password, setPassword] = useState()
    const dispatch = useDispatch()

    const setDisplay = (parm) => {
        setIsDisplay(parm)
    }


    const loginInUser = async (e) => {
        e.preventDefault()
        let { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        if(data.user.email !== "") {
            dispatch(login({user:data.user}))
        }

        setPassword("")
        setEmail("")
    }
   return (
       <section className={"FormContainer"}>
           <form className={isDisplay ? "Login Form-Box hide" : "Login Form-Box"}>
               <h2>Login</h2>
               <div className="inputbox">
                   <label htmlFor={"Email"}>E-mail</label>
                   <input
                       onChange={e => setEmail(e.target.value)}
                       value={email}
                       type="email"
                       id={"Email"}
                       required
                       placeholder={"Write your e-mail"}
                   />
                   <i className="email fa-regular fa-envelope"></i>
               </div>
               <div className="inputbox">
                   <i className="lock fa-solid fa-lock"></i>
                   <label htmlFor="Password">Password</label>
                   <input
                       onChange={e => setPassword(e.target.value)}
                       value={password} type="password"
                       required
                       placeholder={"Write your password"}
                       id={"Password"}
                   />
               </div>
               <button onClick={loginInUser}>Log in</button>
               <div className="register">
                   <p>Don't have a account <span onClick={() => setIsDisplay(true)}>Register</span></p>
               </div>
           </form>
           <section className={isDisplay ? "registerContainer Form-Box" : "registerContainer Form-Box hide"}>
               <RegistrationForm isDisplay={isDisplay} setIsDisplay={setDisplay} />
           </section>
       </section>
   )
}

export default FormContainer;