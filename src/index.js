import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserPage from "./Component/userPage/UserPage";
import ProductsPage from "./Component/ProductsPage/ProductsPage";
import {
    createBrowserRouter,
    RouterProvider,
    Route
} from "react-router-dom";

const router = createBrowserRouter([
    {
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
    }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);

