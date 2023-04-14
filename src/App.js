import React, {useState,useEffect} from "react";
import Header from "./Component/header/Header";
import Main from "./Component/main/Main";
import Footer from "./Component/footer/Footer";
import supabase from "./supabase";
import "./Component/sass/_base.scss"
import "./Component/sass/_mixin.scss"


function App() {
    const [products,setProducts] = useState([])

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        setProducts(data);
    }


    return (
        <>
            <Header products={products} />
            <Main/>
            <Footer/>
        </>
  );
}

export default App;
