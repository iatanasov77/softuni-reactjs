import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';
import Tac from './Tac';

const UserRegister = () => {
    
    const {user, userMakeLogin} = useContext( AuthContext );
    
    const navigate = useNavigate();
    
    const [formErrors, setFormErrors]   = useState( '' );
    
    const [registration, setRegistration]         = useState({
        username: '',
        password: '',
        password_repeat: '',
        
        email: '',
        first_name: '',
        last_name: '',
        
        tac: false,
    });
    
    function addFormError( error )
    {
        setFormErrors( prevErrors => 
            prevErrors + `<div>${error}</div>`
        );
    }
    
    function validate( formData )
    {
        let hasError    = false;
        setFormErrors( '' );
        
        const tac   = formData.get( 'tac' );
        if ( tac == 'false' ) {
            addFormError( 'You must agree with the Terms and Conditions !!!' );
            hasError    = true;
        }
        
        const username  = formData.get( 'username' );
        if ( username.length == 0 ) {
            addFormError( 'Username cannot be empty !!!' );
            hasError    = true;
        }
        
        const password          = formData.get( 'password' );
        const confirmPassword   = formData.get( 'password_repeat' );
        if ( password.length <= 4 ) {
            addFormError( 'Password should be more than 4 characters !!!' );
            hasError    = true;
        } else if ( password !== confirmPassword ) {
            addFormError( 'Passwords not match !!!' );
            hasError    = true;
        }
        
        return hasError;
    }
    
    const onSubmit = ( e ) => {
        e.preventDefault();
        
        let hasError    = false;
        let formData    = new FormData( e.target );
        formData.append( 'tac', registration.tac );
        
        hasError        = validate( formData );
        if ( hasError ) {
            $( '#registrationFormError' ).removeClass( 'd-none' );
            $( '#registrationFormError' ).addClass( 'show' );
            return;
        }
        
        let oFormData   = createRegisterPayload();
        authService.register(
            oFormData,
            function( response ) {
                //console.log( response );
                
                if ( response.status == 'ok' ) {
                    loginUser( {'username': oFormData.username, 'password': oFormData.password} );
                } else {
                    navigate( '/' );
                }
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
        
        e.target.reset();
    };
    
    const onChange  = ( e ) => {
        setRegistration( state => ({
            ...state,
            [e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
        }) );
    };
    
    function loginUser( credentials )
    {
        authService.login(
            credentials,
            function( response ) {
                //console.log( response );
                userMakeLogin( response.payload );
                
                navigate( '/tablatures' );
            },
            function() {
                console.log( 'AJAX ERROR !!!' );
            }
        );
    }
    
    function createRegisterPayload()
    {
        return {
            "email": registration.email,
            "username": registration.username,
            "password": registration.password,
            "firstName": registration.first_name,
            "lastName": registration.last_name
        };
    }
    
    return (
        <div className="tablatures-container" style={{marginTop: "110px"}}>
            <div className="card card-registration-form">
                <div className="card-header">
                    <h3 className="mb-1">Registration Form</h3>
                    <p>Please enter your user information.</p>
                </div>
                <div className="card-body">
                    
                    <div className="alert alert-block alert-danger fade in d-none" id="registrationFormError">
                        <button type="button" className="close close-sm" data-dismiss="alert">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        
                        <div dangerouslySetInnerHTML={{__html: formErrors}} />
                    </div>
                    
                    <form className="px-4 py-3" id="formRegister" onSubmit={onSubmit} >
                        <div className="form-group">
                            <input type="text" name="username"
                                className="form-control"
                                id="RegisterUsername"
                                placeholder="Username"
                                
                                value={registration.username}
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input type="password" name="password"
                                className="form-control"
                                id="RegisterPassword"
                                placeholder="Password"
                                
                                value={registration.password}
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input type="password" name="password_repeat"
                                className="form-control"
                                id="RegisterPasswordRepeat"
                                placeholder="Password Repeat"
                                
                                value={registration.password_repeat}
                                onChange={onChange}
                            />
                        </div>
                        
                        
                        <div className="row">&nbsp;</div>
                        <div className="form-group">
                            <input type="text" name="email"
                                className="form-control"
                                placeholder="Email"
                                
                                value={registration.email}
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input type="password" name="first_name"
                                className="form-control"
                                placeholder="First Name"
                                
                                value={registration.first_name}
                                onChange={onChange}
                            />
                        </div>
                        
                        <div className="form-group">
                            <input type="password" name="last_name"
                                className="form-control"
                                placeholder="Last Name"
                                
                                value={registration.last_name}
                                onChange={onChange}
                            />
                        </div>
                        
                        
                        <div className="row">&nbsp;</div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" name="tac"
                                    className="custom-control-input"
                                    id="RegisterTac"
                                    
                                    onChange={onChange}
                                    checked={registration.tac}
                                />
                                <span className="custom-control-label">
                                    By creating an account, you agree with the &nbsp;
                                    <a href="#" data-toggle="modal" data-target="#terms-and-conditions-modal">terms and conditions</a>
                                </span>
                            </label>
                        </div>
                        
                        <div className="row">&nbsp;</div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
            
            <Tac />
        </div>
    );
};

export default UserRegister;
