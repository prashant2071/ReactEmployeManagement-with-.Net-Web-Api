import React from 'react';
import './App.css';

import {Home} from './components/Home'
import {Department} from './components/Department'
import {Employee} from './components/Employee'
import {Navigation} from './components/Navigation'

 
//import Button from 'react-bootstrap/Button';
import {BrowserRouter,Route,Switch}from 'react-router-dom'
function App() { 
  //never use class as class instead write className
  return (
    <BrowserRouter>
     <div className="container"> 
     <h3 className="m-3 d-flex justify-content-center">React js with Web Api Demo</h3>
     <h5 className="m-3 d-flex justify-content-center">Employee Manage ment Portal</h5>
    </div>
    <Navigation/>
    <Switch>
      <Route path='/' component={Home} exact/>
      <Route path='/department' component={Department} />
      <Route path='/employee' component={Employee} />

    </Switch>
    </BrowserRouter>
   
  );
}

export default App;
