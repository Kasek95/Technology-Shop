import React, {useEffect, useState} from "react";
import  "./productsMain.scss"
import supabase from "../../../supabase";
import AllProducts from "./allProductComponent/AllProducts";
import Monitor from "./monitorsProducts/Monitor";
import HeadSet from "./head-set/Head-Set";
import Phone from "./phoneComponent/Phone";

const ProductsMain = () => {
     const [products, setProducts] = useState()

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        setProducts(data);
    }

    const likeProducts = async (id)=> {
        const findProducts = products.find(el => el.id === id)
        const {data,error} = await supabase
            .from("products")
            .update({
                isLiked: !findProducts.isLiked
                })
            .eq("id",id)

        getProducts()
    }


    if(!products) return  null
    return (
        <>
          <main className={"products-main"}>
                <section className={"allProducts container"}>
                      <section className={"categoryOfProducts"}>
                          <span>All Categories</span>
                          <span>Head-Set</span>
                          <span>Monitors</span>
                          <span>Phones</span>
                      </section>
                      <section className={"singielProductsCategory"}>
                            <article className={"allCategorys"}>
                                <AllProducts products={products} getProducts={getProducts} likedProducts={likeProducts}/>
                            </article>
                            <article className={"singielCategoryMonitor"}>
                                <Monitor products={products} getProducts={getProducts} likedProducts={likeProducts}/>
                            </article>
                            <article className={"singielCategoryHead-Set"}>
                                <HeadSet products={products} getProducts={getProducts}  likedProducts={likeProducts}/>
                            </article>
                            <article className={"singielCategoryPhone"}>
                                <Phone products={products} getProducts={getProducts} likedProducts={likeProducts}/>
                            </article>
                      </section>
                </section>
          </main>
        </>
    )
}
export default ProductsMain;
