import React, {useState} from "react";
import "./likedProducts.scss"
import supabase from "../../supabase";


const LikedProducts = ({isDisplay2,setIsDisplay2, products}) => {

    const removeLike = async (id) => {
         let product = products.find(el => el.id == id)
         let liked = !product.isLiked
         const {data,error} = await supabase.from("products")
            .update({
                isLiked: liked
            })
            .eq("id", id)

    }


    if(!products) return null
    return (
        <>
           <section className={isDisplay2 ? "likedProducts show" : "likedProducts"}>
              <div className={"headerLike"}>
                  <span>Liked Products</span>
                  <button onClick={() => setIsDisplay2(false)}>X</button>
              </div>

               <ul className={"listOfLiked"}>
                   {products.filter(item => item.isLiked === true)
                       .map(item => (
                           <li className={"singielItem"} key={item.id}>
                               <i  onClick={() => removeLike(item.id)} className="fa-solid fa-x"></i>
                               <h3>{item.products_name}</h3>
                               <div className={"productInfo"}>
                                   <div className={"imgContainer"}>
                                       <img src={item.products_img}/>
                                   </div>
                                   <span>Price: {item.products_price}$</span>
                               </div>
                               <button >Add To Basket</button>
                           </li>
                       ))
                   }
               </ul>
           </section>
        </>
    )
}
export default LikedProducts;