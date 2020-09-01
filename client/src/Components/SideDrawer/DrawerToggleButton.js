import React from 'react';
import '../../styles/DrawerToggleButton.css';

const drawerToggleButton = props=>(
    <button className="toggle-button" onClick={props.click}>
        <div className="toggle-line"/>
        <div className="toggle-line"/>
        <div className="toggle-line"/>
            
    </button>

);
    export default drawerToggleButton;
