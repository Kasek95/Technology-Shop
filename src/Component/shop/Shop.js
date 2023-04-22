import React from "react";
import "./shop.scss"
import EmptyShop from "./EmptyShop";
import {Link} from "react-router-dom";
import supabase from "../../supabase";

const Shop = ({basket,setBasket,products,sumOfProducts,getProducts}) => {
        const sumOfPrices = products.filter(item => item.inShop === true);
        const totalSum = sumOfPrices.map(item => item.products_price * item.product_qty)


        const increaseProduct = async (id) => {
            const findProducts = products.find(el => el.id === id)

            const {data, error}= await supabase
                .from("products")
                .update({
                    product_qty: findProducts.product_qty + 1
                })
                .eq("id", id)
            getProducts()
        }

        const decreaseProduct = async(id) => {
            const findProducts = products.find(el => el.id === id)

            const {data, error}= await supabase
                .from("products")
                .update({
                    product_qty:findProducts.product_qty === 1 ? 1 : findProducts.product_qty - 1
                })
                .eq("id", id)
            getProducts()
        }

        const removeFromShop = async (id) => {

            const {data, error}= await supabase
                .from("products")
                .update({
                    inShop: false,
                    product_qty: 0
                })
                .eq("id", id)
            getProducts()
        }


    if(!products) return null
    return (
        <section className={basket ? "shopCart show " : "shopCart"}>
            <div className={"shopCartHeader"}>
                <span><i  className="shopI fa-brands fa-shopify"></i>Shopping Cart</span>
                <button onClick={() => setBasket(false)}><i  className=" shopI fa-solid fa-x"></i></button>
                {sumOfPrices.length === 0 ? null :
                    <div className={"cardFinishPanel"}>
                        <div className={"totalPrice"}>
                            <span>Subtotal Item:
                                <strong> ({sumOfProducts.reduce((a,b) => a+b)} {sumOfProducts.reduce((a,b) => a+b) > 1 ? `items` : `item`})
                                </strong>
                            </span>
                            <span>Total : <strong>{totalSum.reduce((a,b) => a +b).toFixed(2)} $</strong></span>
                        </div>
                        <button>Buy</button>
                    </div>
                }
            </div>
            <section className={"shopSingielItem"}>
                {products.filter(el => el.inShop === true).length === 0 ? <EmptyShop/> :
                 products.filter(product => product.inShop === true)
                     .map(product => (
                         <article key={product.id} className={"itemCard"}>
                             <i onClick={()=> removeFromShop(product.id)} className="deleteFromShop fa-solid fa-x"></i>
                             <h3>{product.products_name}</h3>

                             <div className={"inputContainer"}>
                                    <img src={product.products_img} alt={product.products_name}/>
                                    <div className={"inputBox"}>
                                        <button onClick={()=> decreaseProduct(product.id)} className={"decrease"}><i className="fa-solid fa-minus"></i></button>
                                        <input value={product.product_qty} type="number"/>
                                        <button onClick={()=> increaseProduct(product.id)} className={"increase"}><i className="fa-solid fa-plus"></i></button>
                                    </div>
                             </div>

                             <div className={"price"}>
                                 <button onClick={() => setBasket(false)}><Link to={"/"}>Back To Shoping</Link></button>
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


