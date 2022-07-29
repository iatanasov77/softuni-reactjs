import React, { useContext } from "react";

import { TablaturesContext } from '../../contexts/TablaturesContext';

import TablatureItem from './TablatureItem.js';

const MyTablatures = () => {
	
	const { tablatures } = useContext( TablaturesContext );
    
	return (
        <div className="tablatures-container" style={{marginTop: "110px"}}>
            <div className="card">
                <h5 className="card-header">My Tablatures</h5>
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

export default MyTablatures;
