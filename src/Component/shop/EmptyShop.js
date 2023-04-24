import React from "react";
import {Link} from "react-router-dom";
import "./emptyShop.scss"


const EmptyShop = () => {

    return (
        <>
            <div className={"wrapper"}>
                <h3>Your Shop is empty back to shopping!</h3>
                <Link to={"/products"}>Back to shopping</Link>
            </div>
        </>
    )

}

export default EmptyShop;