import { Navigate } from "react-router-dom";
import { useContext } from "react";
import React from 'react'
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({children,roles}) => {

    const {user}=useContext(AuthContext);

    if(!user){
        return <Navigate to='/login' replace/>;
    }

    if(roles && !roles.includes(user.role)){
        return <Navigate to='/dashboard' replace/>;
    }
    
    return children;
}

export default ProtectedRoute;
