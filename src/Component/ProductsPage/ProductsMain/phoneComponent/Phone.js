import React, {useState} from "react";
import CardPhone from "./CardPhone";


const Phone = ({products,getProducts, likedProducts}) => {

    return (
        <>
            {products.items.filter(product => product.product_category === "Phone")
                .map(product => (
                    <CardPhone  product={product} getProducts={getProducts} likedProducts={likedProducts}/>
                ))
            }
        </>
    )
}
export default Phone;