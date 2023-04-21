import React from "react";
import "./shop.scss"
import EmptyShop from "./EmptyShop";
import {Link} from "react-router-dom";

const Shop = ({basket,setBasket,products}) => {

    if(!products) return null
    return (
        <section className={basket ? "shopCart show " : "shopCart"}>
            <div className={"shopCartHeader"}>
                <span><i  className="shopI fa-brands fa-shopify"></i>Shopping Cart</span>
                <button onClick={() => setBasket(false)}><i  className=" shopI fa-solid fa-x"></i></button>
            </div>
            <section className={"shopSingielItem"}>
                {products.filter(el => el.inShop === true).length === 0 ? <EmptyShop/> :
                 products.filter(product => product.inShop === true)
                     .map(product => (
                         <article className={"itemCard"}>
                             <i className="deleteFromShop fa-solid fa-x"></i>
                             <h3>{product.products_name}</h3>

                             <div className={"inputContainer"}>
                                    <img src={product.products_img} alt={product.products_name}/>
                                    <div className={"inputBox"}>
                                        <button><i className="fa-solid fa-minus"></i></button>
                                        <input value={product.product_qty} type="number"/>
                                        <button><i className="fa-solid fa-plus"></i></button>
                                    </div>
                             </div>

                             <div className={"price"}>
                                 <button><Link to={"/"}>Back To Shoping</Link></button>
                                 <span><strong>Price</strong>: {product.product_qty * product.products_price}$</span>
                             </div>

                         </article>
                     ))
                }
            </section>

        </section>

    )

}

export default Shop


