import React, {useState} from "react";
import "./registrationForm.scss"
import supabase from "../../../../supabase";
const RegistrationForm = ({isDisplay,setIsDisplay}) => {
    const [user,setUser] = useState()
    const [email,setEmail] = useState()
    const [pass1, setPass1] = useState()
    const [pass2, setPass2] = useState()
    const [adminKey, setAdminKey] = useState()

    return (
        <>
           <form className={"registration"}>
              <h2>Register</h2>
               <div className={"customInput"}>
                   <label htmlFor={"userName"}>User Name</label>
                   <i className="fa-solid fa-user"></i>
                   <input
                       onChange={(e)=> setUser(e.target.value)}
                       value={user} id={"userName"}
                       type={"text"}
                       placeholder={"Write your User Name"}/>
               </div>
               <div className={"customInput"}>
                   <label htmlFor={"Email"}>E-mail</label>
                   <i  className="email fa-regular fa-envelope"></i>
                   <input
                       onChange={(e)=> setEmail(e.target.value)}
                       value={email} name={"Email"}
                       type={"email"} id={"Email"}
                       placeholder={"Write your E-mail"}/>
               </div>
               <div className={"customInput"}>
                   <label htmlFor={"Password"}>Password</label>
                   <i className="fa-solid fa-lock"></i>
                   <input
                       onChange={(e)=> setPass1(e.target.value)}
                       value={pass1}
                       name={"Password"}
                       type={"password"}
                       id={"Password"}
                       placeholder={"Write your Password"}/>
               </div>
               <div className={"customInput"}>
                   <label htmlFor={"Password2"}>Confirm Password</label>
                   <i className="lock fa-solid fa-lock"></i>
                   <input
                       onChange={(e)=>setPass2(e.target.value)}
                       value={pass2}
                       name={"Password2"}
                       type={"password"}
                       id={"Password2"}
                       placeholder={"Write your Password"}/>
               </div>

               <div className={"customInput"}>
                   <label htmlFor={"Special"}>Special Code To Admin Panel </label>
                   <i className="fa-solid fa-user-lock"></i>
                   <input
                       onChange={e => setAdminKey(e.target.value)}
                       value={adminKey}
                       name={"Special"}
                       type={"text"} id={"Special"}
                       placeholder={"Write code to get access to Admin"}/>
               </div>

               <div className={"btnPanel"}>
                   <button onClick={(e)=> setIsDisplay(false,e)} className={"btn"}>Register</button>
                   <button onClick={(e)=> setIsDisplay(false,e)} className={"btn"}>Back To Login</button>
               </div>
           </form>
        </>
    )

}

export default RegistrationForm;

