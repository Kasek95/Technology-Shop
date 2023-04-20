import React, {useEffect, useState} from "react";
import supabase from "../../../../../supabase";
import "./removeProducts.scss"

const RemoveProduct = ({setIsDisplay}) => {
    const [products, setProducts] = useState()
    const [search,setSearch] = useState("")

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        setProducts(data);
    }

    const removeProduct = async (id) => {
       const {data} = await  supabase
           .from("products")
           .delete()
           .eq("id", id)

        getProducts()
    }

    if(!products) return null

    return (
        <>

            <ul className={"remove-List"}>
                <i onClick={() => setIsDisplay(false)} className="hideDeletePanel fa-solid fa-x"></i>
                <input onChange={(e) => setSearch(e.target.value)} value={search} type={"text"} placeholder={"Search product"}/>
                {products.filter(product => {
                        if(search === "") {
                            return product
                        }else if(product.products_name.toLowerCase().includes(search.toLowerCase())){
                            return product
                        }
                    })
                    .map(product => (
                            <li key={product.id} className={"removeListItem"}>
                                <div className={"item_Info"}>
                                    <img src={product.products_img} alt={product.products_category}/>
                                    <span>Product Name: {product.products_name}</span>
                                    <span>Price: {product.products_price}$</span>
                                </div>
                                <button onClick={() => removeProduct(product.id)} className={"delete"}><i className="fa-solid fa-x"></i></button>
                            </li>
                    ))
                }
            </ul>
        </>
    )

}
export default RemoveProduct;