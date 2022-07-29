import React, { useEffect, useState, Suspense, lazy } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import * as tablatureService from './services/tablatureService';
import { TablatureActions } from './components/Tablatures/Constants';

import Navigation from './components/Navigation/Navigation';
import UserLogout from './components/Navigation/UserLogout';

import Dashboard from './components/Dashboard/Dashboard';

import ButtonIcons from './components/Tablatures/PlayerControls/ButtonIcons';
import TablaturePlayer from './components/Tablatures/TablaturePlayer';

/*
 READ THIS: https://linguinecode.com/post/code-splitting-react-router-with-react-lazy-and-react-suspense

const UserRegister      = lazy( () => import( './components/Registration/UserRegister' ) );
const MyTablatures      = lazy( () => import( './components/Tablatures/MyTablatures' ) );
const Favorites         = lazy( () => import( './components/Tablatures/Favorites' ) );
const TablatureUpdate   = lazy( () => import( './components/Tablatures/TablatureUpdate' ) );
*/
import UserRegister from './components/Registration/UserRegister';
import MyTablatures from './components/Tablatures/MyTablatures';
import Favorites from './components/Tablatures/Favorites';
import TablatureUpdate from './components/Tablatures/TablatureUpdate';

function App()
{
	const navigate = useNavigate();
	
	const location = useLocation();

    useEffect( () => {
        $( '#ApplicationAlerts' ).addClass( 'd-none' );
        $( '#ApplicationAlerts' ).removeClass( 'show' );
        $( '#ApplicationAlertsBody' ).html( '' );
        
    }, [location] );
  
	const addTablatureHandler = ( formData ) => {
        console.log( Object.fromEntries( formData ) );
        
		tablatureService.createTablature(
			formData,
			function( response ) {
				console.log( 'AJAX SUCCESS !!!' );
				
		        navigate( '/tablatures' );
		        $( '#btnSubmitTablature' ).dropdown( 'toggle' );
		        document.location.reload();
			},
			function() {
		        console.log( 'AJAX ERROR !!!' );
		    }
		);
	};
	
    return (
        <AuthProvider>
            <div className="ApplicationContainer" style={{width: "100%"}}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <div className="container-fluid">
                        <div className="sidebar-header">
                        	<Link to="/">
                        		<img src="/images/logo.png" width="50" height="50" />
                        	</Link>
                        </div>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <Navigation
                                addTablatureHandler={addTablatureHandler}
                            />
                        </div>
                    </div>
                </nav>
                
                {/* Alerts Box */}
                <div id="ApplicationAlerts"
                    className="alert alert-block alert-info fade in d-none"
                    style={{position: "absolute", top: "90px", zIndex: "10", width: "98%"}}
                > 
                    <button type="button" className="close close-sm" data-dismiss="alert">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                    <div id="ApplicationAlertsBody" />
                </div>
                
                <Routes>
    				<Route path="/" element={
    				    <Suspense fallback={<span>Loading ....</span>} >
    					   <Dashboard />
    					</Suspense>
    				} />
    				
    				<Route path="/register" element={
                        <UserRegister />
                    } />
                    
                    <Route path="/logout" element={
                        <UserLogout />
                    } />
    				
    				<Route path="/tablatures" element={
    				    <Suspense fallback={<span>Loading ....</span>} >
    					   <MyTablatures />
    					</Suspense>
    				} />
    				
    				<Route path="/favorites" element={
    				    <Suspense fallback={<span>Loading ....</span>} >
                            <Favorites />
                        </Suspense>
                    } />
    				
    				<Route path="/tablatures/:tabId/play" element={
    					<Suspense fallback={<span>Loading ....</span>} >
    						<TablaturePlayer />
    					</Suspense>
    				} />
    				
    				<Route path="/tablatures/:tabId/update" element={
                        <Suspense fallback={<span>Loading ....</span>} >
                            <TablatureUpdate />
                        </Suspense>
                    } />
    			</Routes>
    			
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom copyright-bar">
                    <div className="container-fluid">
                        <div className="site-support">
                            <div className="float-right">
                                Project by: Ivan Atanasov &copy;2022
                            </div>
                        </div>
                    </div>
                </nav>
                
                <div>
                    <ButtonIcons />
                </div>
             </div>
         </AuthProvider>
    );
}

export default App;
