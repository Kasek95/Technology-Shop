import React,{useState} from "react";
import supabase from "../../../../supabase";
import "./panel.scss"
const Panel = ({getUser}) => {

    const logOut = async () => {
        await supabase.auth.signOut();
        getUser(null)
    }

    return (
        <>
            <section className={"panel"}>
                <article className={"adminPanel container"}>
                       <div className={"headerPanel"}>
                           <h3>Imię</h3>
                            <button onClick={logOut}>Log out</button>
                       </div>
                </article>
            </section>
        </>
    )
}
export default Panel;