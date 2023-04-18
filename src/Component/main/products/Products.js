import React, {useEffect, useState} from "react";
import "./products.scss"
import monitor from "../../assets/337912092_268168178868459_8084184389387433978_n.png"
import phone from "../../assets/339077469_214418724564913_5637508898114760834_n.png"
import headset from "../../assets/339071964_1275987013030099_1893502995452438114_n.png"
import supabase from "../../../supabase";


const Products = () => {
    const [products, setProducts] = useState([])
    const [isDisplay,setIsDisplay] = useState(false)
    const [isDisplay2,setIsDisplay2] = useState(false)
    const [isDisplay3,setIsDisplay3] = useState(false)
    console.log(products)



    const showMonitorOnly = () => {
        setIsDisplay(true)
        setIsDisplay2(false)
        setIsDisplay3(false)
    }
    const HeadSeatOnly = () => {
        setIsDisplay(false)
        setIsDisplay2(true)
        setIsDisplay3(false)
    }
    const PhoneOnly = () => {
        setIsDisplay(false)
        setIsDisplay2(false)
        setIsDisplay3(true)
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        setProducts(data);
    }


    const addLikedProduct = async (id) => {

        setProducts(elm => elm.map(elem => {
            return   elem.id === id ? {...elem , isLiked: !elem.isLiked} : elem
        }))
        let product = products.find(el => el.id == id)
        let liked = product.isLiked

        const {data,error} = await supabase.from("products")
            .update({
                isLiked: !liked
            })
            .eq("id", id)
    }

   if(!products) return  null
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
                            {products
                                .filter((el) => el.product_category === "Phone")
                                .map((el) => (
                                    <div className={"cardContainer"} key={el.id}>
                                        <div className={"icon"}>
                                            <i onClick={() => addLikedProduct(el.id)}
                                               className={el.isLiked ? "fa-solid fa-heart red" : "fa-solid fa-heart"}>
                                            </i>
                                        </div>
                                        <div className={"img"}>
                                            <img src={el.products_img}/>
                                        </div>"
                                        <h3>{el.products_name}</h3>
                                        <span>Price: {el.products_price}$</span>
                                        <button>Add to Basket</button>
                                    </div>
                                ))}
                        </section>

                        <section className={isDisplay ? "monitorProducts show" : "monitorProducts"}>
                            {products
                                .filter(el => el.product_category === "Monitor")
                                .map(el => (
                                    <div className={"cardContainer"} key={el.id}>
                                         <div className={"icon"}>
                                             <i onClick={() => addLikedProduct(el.id)}
                                                className={el.isLiked ? "fa-solid fa-heart red" : "fa-solid fa-heart"}>
                                             </i>
                                         </div>
                                        <div className={"img"}>
                                            <img src={el.products_img}/>
                                        </div>"
                                        <h3>{el.products_name}</h3>
                                        <span>Price: {el.products_price}$</span>
                                        <button>Add to Basket</button>
                                    </div>
                                ))
                            }
                        </section>

                        <section className={isDisplay2 ? "head-seatProducts show" : "head-seatProducts"}>
                            {products
                                .filter(el => el.product_category === "Head-Set")
                                .map(el => (
                                    <div className={"cardContainer"} key={el.id}>
                                        <div className={"icon"}>
                                            <i onClick={() => addLikedProduct(el.id)}
                                               className={el.isLiked ? "fa-solid fa-heart red" : "fa-solid fa-heart"} >
                                            </i>
                                        </div>
                                        <div className={"img"}>
                                            <img src={el.products_img}/>
                                        </div>"
                                        <h3>{el.products_name}</h3>
                                        <span>Price: {el.products_price}$</span>
                                        <button>Add to Basket</button>
                                    </div>
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