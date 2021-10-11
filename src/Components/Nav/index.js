import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../Constants/Routes'

import './nav.css';

const Nav = () => {
    return (
        <ul className="nav-container">
            <li className="link-container"> 
                <Link to={ROUTES.CHARACTERS} className="nav-link">Characters</Link>
            </li>
            <li className="link-container">
                <Link to={ROUTES.EPISODES} className="nav-link">Episodes</Link>
            </li>
            <li className="link-container">
                <Link to={ROUTES.LOCATIONS} className="nav-link">Locations</Link>
            </li>            
            
            
        </ul>
    );
};

export default Nav;
