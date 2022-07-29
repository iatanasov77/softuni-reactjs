import React, { useEffect, useState, useContext } from "react";

import { AuthContext } from '../../contexts/AuthContext';
import * as tablatureService from '../../services/tablatureService';
import TablatureItem from './TablatureItem.js';

const Favorites = () => {
	
	const { user } = useContext( AuthContext );
	const [tablatures, setTablatures] = useState( [] );
    
    useEffect( () => {
        tablatureService.getMyFavorites( user.id )
            .then( result => {
                //console.log( result );
                setTablatures( result );
            } );
    }, [] );
    
	return (
        <div className="tablatures-container" style={{marginTop: "110px"}}>
            <div className="card">
                <h5 className="card-header">My Favorite Tablatures</h5>
                <div className="card-body">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Artist</th>
                                <th>Song</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
          
	                        { tablatures.length > 0
	                        	? tablatures.map( x => <TablatureItem key={x.id} tablature={x} /> )
	                        	: <tr><td colSpan="3">No Tablatures</td></tr>
	                        }
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Favorites;
