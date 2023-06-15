import React, {useEffect, useState} from "react";
import "./products.scss"
import monitor from "../../assets/337912092_268168178868459_8084184389387433978_n.png"
import phone from "../../assets/339077469_214418724564913_5637508898114760834_n.png"
import headset from "../../assets/339071964_1275987013030099_1893502995452438114_n.png"
import supabase from "../../../supabase";
import ProductCard from "./ProductCard";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts,updateIsLiked, updateInShop} from "../../../features/listOfProduct";

//tanstack query


const Products = () => {
    const [isDisplay,setIsDisplay] = useState(false)
    const [isDisplay2,setIsDisplay2] = useState(false)
    const [isDisplay3,setIsDisplay3] = useState(false)
    const dispatch = useDispatch()
    const products = useSelector((state)=>state.product.value)

    const showMonitorOnly = () => {
        setIsDisplay(!isDisplay)
        setIsDisplay2(false)
        setIsDisplay3(false)
    }
    const HeadSeatOnly = () => {
        setIsDisplay(false)
        setIsDisplay2(!isDisplay2)
        setIsDisplay3(false)
    }
    const PhoneOnly = () => {
        setIsDisplay(false)
        setIsDisplay2(false)
        setIsDisplay3(!isDisplay3)
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        dispatch(getAllProducts({items:data}))
    }


    const addLikedProduct = async (id) => {
        dispatch(updateIsLiked(id))
        let product = products.items.find(el => el.id === id)
        let liked = product.isLiked

        await supabase.from("products")
            .update({
                isLiked: !liked
            })
            .eq("id", id)
            .sort()
            getProducts()
    }
    const addToBasket = async (id) => {
        dispatch(updateInShop(id))
        let product = products.items.find(el => el.id === id)
        await supabase
              .from("products")
              .update({
                  inShop: true,
                  product_qty:  (product.product_qty + 1)
              })
              .eq("id", id)
              .sort()
        getProducts();
    }

   if(!products.items) return  null
    return (
        <>
            <section className={"products"}>
                 <article className={"products-container container"}>
                        <div className={"categoryProducts"}>
                            <div onClick={showMonitorOnly} className={"monitor card"}>
                                <img src={monitor} alt={"Monitor"}/>

                            </div>

                            <div onClick={HeadSeatOnly} className={"head-seat card"}>
                               <img src={headset} alt={"head set"}/>
                            </div>

                            <div onClick={PhoneOnly} className={"phone card"}>
                              <img src={phone} alt={"Phone"}/>
                            </div>
                        </div>
                 </article>

                <section className={"showProducts container"}>
                        <h2>Popular Products</h2>
                        <div className={"border-bottom"}></div>

                    <article className={"singielProducts"}>
                        <section className={isDisplay3 ? "phoneProducts show" : "phoneProducts"}>
                            {products.items
                                .filter((el) => el.product_category === "Phone" && el.popular === true )
                                .map((el) => (
                                    <ProductCard  el={el} addToBasket={addToBasket} addLikedProduct={addLikedProduct}/>
                                ))}
                        </section>

                        <section className={isDisplay ? "monitorProducts show" : "monitorProducts"}>
                            {products.items
                                .filter(el => el.product_category === "Monitor" && el.popular === true)
                                .map(el => (
                                    <ProductCard el={el} addToBasket={addToBasket} addLikedProduct={addLikedProduct}/>
                                ))
                            }
                        </section>

                        <section className={isDisplay2 ? "head-seatProducts show" : "head-seatProducts"}>
                            {products.items
                                .filter(el => el.product_category === "Head-Set" && el.popular === true)
                                .map(el => (
                                     <ProductCard el={el} addToBasket={addToBasket} addLikedProduct={addLikedProduct}/>
                                ))
                            }
                        </section>

                    </article>

                </section>

            </section>
        </>
    )

}

export default Products