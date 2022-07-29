import React, { createContext } from "react";

import { useLocalStorage } from '../hooks/useLocalStorage';

export const AuthContext = createContext();

export const AuthProvider = ({
    children,
}) => {
    const [auth, setAuth] = useLocalStorage( 'auth', {} );

    const userMakeLogin = ( authData ) => {
       setAuth( authData );
    };
    
    const userMakeLogout = () => {
       setAuth( {} );
    };
    
    return (
        <AuthContext.Provider value={{user: auth, userMakeLogin, userMakeLogout }}>
            {children}
        </AuthContext.Provider>
    );
}
