import React,{useState} from "react";
import AddProductsForm from "./addProductForm/AddProductsForm";
import RemoveProduct from "./removeProduct/RemoveProduct";
import {useDispatch} from "react-redux";
import {login} from "../../../../features/user"
import supabase from "../../../../supabase";
import "./panel.scss"
const Panel = () => {
     const dispatch = useDispatch()
     const [isDisplay, setIsDisplay] = useState(false)
     const [isDisplay2, setIsDisplay2] = useState(false)

    const hideAddProduct = (parm)  => {
         setIsDisplay2(parm)
     }
     const hideRemoveProduct = (parm) => {
         setIsDisplay(parm)
     }

     const setDeletePanel = () => {
         setIsDisplay(true)
         setIsDisplay2(false)
     }
     const setAddProduct = () => {
         setIsDisplay2(true)
         setIsDisplay(false)
     }

    const logOut = async () => {
        await supabase.auth.signOut();
        dispatch(login({user:null}))
    }

    return (
        <>
            <section className={"panel"}>
                <article className={"adminPanelContainer container"}>
                       <div className={"headerPanel"}>
                           <h3>Admin</h3>
                           <button onClick={logOut}>Log out</button>
                       </div>
                       <section className={"adminPanel"}>
                           <div className={"menuPanel"}>
                               <span>Add Product <i onClick={setAddProduct} className="fa-solid fa-plus"></i></span>
                               <span onClick={setDeletePanel} >Remove Product <i className="fa-solid fa-minus"></i></span>
                           </div>
                           <article className={"actions"}>
                               {isDisplay || isDisplay2 === true ? null : <h2>Welcome in panel Admin!</h2> }
                               <section className={isDisplay2 ? "add_product_form show" : "add_product_form"}>
                                  <AddProductsForm setIsDisplay2={hideAddProduct}/>
                               </section>
                               <section className={isDisplay ? "remove_product show" : "remove_product"}>
                                  <RemoveProduct setIsDisplay={hideRemoveProduct}/>
                               </section>
                           </article>
                       </section>

                </article>
            </section>
        </>
    )
}
export default Panel;