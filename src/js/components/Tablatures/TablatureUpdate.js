import React, { useEffect, useState, useContext } from "react";
import { useParams } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { TablaturesContext } from '../../contexts/TablaturesContext';
import * as tablatureService from '../../services/tablatureService';

const TablatureUpdate = () => {

    const { user } = useContext( AuthContext );
    const { updateTablatureHandler } = useContext( TablaturesContext );
    
    let { tabId }                   = useParams();
    const [tablature, setTablature] = useState( {
        user_id: user.id,
        published: false,
        artist: '',
        song: '',
    } );
    
    const [selectedFile, setSelectedFile]   = useState( null );
    useEffect( () => {
        console.log("File has been set.")
    }, [selectedFile] );
  
    const onSubmit = ( e ) => {
        e.preventDefault();
        
        let formData = new FormData( e.target );
        
        formData.append( 'tablature_file', selectedFile );
        formData.append( 'published', tablature.published );
        
        updateTablatureHandler( tabId, formData )
        e.target.reset();
    };
    
    const onChange  = ( e ) => {
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
    
    useEffect( () => {
        tablatureService.getOne( tabId )
            .then( result => {
                if ( result.status == 'success' ) {
                    setTablature( result.resource );
                }
            } );
    }, [] );
    
    return (
        <div className="tablatures-container" style={{marginTop: "110px"}}>
            <div className="card card-registration-form">
                <div className="card-header">
                    <h3 className="mb-1">Tablature Update</h3>
                </div>
                <div className="card-body">
                    <form className="px-4 py-3" id="formTtablatureUpdate" onSubmit={onSubmit} >
                        
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
                                >{tablature.tablatureName}</label>
                            </div>
                        </div>
                        
                        <div className="row">&nbsp;</div>
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TablatureUpdate;
