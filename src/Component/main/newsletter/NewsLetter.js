import "./newsletter.scss"
import React from "react";


const NewsLetter = () => {

    return (
        <>
          <section className={"newsletter"}>
             <div className={"newsLetterContent"}>
                 <span className={"small-text"}>Newsletter</span>
                 <span className={"big-Text"}>Sign up for latest updates and offers</span>
                 <form>
                     <input type={"text"} placeholder={"Email address"}/>
                     <button>Subscribe</button>
                 </form>
                 <span className={"privace"}>Will be used in accordance with our Privacy Policy</span>
                 <div className={"socialMediaContainer"}>
                     <a className={"icon"} href={"#"}><i className="fa-brands fa-linkedin-in"></i></a>
                     <a className={"icon"} href={"#"}><i className="fa-brands fa-facebook-f"></i></a>
                     <a className={"icon"} href={"#"}><i className="fa-brands fa-twitter"></i></a>
                    <a className={"icon"} href={"#"}><i className="fa-brands fa-instagram"></i></a>
                 </div>
             </div>

          </section>
        </>
    )

}

export default NewsLetter;