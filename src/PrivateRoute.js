import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { hasRole, isLoggedIn } from './auth'; // Adjust the import according to your file structure

const PrivateRoute = ({ children, roles }) => {
    let location = useLocation();
    
    // Ensure roles is defined and is an array
    if (!Array.isArray(roles)) {
        roles = [];
    }

    // Check if the user is logged in
    if (!isLoggedIn()) {
        return <Navigate to="/signin" state={{ from: location }} />;
    }

    // Check if the user has the required roles
    if (roles.length === 0 || roles.some(role => hasRole(role))) {
        return children;
    } else {
        return <Navigate to="/unauthorized" state={{ from: location }} />;
    }
};

export default PrivateRoute;
