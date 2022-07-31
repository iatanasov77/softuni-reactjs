import { useState } from 'react';

/**
 * How to Set Expiry Time (TTL) for LocalStorage With Javascript
 * ==============================================================================
 * https://www.sohamkamani.com/blog/javascript-localstorage-with-ttl-expiry/
 */
export const useLocalStorage = ( key, defaultValue ) => {
    
    const [value, setValue] = useState( () => {
        const storedData    = localStorage.getItem( key );
        
        return storedData ? JSON.parse( storedData ) : defaultValue;
    });
    
    const setLocalStorageValue = ( newValue ) => {
        localStorage.setItem( key, JSON.stringify( newValue ) );
        
        setValue( newValue );
    };
    
    return [
        value,
        setLocalStorageValue,
    ];
}
