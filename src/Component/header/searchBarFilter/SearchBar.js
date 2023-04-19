import "./searchBar.scss"
import React, {useEffect, useState} from "react";


const SearchBar = ({search,products}) => {

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

                             search === "" ? null : <li key={product.id} className={"list-item"}>
                                 <span>{product.products_name}</span>
                                 <img src={product.products_img}/>
                             </li>

                         )
                     }
                 </ul>

        </>
    )
}

export default SearchBar;