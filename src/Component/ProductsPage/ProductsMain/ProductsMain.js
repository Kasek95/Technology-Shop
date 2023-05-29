import React, {useEffect, useState} from "react";
import  "./productsMain.scss"
import supabase from "../../../supabase";
import AllProducts from "./allProductComponent/AllProducts";
import Monitor from "./monitorsProducts/Monitor";
import HeadSet from "./head-set/Head-Set";
import Phone from "./phoneComponent/Phone";
import {useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts,updateIsLiked} from "../../../features/listOfProduct";

const ProductsMain = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [displayAllProduct,setDisplayAllProduct] =useState(false);
    const [showMonitors,setShowMonitors] = useState(false);
    const [showPhones,setShowPhones] = useState(false);
    const [showHeadSet,setShowHeadSet] = useState(false);

    const product = useSelector((state)=>state.product.value)
    const dispatch = useDispatch()


   const showMonitor = () => {
       setDisplayAllProduct(true)
       setShowMonitors(true)
       setShowPhones(false)
       setShowHeadSet(false)
       setSearchParams({type: 'Monitor'});

   }

    const showAll = () => {
        setDisplayAllProduct(false)
        setShowMonitors(false)
        setShowPhones(false)
        setShowHeadSet(false)
        searchParams.delete('type')
    }
    const showPhone = () => {
        setDisplayAllProduct(true)
        setShowMonitors(false)
        setShowPhones(true)
        setShowHeadSet(false)
        setSearchParams({type: 'Phone'});
    }
    const showHead = () => {
        setDisplayAllProduct(true)
        setShowMonitors(false)
        setShowPhones(false)
        setShowHeadSet(true)
        setSearchParams({type: 'Head-Set'});

    }

    useEffect(() => {
        switch (searchParams.get('type')) {
            case 'Monitor':
                showMonitor()
                break;
            case 'Phone':
                showPhone()
                break;
            case 'Head-Set':
                showHead()
                break;
            default:
                showAll()
        }
    }, [searchParams]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        dispatch(getAllProducts({items:data}))

    }

    const likeProducts = async (id)=> {
        dispatch(updateIsLiked(id))
        const findProducts = product.items.find(el => el.id === id)
        const {data,error} = await supabase
            .from("products")
            .update({
                isLiked: !findProducts.isLiked
                })
            .eq("id",id)

        getProducts()
    }


    if(!product) return  null
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
