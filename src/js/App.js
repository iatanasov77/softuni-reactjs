import React, { useEffect, Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { TablaturesProvider } from './contexts/TablaturesContext';

import Navigation from './components/Navigation';
import UserLogout from './components/Authentication/UserLogout';

import HomePage from './components/HomePage';
import ApplicationAlerts from './components/ApplicationAlerts';

import ButtonIcons from './components/Tablatures/Player/PlayerControls/ButtonIcons';
import Player from './components/Tablatures/Player/Player';

const UserRegister      = lazy( () => import( './components/Authentication/UserRegister' ) );
const MyTablatures      = lazy( () => import( './components/Tablatures/MyTablatures' ) );
const Favorites         = lazy( () => import( './components/Tablatures/Favorites' ) );
const TablatureUpdate   = lazy( () => import( './components/Tablatures/TablatureUpdate' ) );

function App()
{
    return (
        <AuthProvider>
            <TablaturesProvider>
                <div className="ApplicationContainer" style={{width: "100%"}}>
                
                    {/* Top Bar ( Header ) */}
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
                    
                    <ApplicationAlerts />
                    
                    {/* Main Content */}
                    <Routes>
        				<Route path="/" element={
        				    <Suspense fallback={<span>Loading ....</span>} >
        					   <HomePage />
        					</Suspense>
        				} />
        				
        				<Route path="/register" element={
                            <Suspense fallback={<span>Loading....</span>} >
                                <UserRegister />
                            </Suspense>
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
        			
        			{/* Footer */}
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-bottom copyright-bar">
                        <div className="container-fluid">
                            <div className="site-support">
                                <div className="float-right">
                                    Project by: Ivan Atanasov &copy;2022
                                </div>
                            </div>
                        </div>
                    </nav>
                    
                    {/* SVG Icons */}
                    <div>
                        <ButtonIcons />
                    </div>
                    
                 </div>
             </TablaturesProvider>
         </AuthProvider>
    );
}

export default App;
