import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Shop from "../shop/Shop";
import LikedProducts from "../likedProducts/LikedProducts";
import SearchBar from "./searchBarFilter/SearchBar";
import "./header.scss"
import supabase from "../../supabase";

const Header = ({products}) => {
    const [isDisplay, setIsDisplay ] = useState(false)
    const [isDisplay2, setIsDisplay2] = useState(false)
    const [basket, setBasket] = useState(false)
    const [searchProducts, setSearchProducts] = useState("")



    const setShow = (item) => {
        setBasket(item)
    }
    const setLikesClose = (item) => {
        setIsDisplay2(item)
    }


    return (
        <>

            <header>
                <section className={"nav-container container"}>
                    <nav>
                        <Link className={"logo"} to={"/"}>Technology <span>Shop</span></Link>
                        {isDisplay ? <i className="fa-solid fa-x" onClick={() => setIsDisplay(false)}></i> : <i className="fa-solid fa-bars" onClick={() => setIsDisplay(true)}></i>}
                        <ul className={isDisplay ? "list-navigation show" : "list-navigation"}>
                            <li>
                                <a className={"link"} href={"#about"}>About</a>
                                <Link className={"link"} to={"/products"}>Products</Link>
                            </li>
                        </ul>
                    </nav>
                    <section className={"findProducts"}>

                        <div className={"findProductsContainer"}>
                            <input onChange={(e) => setSearchProducts(e.target.value) }
                                   value={searchProducts}
                                   placeholder={"Search Products"}/>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                        <SearchBar search={searchProducts} products={products}/>
                    </section>

                    <section className={"interface"}>
                        <section className={"user"}>
                           <Link to={"/user"}> <i className="fa-regular fa-circle-user"></i></Link>
                        </section>
                        <section  className={"shop"}>
                            <div  className={"shop-container"}>
                                <span></span>
                                <i onClick={() => setBasket(true)}
                                   className="fa-brands fa-shopify">

                                </i>
                                <Shop
                                    basket={basket}
                                    setBasket={setShow}
                                />
                            </div>
                        </section>
                        <section className={"likes-products"}>
                            <i onClick={() => setIsDisplay2(true)}
                               className="fa-regular fa-heart">
                            </i>
                            <LikedProducts
                                isDisplay2={isDisplay2}
                                setIsDisplay2={setLikesClose}
                            />
                        </section>
                    </section>
                </section>

            </header>

        </>
    )
}

export default Header;