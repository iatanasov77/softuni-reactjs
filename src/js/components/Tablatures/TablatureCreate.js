import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from '../../contexts/AuthContext';
import { TablaturesContext } from '../../contexts/TablaturesContext';

const TablatureCreate = () => {

    const { user } = useContext( AuthContext );
    const { addTablatureHandler } = useContext( TablaturesContext );
    
    const [tablature, setTablature] 		= useState({
        user_id: user.id,
    	enabled: false,
    	artist: '',
    	song: '',
    });
    
	const [selectedFile, setSelectedFile] 	= useState( null );
	useEffect( () => {
    	console.log("File has been set.")
  	}, [selectedFile] );
  
	const onSubmit = ( e ) => {
		e.preventDefault();
		
		let formData = new FormData( e.target );
		formData.append( 'tablature', selectedFile );
		formData.append( 'enabled', tablature.enabled );
		formData.delete( 'tablature_file' );
		
		addTablatureHandler( formData );
		e.target.reset();
	};
	
	const onChange	= ( e ) => {
		setTablature( state => ({
			...state,
			[e.target.name]: e.target.type == 'checkbox' ? e.target.checked : e.target.value
		}) );
	};
	
	const onSelectTablatureFile = ( e ) => {
        let file    = e.target.files[0];
        
        if ( file.size > 1000000 ) { // Size > 1 MB ( Gore-Dolo :) )
            $( '#ErrorApplicationAlertsBody' ).html( 'Too Big Tablature File Size !!! ' );
            $( '#ErrorApplicationAlerts' ).removeClass( 'd-none' );
            $( '#ErrorApplicationAlerts' ).addClass( 'show' );
            
            return false;
        }

        setSelectedFile( file );
        $( '#tablature_form_tablature_label' ).html( file.name );
    };
	
    return (
        <li className="nav-item dropdown btn-group">
            <a id="btnSubmitTablature"
                href="#"
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Add Tablature
            </a>
            
            <div className="dropdown-menu dropdown-menu-right dropdown-tablature-form">
               
                <form className="px-4 py-3" onSubmit={onSubmit} >
                    
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            id="tablature_form_enabled"
                            name="enabled"
                            className="form-check-input"
                            
                            onChange={onChange}
                            checked={tablature.enabled}
                        />
                        <label className="form-check-label" htmlFor="tablature_form_enabled">To Be Public</label>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tablature_form_artist" className="required">Artist</label>
                        <input
                            type="text"
                            id="tablature_form_artist"
                            name="artist"
                            required="required"
                            className="form-control"
                            
                            onChange={onChange}
                            value={tablature.artist}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tablature_form_song" className="required">Song</label>
                        <input
                            type="text"
                            id="tablature_form_song"
                            name="song"
                            required="required"
                            className="form-control"
                            
                            onChange={onChange}
                            value={tablature.song}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="tablature_form_tablature" className="required">Tablature</label>
                        <div className="custom-file">
                            <input
                                type="file"
                                accept=".gp,.gp3,.gp4,.gp5,audio/x-guitar-pro"
                                id="tablature_form_tablature"
                                name="tablature_file"
                                className="custom-file-input"
                                onChange={onSelectTablatureFile}
                            />
                            <label
                                id="tablature_form_tablature_label" 
                                className="custom-file-label"
                                htmlFor="tablature_form_tablature"
                            >Choose a file</label>
                        </div>
                    </div>
                    
                    <div className="form-group mt-5">
                        <button
                            type="submit"
                            id="tablature_form_btnSave"
                            name="submit"
                            className="btn-primary btn"
                        >Save</button>
                    </div>
                </form>
                    
            </div>
        </li>
    );
};

export default TablatureCreate;
