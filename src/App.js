import React, {useState,useEffect} from "react";
import Header from "./Component/header/Header";
import Main from "./Component/main/Main";
import Footer from "./Component/footer/Footer";
import supabase from "./supabase";
import "./Component/sass/_base.scss"
import "./Component/sass/_mixin.scss"


function App() {

    const [products, setProducts] = useState(null)
    const [errors, setErros] = useState(null)


        useEffect(()=> {
             const fetchProducts =async () => {
                 const {data,error} = await  supabase.from("products").select()
                  if(error) {
                      setErros("Cannot reach products")
                      setProducts(null)
                      console.log(error)
                  }
                  if(data){
                      setProducts(data)
                      setErros(null)
                      console.log(data)
                  }

             }
             fetchProducts()

        },[])


  return (
        <>
            <Header/>
            <Main/>
            <Footer/>
        </>
  );
}

export default App;
