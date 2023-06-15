import React, {useEffect, useState} from "react";
import {Link, Outlet} from "react-router-dom";
import Shop from "../shop/Shop";
import LikedProducts from "../likedProducts/LikedProducts";
import SearchBar from "./searchBarFilter/SearchBar";
import "./header.scss"
import {useSelector,useDispatch} from "react-redux";
import supabase from "../../supabase";
import {getAllProducts} from "../../features/listOfProduct";



const Header = () => {
    const [isDisplay, setIsDisplay ] = useState(false)
    const [isDisplay2, setIsDisplay2] = useState(false)
    const [basket, setBasket] = useState(false)
    const [searchProducts, setSearchProducts] = useState("")
    const product = useSelector((state)=>state.product.value)
    const dispatch = useDispatch()
    const setSearch = () => {
        setSearchProducts("")
    }

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select().sort();
        dispatch(getAllProducts({items:data}))
    }
    const closeShop = (item) => {
        setBasket(item)
    }
    const closeLikeProducts = (item) => {
        setIsDisplay2(item)
    }

    const setShow = () => {
        setBasket(true)
        setIsDisplay2(false)
    }
    const setLikesClose = () => {
        setIsDisplay2(true)
        setBasket(false)
    }
    let inShop = product.items.filter(item => item.inShop === true)
    let sumOfProducts = inShop.map(el => el.product_qty * 1)



  if(!product.items) return null
    return (
        <>

            <header>
                <section className={"nav-container container"}>
                    <nav>
                        <Link className={"logo"} to={"/"}>Technology <span>Shop</span></Link>
                        {isDisplay ? <i className="fa-solid fa-x" onClick={() => setIsDisplay(false)}></i> : <i className="fa-solid fa-bars" onClick={() => setIsDisplay(true)}></i>}
                        <ul className={isDisplay ? "list-navigation show" : "list-navigation"}>
                            <li>
                                <a onClick={() => setIsDisplay(false) } className={"link"} href={"#about"}>About</a>
                                <Link onClick={()=> setIsDisplay(false)} className={"link"} to={"/products"}>Products</Link>
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
                        <SearchBar setSearch={setSearch} search={searchProducts} products={product.items}/>
                    </section>

                    <section className={"interface"}>
                        <section className={"user"}>
                           <Link to={"/user"}>
                               <i className="fa-regular fa-circle-user"></i>
                           </Link>
                        </section>
                        <section  className={"shop"}>

                                 {product.items.filter(item => item.inShop === true).length === 0 ? null :
                                    <div className={"productsInShop"}>
                                        <span>{sumOfProducts.reduce((a,b)=> a+b)}</span>
                                    </div>
                                 }
                                <i onClick={setShow}
                                   className="fa-brands fa-shopify">
                                </i>
                        </section>
                        <section className={"likes-products"}>
                            <i onClick={setLikesClose}
                               className="fa-regular fa-heart"
                            >
                            </i>
                            {product.items.filter(el => el.isLiked === true).length === 0 ? null :
                                <div className={"productsCounter"}>
                                    <span>{product.items.filter(el => el.isLiked === true).length}</span>
                                </div>
                            }

                        </section>
                    </section>
                </section>
                <LikedProducts
                    getProducts={getProducts}
                    products={product}
                    isDisplay2={isDisplay2}
                    setIsDisplay2={closeLikeProducts}
                />
                <Shop
                    getProducts={getProducts}
                    basket={basket}
                    setBasket={closeShop}
                    products={product}
                    sumOfProducts={sumOfProducts}
                />
            </header>
<Outlet />
        </>
    )
}

export default Header;