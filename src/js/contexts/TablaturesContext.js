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
        tablatureService.getMyTablatures( user.apiToken )
                        .then( result => {
                            //console.log( result );
                            
                            if( result.status == 'success' ) {
                                setTablatures( result.resources );
                            } else {
                                setTablatures( [] );
                                
                                $( '#ErrorApplicationAlertsBody' ).html( result.message );
                                $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
                                $( '#ErrorApplicationAlerts' ).addClass( 'show' );
                            }
                        } );
    }
    
    function loadMyFavorites()
    {
        tablatureService.getMyFavorites( user.apiToken )
                        .then( result => {
                            //console.log( result );
                            
                            if( result.status == 'success' ) {
                                setTablatures( result.resources );
                            } else {
                                setTablatures( [] );
                                
                                $( '#ErrorApplicationAlertsBody' ).html( result.message );
                                $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
                                $( '#ErrorApplicationAlerts' ).addClass( 'show' );
                            }
                        } );
    }
    
    const addTablatureHandler = ( formData ) => {
        //console.log( Object.fromEntries( formData ) );
        
        tablatureService.createTablature(
            user.apiToken,
            formData,
            function( response ) {
                if( response.status == 'success' ) {
                    //setTablatures( response.resource );
                    
                    navigate( '/tablatures' );
                    $( '#btnSubmitTablature' ).dropdown( 'toggle' );
                    
                    document.location.reload();
                } else {
                    //setTablatures( [] );
                    
                    $( '#btnSubmitTablature' ).dropdown( 'toggle' );
                    $( '#ErrorApplicationAlertsBody' ).html( response.message );
                    $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
                    $( '#ErrorApplicationAlerts' ).addClass( 'show' );
                }
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
    };
    
    const updateTablatureHandler = ( tabId, formData ) => {
        tablatureService.updateTablature(
            user.apiToken,
            tabId,
            formData,
            function( response ) {
                if( response.status == 'success' ) {
                    navigate( '/tablatures' );
                } else {
                    $( '#btnSubmitTablature' ).dropdown( 'toggle' );
                    $( '#ErrorApplicationAlertsBody' ).html( response.message );
                    $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
                    $( '#ErrorApplicationAlerts' ).addClass( 'show' );
                }
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
    };
    
    const deleteTablatureHandler = ( tabId ) => {
    
        tablatureService.deleteTablature( user.apiToken, tabId )
                        .then( result => {
                            //console.log( result );
                            if( result.status == 'success' ) {
                                navigate( '/tablatures' );
                                document.location.reload();
                            } else {
                                $( '#ErrorApplicationAlertsBody' ).html( result.message );
                                $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
                                $( '#ErrorApplicationAlerts' ).addClass( 'show' );
                            }
                        } );
    };
    
    const addToFavoritesHandler = ( tabId ) => {
        tablatureService.addToFavorites( user.apiToken, tabId )
                        .then( result => {
                            //console.log( result );
                            
                            if( result.status == 'success' ) {
                                $( '#ApplicationAlerts' ).css( "left", "120px" );
                                $( '#ApplicationAlerts' ).css( "width", "90%" );
                                
                                $( '#ApplicationAlertsBody' ).html( 'This Tablature is Added to Your Favorites !' );
                                $( '#ApplicationAlerts' ).removeClass( 'd-none' );
                                $( '#ApplicationAlerts' ).addClass( 'show' );
                            } else {
                                $( '#ErrorApplicationAlertsBody' ).html( result.message );
                                $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
                                $( '#ErrorApplicationAlerts' ).addClass( 'show' );
                            }
                        } );
    };
    
    return (
        <TablaturesContext.Provider value={{
            tablatures: tablatures,
            addTablatureHandler,
            updateTablatureHandler,
            deleteTablatureHandler,
            addToFavoritesHandler
        }}>
            {children}
        </TablaturesContext.Provider>
    );
}
