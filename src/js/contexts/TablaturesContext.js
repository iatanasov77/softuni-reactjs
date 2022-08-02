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
                            } else if( result.status == 'error' ) {
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
                            } else if( result.status == 'error' ) {
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
                    setTablatures( tablatures => [response.resource, ...tablatures] );
                    
                    navigate( '/tablatures' );
                    $( '#btnSubmitTablature' ).dropdown( 'toggle' );
                } else if( response.status == 'error' ) {
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
                } else if( response.status == 'error' ) {
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
                                setTablatures( tablatures.filter( (tablature) => tablature.id !== tabId ) );
                                navigate( '/tablatures' );
                            } else if( result.status == 'error' ) {
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
                            } else if( result.status == 'error' ) {
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
