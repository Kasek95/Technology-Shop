import React, {useState} from "react";
import {Link} from "react-router-dom";
import Shop from "../shop/Shop";
import "./header.scss"

const Header = () => {
    const [isDisplay, setIsDisplay ] = useState(false)
    const [basket, setBasket] = useState(false)

    const setShow = (item) => {
        setBasket(item)
    }


    return (
        <>

            <header>
                <section className={"nav-container container"}>
                    <nav>
                        <Link className={"logo"} to={"/"}>Technology <span>Shop</span></Link>
                        {isDisplay ? <i className="fa-solid fa-x" onClick={() => setIsDisplay(false)}></i> :
                            <i className="fa-solid fa-bars" onClick={() => setIsDisplay(true)}></i>}

                        <ul className={isDisplay ? "list-navigation show" : "list-navigation"}>
                            <li>
                                <a className={"link"} href={"about"}>About</a>
                                <Link className={"link"} to={"products"}>Products</Link>
                            </li>
                        </ul>
                    </nav>
                    <section className={"findProducts"}>

                        <div className={"findProductsContainer"}>
                            <input  placeholder={"Search Products"}/>
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </section>

                    <section className={"interface"}>
                        <section className={"user"}>
                            <i className="fa-regular fa-circle-user"></i>
                        </section>
                        <section onClick={() => setBasket(true)} className={"shop"}>
                            <div className={"shop-container"}>
                                <span></span>
                                <i className="fa-brands fa-shopify"></i>
                                <Shop basket={basket} setBasket={setShow}/>
                            </div>
                        </section>
                        <section  className={"likes-products"}><i className="fa-regular fa-heart"></i></section>
                    </section>
                </section>

            </header>

        </>
    )
}

export default Header;