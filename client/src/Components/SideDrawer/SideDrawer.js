import React from 'react';
import {Link} from 'react-router-dom';
import '../../styles/SideDrawer.css';

const sideDrawer = props => {
   let drawerClasses = 'side-drawer' ;
   
   if(props.visible){
       drawerClasses= 'side-drawer open';
   }

   return ( <nav className={drawerClasses}>
        <ul className="side-drawer-list">
            <Link to="/" className="side-drawer-link" onClick={props.backDropClickHandler}>
                <li>Home</li>
            </Link>

            <Link to="/reserv" className="side-drawer-link" onClick={props.backDropClickHandler}>
                <li>Reservations</li>
            </Link>

            <Link to="/Contact" className="side-drawer-link" onClick={props.backDropClickHandler} >
                <li>Contact</li>
            </Link>
        </ul>
    </nav>
    )};

export default sideDrawer;