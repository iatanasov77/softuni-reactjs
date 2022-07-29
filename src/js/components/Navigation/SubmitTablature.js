import React, { useState, useEffect, useContext } from "react";

import { AuthContext } from '../../contexts/AuthContext';

const SubmitTablature = ( {addTablatureHandler} ) => {

    const { user } = useContext( AuthContext );
    
    const [tablature, setTablature] 		= useState({
        user_id: user.id,
    	published: false,
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
		formData.append( 'tablature_file', selectedFile );
		formData.append( 'published', tablature.published );
		
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
                    <input type="hidden" name="user_id" value={tablature.user_id} />
                    
                    <div className="form-check mb-3">
                        <input
                            type="checkbox"
                            id="tablature_form_enabled"
                            name="published"
                            className="form-check-input"
                            
                            onChange={onChange}
                            checked={tablature.published}
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

export default SubmitTablature;
