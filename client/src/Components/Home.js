import React from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.css'

const  Home =()=>{
    
    return(
       
        <div className="home-template ">
            <div className="home-cover">
            <div className="landing-wrapper">
                <h1 className="landing-title" >The Barber's Cue</h1>
                <h2 className="landing-reserv-header" >Κλείσε ραντεβού μέσω της σελίδας μας ή βρές ότι πληροφορία χρειαστείς !</h2>
                <h5 className="landing-working-hours">Ωράριο Λειτουργίας : 9:30 - 20:30</h5>
                
                <div className="button-wrapper">
                <Link to="/reserv" className="btn effect01" >
                        <span>Κρατησεις</span>
                </Link>

                <Link to="/contact" className="btn effect01" >
                 <span>Πληροφοριες</span>
                </Link>
                </div>
            </div>
        </div>
        </div>
        
         
    )
}

export default Home;