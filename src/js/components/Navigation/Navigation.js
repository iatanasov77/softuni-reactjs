import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import SubmitTablature from './SubmitTablature';
import UserLogin from './UserLogin';

const Navigation = ( {addTablatureHandler} ) => {

    const { user } = useContext( AuthContext );
    
    let navigation;
    
    if ( user.apiToken ) {
        navigation  = (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Latest Tablatures
                    </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/tablatures" className="nav-link">
	                	My Tablatures
	                </Link>
                </li>
                
                <li className="nav-item">
                    <Link to="/favorites" className="nav-link">
                        My Favorites
                    </Link>
                </li>
                
                <SubmitTablature addTablatureHandler={addTablatureHandler} />
                
                <li className="nav-item">
                    <Link to="/logout" className="nav-link">
                        <i className="fas fa-power-off mr-2"></i>Logout
                    </Link>
                </li>
            </ul>
        );
    } else {
        navigation  = (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to="/" className="nav-link">
                        Latest Tablatures
                    </Link>
                </li>
                
                <UserLogin />
                
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        );
    }
    
    return navigation;
}

export default Navigation;
