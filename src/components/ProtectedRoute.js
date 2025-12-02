import { Navigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react';
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        // Redirect to login if not logged in
        return <Navigate to='/login' replace />;
    }

    if (roles && !roles.includes(user.role)) {
        // Redirect to dashboard if user role not allowed
        return <Navigate to='/dashboard' replace />;
    }

    return children; // Render protected content
}

export default ProtectedRoute;
