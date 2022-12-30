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
            <td>{ tablature.user.info.firstName } { tablature.user.info.lastName }</td>
            <td>
                <Link to={`/tablatures/${tablature.id}/play`} className="btn btn-primary" >
                	Play
                </Link>
                
                
                {/**
                  * Only on Tablatures That The Current User is Owner
                  */}
                  
                { tablature.user.id == user.userId
                    ? (
                        <Link to={`/tablatures/${tablature.id}/update`} className="btn btn-primary ml-4" >
                            Edit
                        </Link>
                      )
                    : ''
                }
                
                { tablature.user.id == user.userId
                    ? (
                        <Link to={`/tablatures/${tablature.id}/delete`} className="btn btn-primary ml-4" onClick={onDelete} >
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
