import React, {useEffect, useState} from "react";
import supabase from "../../../../../supabase";
import "./removeProducts.scss"
import {getAllProducts} from "../../../../../features/listOfProduct";
import {useDispatch, useSelector} from "react-redux";

const RemoveProduct = ({setIsDisplay}) => {
    const [editProduct, setEditProduct] = useState({
        id: "",
        products_name: "",
        products_price: "",
        products_info: "",
        products_img: "",
        product_category: "",
        products_year: "",
    })
    const [search,setSearch] = useState("")
    const [hide,setHide] = useState(false)
    const product = useSelector((state)=>state.product.value)
    const dispatch = useDispatch()


    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        const { data } = await supabase.from("products").select();
        dispatch(getAllProducts({items:data}))

    }
    async function getBase64ImageFromUrl(imageUrl) {
        const res = await fetch(imageUrl);
        const blob = await res.blob();

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.addEventListener(
                "load",
                function () {
                    resolve(reader.result);
                },
                false
            );

            reader.onerror = () => {
                return reject(this);
            };
            reader.readAsDataURL(blob);
        });
    }

    const removeProduct = async (id) => {
       const {data} = await  supabase
           .from("products")
           .delete()
           .eq("id", id)

        getProducts()
    }

    const getEditProduct = (product) => {
        setEditProduct({
                id: product.id,
                products_name: product.products_name,
                products_price: product.products_price,
                products_info: product.products_info,
                products_img: product.products_img,
                product_category:product.product_category,
                products_year: product.products_year,
        })
        setHide(true)

    }
    const fileSelectedHandler = async (e) => {
        let img = URL.createObjectURL(e.target.files[0])
        const imgBase64 = await getBase64ImageFromUrl(img)
        setEditProduct((prevEditProducts) => ({
            ...prevEditProducts,
            products_img: imgBase64
        }));
    };
    const onSubmit = async (e) => {
        e.preventDefault()

        const {data} = await  supabase
            .from("products")
            .update({
                products_name: editProduct.products_name,
                products_price: editProduct.products_price,
                products_info: editProduct.products_info,
                products_img: editProduct.products_img,
                product_category: editProduct.product_category,
                products_year: editProduct.products_year,

            })
            .eq("id", editProduct.id)
        setEditProduct({
            id: "",
            products_name: "",
            products_price: "",
            products_info: "",
            products_img: "",
            product_category: "",
            products_year: "",
        })
        setHide(false)
        getProducts()
    }

    if(!product.items) return null

    return (
        <>

            <ul className={hide ? "remove-List hide": "remove-List"}>
                <i onClick={() => setIsDisplay(false)} className="hideDeletePanel fa-solid fa-x"></i>
                <input onChange={(e) => setSearch(e.target.value)} value={search} type={"text"} placeholder={"Search product"}/>
                {product.items.filter(product => {
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
                                <div className={"btnContainer"}>
                                    <button onClick={() => getEditProduct(product)} className={"editBtn"}><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button onClick={() => removeProduct(product.id)} className={"delete"}><i className="fa-solid fa-x"></i></button>
                                </div>
                            </li>
                    ))
                }
            </ul>
            {editProduct === null ? null :  <form onSubmit={onSubmit} className={hide ? "editForm" : "editForm hide"}>
                <i onClick={() =>setHide(false)} className="fa-solid fa-x"></i>
                <div className={"customInput"}>
                    <label htmlFor={"ProductsName"}>Product Name</label>
                    <input
                        type={"text"}
                        value={editProduct.products_name}
                        name={"ProductsName"}
                        id={"ProductsName"}
                        onChange={e => setEditProduct({...editProduct, products_name: e.target.value})}
                    />
                </div>
                <div className={"customInput"}>
                    <label htmlFor={"ProductsPrice"}>Product Price</label>
                    <input
                        type={"number"}
                        id={"ProductsPrice"}
                        value={editProduct.products_price}
                        name={"ProductsPrice"}
                        onChange={e => setEditProduct({...editProduct, products_price: e.target.value})}
                    />
                </div>

                <div className={"customInput"}>
                    <label htmlFor={"ProductsYear"}>Product Year</label>
                    <input
                        type={"number"}
                        id={"ProductsYear"}
                        value={editProduct.products_year}
                        name={"ProductsYear"}
                        onChange={e => setEditProduct({...editProduct, products_year: e.target.value})}
                    />
                </div>

                <div className={"customTextArea"}>
                    <label htmlFor={"ProductsInfo"}>Product Info</label>
                    <textarea
                        rows={6}
                        id={"ProductsInfo"}
                        value={editProduct.products_info}
                        name={"ProductsInfo"}
                        onChange={e => setEditProduct({...editProduct, products_info: e.target.value})}
                    />
                </div>

                <div className={"customInput"}>
                    <label htmlFor={"ProductsImg"}>Product IMG</label>
                    <input id={"ProductsImg"} onChange={fileSelectedHandler} type={"file"}  name={"ProductsImg"}/>
                </div>

                <div className={"customSelect"}>
                       <select
                           value={editProduct.product_category}
                           onChange={e => setEditProduct({...editProduct,product_category: e.target.value})}
                       >
                           <option value="Phone">Phone</option>
                           <option value="Monitor">Monitor</option>
                           <option value="Head-Set">Head-Set</option>
                       </select>
                </div>



                <button type={"submit"} className={"saveBtn"}>Save</button>
            </form>
            }

        </>
    )

}
export default RemoveProduct;