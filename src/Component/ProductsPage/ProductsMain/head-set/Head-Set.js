import React from "react";
import HeadSetCard from "./Head-SetCard";

const HeadSet = ({products,likedProducts,getProducts}) => {
    return (
        <>
            {products.items.filter(product => product.product_category === "Head-Set")
                .map(product => (
                    <HeadSetCard product={product} getProducts={getProducts} likedProducts={likedProducts}/>
                ))
            }
            </>
    )
}

export default HeadSet