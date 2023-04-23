import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserPage from "./Component/userPage/UserPage";
import ProductsPage from "./Component/ProductsPage/ProductsPage";
import Header from "./Component/header/Header";
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";
import userReducer from "./features/user"
import productReducer from "./features/listOfProduct"
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from "react-router-dom";
const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    }
})


const router = createBrowserRouter([
    {
        element:  <Header />,
        children: [  {
            path: "/",
            element: <App/>
        },
            {
                path: "/user",
                element: <UserPage/>
            },
            {
                path: "/products",
                element: <ProductsPage/>
            }]
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
         <RouterProvider router={router}/>
     </Provider>
  </React.StrictMode>
);

