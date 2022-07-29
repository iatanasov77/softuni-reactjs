import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { TablaturesProvider } from './contexts/TablaturesContext';

import Navigation from './components/Navigation';
import UserLogout from './components/Authentication/UserLogout';

import HomePage from './components/HomePage';

import ButtonIcons from './components/Tablatures/PlayerControls/ButtonIcons';
import Player from './components/Tablatures/Player';

/*
 READ THIS: https://linguinecode.com/post/code-splitting-react-router-with-react-lazy-and-react-suspense

const UserRegister      = lazy( () => import( './components/Authentication/UserRegister' ) );
const MyTablatures      = lazy( () => import( './components/Tablatures/MyTablatures' ) );
const Favorites         = lazy( () => import( './components/Tablatures/Favorites' ) );
const TablatureUpdate   = lazy( () => import( './components/Tablatures/TablatureUpdate' ) );
*/
import UserRegister from './components/Authentication/UserRegister';
import MyTablatures from './components/Tablatures/MyTablatures';
import Favorites from './components/Tablatures/Favorites';
import TablatureUpdate from './components/Tablatures/TablatureUpdate';

function App()
{
	const location = useLocation();
	
    useEffect( () => {
        $( '#ApplicationAlerts' ).addClass( 'd-none' );
        $( '#ApplicationAlerts' ).removeClass( 'show' );
        $( '#ApplicationAlertsBody' ).html( '' );
        
    }, [location] );
    
    return (
        <AuthProvider>
            <TablaturesProvider>
                <div className="ApplicationContainer" style={{width: "100%"}}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div className="container-fluid">
                            <div className="sidebar-header">
                            	<Link to="/">
                            		<img src="/images/logo.png" width="50" height="50" />
                            	</Link>
                            </div>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <Navigation />
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
        					   <HomePage />
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
        						<Player />
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
             </TablaturesProvider>
         </AuthProvider>
    );
}

export default App;
