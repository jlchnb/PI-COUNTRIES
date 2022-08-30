import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link, Switch } from 'react-router-dom';
import Home from './components/Home/home.jsx';
import LandingPage from './components/LandingPage/landing';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <h1>Countries</h1>
      <Switch>
        <Route path='/actividades'>
          <LandingPage />
        </Route>
        <Route path='/home'>
          <Home />
        </Route> 
        <Route path='/'>
          <LandingPage />
        </Route>
      </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
