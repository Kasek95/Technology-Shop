import React from "react"
import "./banner.scss"
import img1 from "../../assets/banner-img.png"

const Banner = () => {
    return (
        <>
            <section className="hero-banner">
                <div className="content container">
                    <div className="text-content">
                        <h1>SALES</h1>
                        <p>
                            Convallis interdum purus adipiscing dis parturient
                            posuere ac a quam a eleifend montes parturient posuere
                            curae tempor
                        </p>
                        <div className="ctas">
                            <button className="banner-cta">Read More</button>
                            <button className="banner-cta v2">Shop Now</button>
                        </div>
                    </div>
                    <img className="banner-img" src={img1} alt={"Słuchawki"}/>
                </div>
            </section>
        </>
    )
}
export default Banner