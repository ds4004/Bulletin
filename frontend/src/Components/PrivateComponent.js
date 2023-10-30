import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const auth = localStorage.getItem('user');

    // An <Outlet> should be used in parent route elements to render their child route elements.
    return auth ? <Outlet />:<Navigate to="/signup" />
}

export default PrivateComponent;