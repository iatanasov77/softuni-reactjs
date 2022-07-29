import React, { useEffect, useState, createContext, useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import * as tablatureService from '../services/tablatureService';
import { AuthContext } from './AuthContext';

export const TablaturesContext = createContext();

export const TablaturesProvider = ({
    children,
}) => {
    const { user } = useContext( AuthContext );
    const [tablatures, setTablatures] = useState( [] );
    
    const navigate = useNavigate();
    
    const location = useLocation();
    useEffect( () => {
        // console.log( 'Current Location: ' + location.pathname );
        
        switch( location.pathname ) {
            case '/':
                loadPublicTablatures();
                break;
            case '/tablatures':
                loadMyTablatures();
                break;
            case '/favorites':
                loadMyFavorites()
                break;
            default:
                // setTablatures( [] );
        }
    }, [location] );
    
    function loadPublicTablatures()
    {
        tablatureService.getPublished()
                        .then( result => {
                            //console.log( result );
                            setTablatures( result );
                        } );
    }
    
    function loadMyTablatures()
    {
        tablatureService.getMyTablatures( user.id )
                        .then( result => {
                            //console.log( result );
                            setTablatures( result );
                        } );
    }
    
    function loadMyFavorites()
    {
        tablatureService.getMyFavorites( user.id )
                        .then( result => {
                            //console.log( result );
                            setTablatures( result );
                        } );
    }
    
    const addTablatureHandler = ( formData ) => {
        //console.log( Object.fromEntries( formData ) );
        
        tablatureService.createTablature(
            formData,
            function( response ) {
                navigate( '/tablatures' );
                $( '#btnSubmitTablature' ).dropdown( 'toggle' );
                
                document.location.reload();
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
    };
    
    const updateTablatureHandler = ( tabId, formData ) => {
        tablatureService.updateTablature(
            tabId,
            formData,
            function( response ) {
                navigate( '/tablatures' );
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
    };
    
    const deleteTablatureHandler = ( tabId ) => {
    
        tablatureService.deleteTablature( tabId )
                        .then( result => {
                            //console.log( result );
                            if ( result.status == 'success' ) {
                                navigate( '/tablatures' );
                                
                                document.location.reload();
                            } else {
                                alert( 'ERROR !!!' ); 
                            }
                        } );
    };
    
    return (
        <TablaturesContext.Provider value={{tablatures: tablatures, addTablatureHandler, updateTablatureHandler, deleteTablatureHandler }}>
            {children}
        </TablaturesContext.Provider>
    );
}
