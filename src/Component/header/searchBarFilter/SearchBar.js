import "./searchBar.scss"
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";


const SearchBar = ({search,products,setSearch}) => {

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

                             search === "" ? null : <Link onClick={setSearch} to={`/products/${product.id}`} key={product.id} className={"list-item"}>
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