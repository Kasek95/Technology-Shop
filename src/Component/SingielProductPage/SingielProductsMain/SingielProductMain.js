import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Slider from "react-slick";
import {useDispatch, useSelector} from "react-redux";
import {updateIsLiked, updateItemNumber} from "../../../features/listOfProduct";
import {Form,Formik} from "formik";
import {settings} from "./setting";
import supabase from "../../../supabase";
import {Link} from "react-router-dom";
import "./singielProduct.scss"
import {addOpinionValidation} from "./validationAddOpinion";
import CustomSelect from "../../userPage/UserPanel/panel/addProductForm/customSelect/CustomSelect";
import CustomInput from "../../userPage/UserPanel/RegistrationForm/CustomInput";
import CustomTextArea from "./CustomTextArea";


const SingielProductMain = ({getProducts,getOpinion}) => {
    const dispatch =  useDispatch()
    const {productId} = useParams()
    const [counter,setCounter] = useState(1)
    const [isDisplay, setIsDisplay] = useState(false)
    const products = useSelector((state)=>state.product.value.items)
    const opinions = useSelector((state) => state.opinions.value.opinions)
    const searchedProduct = products.find(el => el.id == productId)
    const currentDate = new Date()
    const date = `${currentDate.getFullYear()}-${currentDate.getMonth() +1}-${currentDate.getDay()}`






    const likeProducts = async (id)=> {
        dispatch(updateIsLiked(id))
        const findProducts = products.find(el => el.id === id)
        const {data,error} = await supabase
            .from("products")
            .update({
                isLiked: !findProducts.isLiked
            })
            .eq("id",id)

        getProducts()
    }
    const addToBasket = async (product) => {
        dispatch(updateItemNumber({id: product.id, counter}))

        const {data, error} = await supabase
            .from("products")
            .update({
                inShop: true,
                product_qty: product.product_qty + counter
            })
            .eq("id", product.id)
        getProducts()
        setCounter(1)
    }
    const onSubmit = async (values,actions) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        await supabase.from("opinions").insert({
            opinion: values.description,
            productId: searchedProduct.id,
            rating: values.rating,
            userName: values.userName,
            year: date,
        })
        getOpinion()
        getProducts()
        actions.resetForm()
        setIsDisplay(false)
    }
    const closeForm = () => {
        setIsDisplay(false)

    }

    if(!searchedProduct) return null
    const otherProduct = products.filter(el => el.id !== searchedProduct.id && el.product_category === searchedProduct.product_category)
    const opinionsForSearchedProduct = opinions.filter(el => el.productId === searchedProduct.id)
    const overallRate = opinionsForSearchedProduct.map(el => el.rating * 1).reduce((a,b) => a + b, 0) / opinionsForSearchedProduct.length;

    return (
        <>
            <main className={"singielProduct-Main"}>
                <section className={"singielProductContainer container"}>
                    <i onClick={()=> likeProducts(searchedProduct.id)} className={searchedProduct.isLiked ? "fa-solid fa-heart icon red" : "fa-regular fa-heart icon"}></i>
                    <h2>{searchedProduct.products_name}</h2>
                    <h3>Description</h3>
                    <div className={"rate"}>
                        <span><strong>Rating</strong>: {overallRate.toFixed(2)}<i className="fa-sharp fa-solid fa-star"></i></span>
                        {opinionsForSearchedProduct.length === 1 ? <p><strong>Product have</strong>: {opinionsForSearchedProduct.length} opinion</p> : <p><strong>Product have</strong>: {opinionsForSearchedProduct.length} opinions</p>}
                    </div>
                    <div className={"description"}>
                        <img src={searchedProduct.products_img} alt={searchedProduct.products_name}/>
                        <span>{searchedProduct.products_info}</span>
                    </div>
                    <article className={"OrderBox"}>
                        <div className={"inputBox"}>
                            <button disabled={counter === 1 ? true : false} onClick={()=>setCounter(prevCounter => prevCounter - 1)}  className={"decrease"}><i className="fa-solid fa-minus"></i></button>
                            <input  value={counter} type="number"/>
                            <button onClick={()=> setCounter(prevCounter => prevCounter + 1)} className={"increase"}><i className="fa-solid fa-plus"></i></button>
                        </div>
                        <button onClick={()=>addToBasket(searchedProduct)} className={"addToBasket"}>Add To Basket</button>
                        <span>Price:<strong> {searchedProduct.products_price}$</strong></span>
                    </article>

                   <section className={"opinion"}>
                       <h3>Opinions</h3>
                       <ul className={"opinionList"}>
                           {opinionsForSearchedProduct.length === 0 ? null : opinionsForSearchedProduct.map(el => (
                               <li key={el.id} className={"opinionContainer"}>
                                   <div className={"rating"}>
                                       <h4>{el.userName}</h4>
                                       <span>{el.rating}<i className="fa-sharp fa-solid fa-star"></i></span>
                                   </div>
                                    <span className={"descriptionOpinion"}>{el.opinion}</span>
                                   <p>Added: {el.year} </p>
                               </li>
                           ))}
                       </ul>
                       <section className={isDisplay ? "addOpinionForm show" : "addOpinionForm"}>
                           <Formik
                               initialValues={{
                                   userName: "",
                                   description: "",
                                   rating: ""
                               }}
                               validationSchema={addOpinionValidation}
                               onSubmit={onSubmit}
                           >
                               {({ isSubmitting }) => (
                                   <Form className={"form"}>
                                          <button type={"reset"} onClick={closeForm}  className={"closeForm"}>X</button>
                                           <div className={"input"}>
                                               <CustomInput
                                                label={"Username"}
                                                type={"text"}
                                                name={"userName"}
                                                placeholder={"Write your username"}
                                               />
                                           </div>

                                          <div className={"textArea"}>
                                              <CustomTextArea
                                               label={"Description"}
                                               name={"description"}
                                               placeholder={"Write your opinion"}
                                              />
                                          </div>


                                           <div className={"select"}>
                                               <CustomSelect
                                                   label="Rating"
                                                   name="rating"
                                               >
                                                   <option value="">Please select a number</option>
                                                   <option value={1}>1</option>
                                                   <option value={2}>2</option>
                                                   <option value={3}>3</option>
                                                   <option value={4}>4</option>
                                                   <option value={5}>5</option>
                                               </CustomSelect>
                                           </div>
                                          <button type={"submit"} className={"add"}>Send Opinion</button>
                                   </Form>
                               )}

                           </Formik>
                       </section>
                       <button onClick={()=> setIsDisplay(true)} className={"addOpinion"}>Add your opinion</button>
                   </section>

                    <section className={"otherProducts"}>
                        <h3>Other Products</h3>
                         <article className={"sliderCarousel"}>
                             {otherProduct.length === 0 ? null :
                                 <section className={"slider"}>
                                     <Slider {...settings}>
                                         {otherProduct.map(el => (
                                             <div key={el.id} className={"productContainer"}>
                                                 <i  onClick={()=> likeProducts(el.id)} className={el.isLiked ? "fa-solid fa-heart icon red" : "fa-regular fa-heart icon"}></i>
                                                 <div className={"imgContainer"}>
                                                     <img src={el.products_img} alt={el.products_name}/>
                                                 </div>
                                                 <div className={"Info"}>
                                                     <h3>{el.products_name}</h3>
                                                     <Link to={`/products/${el.id}`}>Check</Link>
                                                 </div>
                                             </div>
                                         ))}
                                     </Slider>
                                 </section>
                             }

                         </article>
                    </section>


                    <div className={"linkAction"}>
                        <Link className={"link"} to={"/"}>Home</Link>
                        <Link className={"link"} to={"/products"}>Back to Products</Link>
                    </div>
                </section>
            </main>
        </>
    )
}

export default SingielProductMain