import React, { useEffect, useState } from "react";

import * as tablatureService from '../../services/tablatureService';
import TablatureItem from '../Tablatures/TablatureItem.js';

const Dashboard = () => {
	
	const [tablatures, setTablatures] = useState( {} );
	
	useEffect( () => {
        tablatureService.getPublished()
            .then( result => {
                //console.log( result );
                setTablatures( result );
            } );
    }, [] );
    
    const onDeleteHandler = ( tabId ) => { };
    
    return (
        <div className="tablatures-container" style={{marginTop: "110px"}}>
            <div className="card">
                <h5 className="card-header">Latest Tablatures</h5>
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
	                        	? tablatures.map( x => <TablatureItem key={x.id} tablature={x} onDeleteHandler={onDeleteHandler} /> )
	                        	: <tr><td colSpan="3">No Tablatures</td></tr>
	                        }
                        
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
