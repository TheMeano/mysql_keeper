import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
  } from "react-router-dom";
import Update from "./components/Update";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./components/Register";
import Login from "./components/Login";
import { AuthContextProvider } from "./context/authContext";

const Layout = () =>{
    return(
        <>
            <AuthContextProvider>
            <Header />
            <Outlet />
            <Footer />
            </AuthContextProvider>
        </>
    )
}

const router = createBrowserRouter([
   {
    path: "/",
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <App />
        },
        {
            path: "/update/:id",
            element: <Update />
        },
        {
            path: "/register",
            element: <Register />
        },
        {
            path: "/login",
            element: <Login />
        }
    ]
   }
])

ReactDOM.render(<div className="app">
    <RouterProvider router={router} />
</div>, document.getElementById("root"));