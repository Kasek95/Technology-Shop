import "./searchBar.scss"
import React, {useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";
import {Link} from "react-router-dom";


const SearchBar = ({search,products}) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const handleClick = (type) => {
        setSearchParams({type});
    };
    if(!products) return null;
    return (
        <>

                 <ul className={"searchList"}>
                     {
                         products.filter((product) => {
                             if(search == "") {
                                 return product
                             } else if(product.products_name.toLowerCase().includes(search.toLowerCase())){
                                 return product;
                             }
                         }).map(product=>

                             search === "" ? null : <Link to={`/products?type=${product.product_category}`} key={product.id} className={"list-item"} onClick={() => handleClick(product.product_category)}>
                                 <span>{product.products_name}</span>
                                 <img src={product.products_img}/>
                             </Link>

                         )
                     }
                 </ul>

        </>
    )
}

export default SearchBar;