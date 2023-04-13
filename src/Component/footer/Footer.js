import "./footer.scss"
import React from "react";
import payment from "../assets/payments.png"



const Footer = () => {

    return  (
        <>
            <footer>

                <section className={"footerContainer container"}>
                    <article id={"about"} className={"About "}>
                        <span>About</span>
                        <p>Voluptatem accusantium doloremque laudantium,
                            totam rem aperiam, eaque ipsa quae ab illo inventore
                            veritatis et quasi architecto beatae vitae dicta sunt
                            explicabo eaque ipsa quae ab illo.</p>
                    </article>
                    <article className={"contact"}>
                        <span>Contact</span>
                        <div className={"contact-cont"}>
                            <div className={"place"}>
                                    <i className="fa-solid fa-location-arrow"></i>
                                    <p>
                                    Kayaloram Rd, Punnamada, Kottankulangara, Alappuzha, Kerala, 688006
                                    </p>
                            </div>
                            <div className={"phone"}>
                                <i className="fa-solid fa-mobile"></i>
                                <p>Phone: 0471 272 0261</p>
                            </div>
                            <div className={"email"}>
                                <i className="fa-solid fa-envelope"></i>
                                <p>Email: store@jsdev.com</p>
                            </div>
                        </div>
                    </article>

                    <article className={"categoris"}>
                        <span>Category's</span>
                        <a href={"#"}>Head-Sets</a>
                        <a href={"#"}>Monitors</a>
                        <a href={"#"}>Phones</a>
                    </article>
                </section>


                <article className={"payment"}>
                   <div className={"methods container"}>
                       <span>Technology Shop 2022 CREATED BY Paweł Kąsek. PREMIUM E-COMMERCE SOLUTIONS.</span>
                       <img src={payment} alt={"Payment methods"}/>
                   </div>
                </article>

            </footer>
        </>
    )
}

export default Footer;