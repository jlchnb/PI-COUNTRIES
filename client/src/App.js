import './App.css';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import LandingPage from './components/LandingPage/landing';
import CardFull from './components/CardFull/CardFull';
import TouristActivity from './components/TouristActivity/TouristActivity'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Switch>
        <Route path='/activities'>
          <TouristActivity/>
        </Route>
        <Route path='/countries/:id'>
          <CardFull/>
        </Route>
        <Route path='/home'>
          <Home />
        </Route> 
        <Route path='/'>
          <LandingPage/>
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
