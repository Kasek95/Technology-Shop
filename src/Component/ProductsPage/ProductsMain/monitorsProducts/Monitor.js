import React,{useState} from "react";
import SingielMonitor from "./SingielMonitor";
import "./monitor.scss"


const Monitor = ({products, getProducts,likedProducts}) => {
    if(!products) return null
    return (
        <>
            {products.filter(product => product.product_category === "Monitor")
                .map(product => (
                    <SingielMonitor product={product} getProducts={getProducts} likedProducts={likedProducts}/>
                ))
            }

        </>

    )

}
export default Monitor;