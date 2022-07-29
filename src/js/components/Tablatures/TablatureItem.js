import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const TablatureItem = ( {tablature, onDeleteHandler} ) => {
    
    const { user } = useContext( AuthContext );
    
    const onDelete = ( e ) => {
        e.preventDefault();
        
        onDeleteHandler( tablature.id );
    };
    
	return (
		<tr>
            <td>{ tablature.artist }</td>
            <td>{ tablature.song }</td>
            <td>
                <Link to={`/tablatures/${tablature.id}/play`} className="btn btn-primary">
                	Play
                </Link>
                
                
                {/**
                  * Only on My Tablatures
                  */}
                  
                { tablature.createdBy == user.id
                    ? (
                        <Link to={`/tablatures/${tablature.id}/update`} className="btn btn-primary ml-4">
                            Edit
                        </Link>
                      )
                    : ''
                }
                
                { tablature.createdBy == user.id
                    ? (
                        <Link to={`/tablatures/${tablature.id}/delete`}
                            className="btn btn-primary ml-4"
                            onClick={onDelete}
                        >
                            Delete
                        </Link>
                      )
                    : ''
                }
            </td>
        </tr>
	);
};

export default TablatureItem;
