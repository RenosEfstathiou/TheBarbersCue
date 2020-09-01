import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/navbar.css';

import DrawerToggleButton from './SideDrawer/DrawerToggleButton';

const Navbar = props =>{
    const unauthenticatedNavBar = ()=> {
        

        
        return (
            <div className="nav-link-list  "> 
                <Link to="/" className="nav-link">
                    <li >Home</li>
                </Link>

                <Link to="/reserv" className="nav-link">
                    <li >Reservations</li>
                </Link>

                <Link to="/contact" className="nav-link">
                    <li >Contact</li>
                </Link>
            </div>
        )
    }
    
    return(
        <header className="navbar">
        <nav  className="nav-navigation" >
            <div>
                <DrawerToggleButton click={props.drawerToggleClickHandler} className="nav-toggle-button"/>
            </div>
            <Link to="/" className="nav-logo" >The Barber's Cue</Link>
                <div className="devider"></div>
            <ul className="spacer">
               {unauthenticatedNavBar()}
                
            </ul>
    
      </nav>
      </header>
            
    )
}

export default Navbar;