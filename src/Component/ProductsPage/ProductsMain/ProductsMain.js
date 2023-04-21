import React from "react";
import  "./productsMain.scss"

const ProductsMain = () => {

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
                            <article className={"allCategorys"}></article>
                            <article className={"singielCategoryMonitor"}></article>
                            <article className={"singielCategoryHead-Set"}></article>
                            <article className={"singielCategoryPhone"}></article>
                      </section>
                </section>
          </main>
        </>
    )
}
export default ProductsMain;
