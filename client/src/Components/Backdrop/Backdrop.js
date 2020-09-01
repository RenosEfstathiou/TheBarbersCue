import React from 'react';
import '../../styles/BackDrop.css';

const backdrop = props =>(
    <div className="backdrop" onClick={props.backDropClickHandler}/>
);

export default backdrop;