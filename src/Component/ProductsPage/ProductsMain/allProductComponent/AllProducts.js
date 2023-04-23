import React from "react";
import SingielProduct from "./SingielProduct";


const AllProducts = ({products,getProducts,likedProducts}) => {
    if(!products) return null
    return (
        <>
            {products.items.map(product => (
                <SingielProduct product={product} getProducts={getProducts} likedProducts={likedProducts}/>
            ))}
        </>
    )

}

export default AllProducts;