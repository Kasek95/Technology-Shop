import React, {useEffect, useState} from "react";
import Footer from "../footer/Footer";
import SingielProductMain from "./SingielProductsMain/SingielProductMain";
import supabase from "../../supabase";
import {getAllProducts} from "../../features/listOfProduct";
import {getOpinions} from "../../features/opinions";
import {useDispatch} from "react-redux";

const SingielProduct = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getOpinion()
    }, [])

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        dispatch(getAllProducts({items:data}))
    }

    async function getOpinion(){
        const  {data} = await supabase.from("opinions").select()
        dispatch(getOpinions({opinions:data}))
    }
    return (
        <>
            <SingielProductMain getOpinion={getOpinion} getProducts={getProducts}/>
            <Footer/>
        </>
    )

}

export default SingielProduct;
