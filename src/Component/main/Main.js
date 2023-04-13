import React from "react";
import Banner from "./welcomSection/Banner";
import Products from "./products/Products";
import NewsLetter from "./newsletter/NewsLetter";


const Main =() => {
    return (
        <>
            <main>
                <Banner/>
                <Products/>
                <NewsLetter/>
            </main>
        </>
    )
}
export default Main;
