import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Form from './components/Form';
import Navbar from './components/Navbar';
import './scss/app.scss'


function App() {
  return (
    <BrowserRouter>
     
      <Switch>
     
        <Route path="/login" component={Form}/>
        <Route  path="/" component={Dashboard}/>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
