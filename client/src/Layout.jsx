import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "./components/customComponents";
import UserContextProvider from "./context/userContext/UserContextProvider";
function Layout() {
    return (
        <>
        <UserContextProvider>
            <Header />
            <Outlet />
            <Footer />
        </UserContextProvider>
        </>
    )
}

export default Layout