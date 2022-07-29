import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';

const UserLogin = () => {
    const {user, userMakeLogin} = useContext( AuthContext );

    const navigate = useNavigate();
    
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
    });
    
    const onSubmit = ( e ) => {
        e.preventDefault();
        
        let formData = new FormData( e.target );
        
        authService.login(
            formData,
            function( response ) {
                //console.log( response );
                userMakeLogin( response.resource );
                
                navigate( '/tablatures' );
                $( '#btnLoginForm' ).dropdown( 'toggle' );
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
        
        e.target.reset();
    };
    
    const onChange  = ( e ) => {
        setCredentials( state => ({
            ...state,
            [e.target.name]: e.target.value
        }) );
    };
    

    const onClickRegistration = ( e ) => {
        $( '#btnLoginForm' ).dropdown( 'toggle' );
    };
    
    
    return (
        <li className="nav-item dropdown btn-group">
            <a  id="btnLoginForm"
                className="nav-link  dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Login
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-login-form">
                <form className="px-4 py-3" id="formLogin" onSubmit={onSubmit} >
                    <div className="form-group">
                        <label htmlFor="exampleDropdownFormUsername">Username</label>
                        <input type="text" name="username"
                            className="form-control"
                            id="exampleDropdownFormUsername"
                            placeholder="Username"
                            value={credentials.username}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleDropdownFormPassword1">Password</label>
                        <input type="password" name="password" 
                            className="form-control" 
                            id="exampleDropdownFormPassword1"
                            placeholder="Password"
                            value={credentials.password}
                            onChange={onChange}
                        />
                    </div>
                
                    <div className="row">
                        <div className="col-12">
                            <span className="mr-2">if you have not an account,</span>
                            <Link to="/register" onClick={onClickRegistration}>create from here</Link>
                        </div>
                    </div>
                    <div className="row">&nbsp;</div>
                    
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </li>
    );
};

export default UserLogin;
