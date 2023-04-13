import React, {useState} from "react";
import "./likedProducts.scss"


const LikedProducts = ({isDisplay2,setIsDisplay2}) => {

    return (
        <>
           <section className={isDisplay2 ? "likedProducts show" : "likedProducts"}>
              <div className={"headerLike"}>
                  <span>Liked Products</span>
                  <button onClick={() => setIsDisplay2(false)}>X</button>
              </div>
           </section>
        </>
    )
}
export default LikedProducts;