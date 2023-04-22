import React, {useState} from "react";
import supabase from "../../../../supabase";

const SingielMonitor = ({product,getProducts,likedProducts}) => {
    const [counter, setCounter] = useState(1)

    const addToBasket = async (product) => {


        const {data, error} = await supabase
            .from("products")
            .update({
                inShop: true,
                product_qty: product.product_qty + counter
            })
            .eq("id", product.id)
        getProducts()
        setCounter(1)
    }

    return (
        <>
            <section className={"productCard"} key={product.id}>
                <i onClick={() => likedProducts(product.id)} className={product.isLiked ? "fa-solid fa-heart red icon" : "fa-regular fa-heart icon"}></i>
                <h3>{product.products_name}</h3>
                <div className={"infoContainer"}>
                    <div className={"imgContainer"}>
                        <span>Price: <strong>{product.products_price}$</strong> </span>
                        <img src={product.products_img} alt={product.products_name}/>
                    </div>
                    <span>{product.products_info}</span>
                </div>
                <article className={"OrderBox"}>
                    <div className={"inputBox"}>
                        <button disabled={counter === 1 ? true : false} onClick={()=>setCounter(prevCounter => prevCounter - 1)}  className={"decrease"}><i className="fa-solid fa-minus"></i></button>
                        <input  value={counter} type="number"/>
                        <button onClick={()=> setCounter(prevCounter => prevCounter + 1)} className={"increase"}><i className="fa-solid fa-plus"></i></button>
                    </div>
                    <button onClick={()=> addToBasket(product)} className={"addToBasket"}>Add To Basket</button>
                </article>
            </section>
        </>
    )
}
export default SingielMonitor;