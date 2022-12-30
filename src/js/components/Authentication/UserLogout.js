import React, { useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';

const UserLogout = () => {
    
    const navigate = useNavigate();
    const { user, userMakeLogout } = useContext( AuthContext );

    function logout()
    {
        userMakeLogout();
        navigate( '/' );
    }
    
    useEffect( () => {
        logout();
    });
}

export default UserLogout;
