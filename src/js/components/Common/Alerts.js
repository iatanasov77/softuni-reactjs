import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

const Alerts = () => {
    
    const location = useLocation();
    
    // Remove Alerts When Route Changed
    useEffect( () => {
        $( '#ApplicationAlerts' ).addClass( 'd-none' );
        $( '#ApplicationAlerts' ).removeClass( 'show' );
        $( '#ApplicationAlertsBody' ).html( '' );
        
        $( '#ErrorApplicationAlerts' ).addClass( 'd-none' );
        $( '#ErrorApplicationAlerts' ).removeClass( 'show' );
        $( '#ErrorApplicationAlertsBody' ).html( '' );
        
    }, [location] );
    
    return (
        <div>
            {/* Info Alerts Box */}
            <div id="ApplicationAlerts"
                className="alert alert-block alert-info fade in d-none"
                style={{position: "absolute", top: "90px", zIndex: "10", width: "98%"}}
            > 
                <button type="button" className="close close-sm" data-dismiss="alert">
                    <span aria-hidden="true">&times;</span>
                </button>
                
                <div id="ApplicationAlertsBody" />
            </div>
            
            {/* Error Alerts Box */}
            <div id="ErrorApplicationAlerts"
                className="alert alert-block alert-danger fade in d-none"
                style={{position: "absolute", top: "90px", zIndex: "10", width: "98%"}}
            > 
                <button type="button" className="close close-sm" data-dismiss="alert">
                    <span aria-hidden="true">&times;</span>
                </button>
                
                <div id="ErrorApplicationAlertsBody" />
            </div>
        </div>
    );
}

export default Alerts;
