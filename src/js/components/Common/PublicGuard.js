import React, { useContext } from "react";
import { Navigate, Outlet } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const PublicGuard = () => {
    
    const { user } = useContext( AuthContext );
    
    if ( user.apiToken ) {
        return <Navigate to="/" replace />
    }
    
    return <Outlet />;
}

export default PublicGuard;
