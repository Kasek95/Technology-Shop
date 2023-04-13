import React from "react";
import "./shop.scss"

const Shop = ({basket,setBasket}) => {

    return (
        <section className={basket ? "shopCart show " : "shopCart"}>
            <div className={"shopCartHeader"}>
                <span><i  className="shopI fa-brands fa-shopify"></i>Shopping Cart</span>
                <button onClick={() => setBasket(false)}><i  className=" shopI fa-solid fa-x"></i></button>
            </div>
        </section>

    )

}

export default Shop


