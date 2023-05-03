import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";

const ProductCard = ({el,addLikedProduct,addToBasket}) => {

    return (
        <>
            <div className={"cardContainer"} key={el.id}>
                <div className={"icon"}>
                    <i onClick={() => addLikedProduct(el.id)}
                       className={el.isLiked ? "fa-solid fa-heart red" : "fa-regular fa-heart"}>
                    </i>
                </div>
                <div className={"img"}>
                    <img src={el.products_img} alt={el.products_img}/>
                </div>
                <h3>{el.products_name}</h3>
                <span>Price: {el.products_price}$</span>
                <div className={"action"}>
                    <button className={"btn"} onClick={()=> addToBasket(el.id)}>Add to Basket</button>
                    <Link className={"btn"} to={`/products/${el.id}`}>Check</Link>
                </div>
            </div>
        </>
    )

}
export default ProductCard;
