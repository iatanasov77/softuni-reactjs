import { apiUrl } from './Constants';

export const login = ( formData, successCallback, errorCallback ) => {
    const requestOptions = {
        method:     'POST',
        headers:    { 'Content-Type': 'application/json' },
        body:       JSON.stringify( formData )
    };
    
    fetch( `${apiUrl}/login_check`, requestOptions )
        .then( response => response.json() )
        .then( data => successCallback( data ) );
}

export const register = ( formData, successCallback, errorCallback ) => {
    const requestOptions = {
        method:     'POST',
        headers:    { 'Content-Type': 'application/json' },
        body:       JSON.stringify( formData )
    };
    
    fetch( `${apiUrl}/users/register`, requestOptions )
        .then( response => response.json() )
        .then( data => successCallback( data ) );
}
