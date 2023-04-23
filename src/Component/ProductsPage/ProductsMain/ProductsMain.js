import React, {useEffect, useState} from "react";
import  "./productsMain.scss"
import supabase from "../../../supabase";
import AllProducts from "./allProductComponent/AllProducts";
import Monitor from "./monitorsProducts/Monitor";
import HeadSet from "./head-set/Head-Set";
import Phone from "./phoneComponent/Phone";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../../features/listOfProduct";

const ProductsMain = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [products, setProducts] = useState();
    const [displayAllProduct,setDisplayAllProduct] =useState(false);
    const [showMonitors,setShowMonitors] = useState(false);
    const [showPhones,setShowPhones] = useState(false);
    const [showHeadSet,setShowHeadSet] = useState(false);
    (searchParams.get('type'));
    const product = useSelector((state)=>state.product.value)
    const dispatch = useDispatch()


   const showMonitor = () => {
       setDisplayAllProduct(true)
       setShowMonitors(true)
       setShowPhones(false)
       setShowHeadSet(false)
   }

    const showAll = () => {
        setDisplayAllProduct(false)
        setShowMonitors(false)
        setShowPhones(false)
        setShowHeadSet(false)
    }
    const showPhone = () => {
        setDisplayAllProduct(true)
        setShowMonitors(false)
        setShowPhones(true)
        setShowHeadSet(false)
    }
    const showHead = () => {
        setDisplayAllProduct(true)
        setShowMonitors(false)
        setShowPhones(false)
        setShowHeadSet(true)
    }



    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        dispatch(getAllProducts({items:data}))

    }

    const likeProducts = async (id)=> {
        const findProducts = product.items.find(el => el.id === id)
        const {data,error} = await supabase
            .from("products")
            .update({
                isLiked: !findProducts.isLiked
                })
            .eq("id",id)

        getProducts()
    }


    if(!product.items) return  null
    return (
        <>
          <main className={"products-main"}>
                <section className={"allProducts container"}>
                      <section className={"categoryOfProducts"}>
                          <span onClick={showAll} >All Categories</span>
                          <span onClick={showHead}>Head-Set</span>
                          <span onClick={showMonitor} >Monitors</span>
                          <span onClick={showPhone}>Phones</span>
                      </section>
                      <section className={"singielProductsCategory"}>
                            <article className={displayAllProduct ? "allCategorys hide" : "allCategorys"}>
                                <AllProducts  products={product} getProducts={getProducts} likedProducts={likeProducts}/>
                            </article>
                            <article className={showMonitors ? "singielCategoryMonitor" : "singielCategoryMonitor hide"}>
                                <Monitor products={product} getProducts={getProducts} likedProducts={likeProducts}/>
                            </article>
                            <article className={showHeadSet ?  "singielCategoryHead-Set" : "singielCategoryHead-Set hide"}>
                                <HeadSet products={product} getProducts={getProducts}  likedProducts={likeProducts}/>
                            </article>
                            <article className={showPhones ? "singielCategoryPhone" : "singielCategoryPhone hide"}>
                                <Phone products={product} getProducts={getProducts} likedProducts={likeProducts}/>
                            </article>
                      </section>
                </section>
          </main>
        </>
    )
}
export default ProductsMain;
