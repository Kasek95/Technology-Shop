import React from "react";
import "./products.scss"
import monitor from "../../assets/337912092_268168178868459_8084184389387433978_n.png"
import phone from "../../assets/339077469_214418724564913_5637508898114760834_n.png"
import headset from "../../assets/339071964_1275987013030099_1893502995452438114_n.png"


const Products = () => {

    return (
        <>
            <section className={"products"}>
                 <article className={"products-container container"}>
                        <div className={"categoryProducts"}>
                            <div className={"monitor card"}>
                                <img src={monitor} alt={"Monitor"}/>

                            </div>

                            <div className={"head-seat card"}>
                               <img src={headset} alt={"head set"}/>
                            </div>

                            <div className={"phone card"}>
                              <img src={phone} alt={"Phone"}/>
                            </div>



                        </div>
                 </article>

            </section>
        </>
    )

}

export default Products