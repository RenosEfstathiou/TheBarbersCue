import React, {useState} from 'react';

import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Reservations from './Components/Reservations';
import Contact from './Components/Contact';
import SideDrawer from './Components/SideDrawer/SideDrawer';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Backdrop from './Components/Backdrop/Backdrop'


function App() {
  const [sideDrawerOpen, setSideDrawerOpen] =useState(false);
  
  const drawerToggleClickHandler = ()=>{
    setSideDrawerOpen(!sideDrawerOpen);
  }

  const backDropClickHandler =()=>{
    setSideDrawerOpen(false);
  }

  
  let backDrop;

  if(sideDrawerOpen){
    backDrop = <Backdrop backDropClickHandler={backDropClickHandler}/>;
  }
  return ( 
   

  <div style ={{height: '100%'}}>
    <Router>
      <Navbar drawerToggleClickHandler={drawerToggleClickHandler} />
      <SideDrawer visible={sideDrawerOpen} backDropClickHandler={backDropClickHandler}/>
     {backDrop}
      <Route exact path="/" component={Home}/>
      <Route exact path="/reserv" component={Reservations}/>
      <Route exact path="/contact" component={Contact}/>
    </Router>
    </div>
  );
}

export default App;
