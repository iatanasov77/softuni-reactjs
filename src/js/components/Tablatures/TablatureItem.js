import React, { useContext } from "react";
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import { TablaturesContext } from '../../contexts/TablaturesContext';

const TablatureItem = ( {tablature} ) => {
    
    const { user } = useContext( AuthContext );
    const { deleteTablatureHandler } = useContext( TablaturesContext );
    
    const onDelete = ( e ) => {
        e.preventDefault();
        
        deleteTablatureHandler ( tablature.id );
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
                        <Link className="btn btn-primary ml-4" onClick={onDelete}>
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
