import React from 'react';
import "./App.css";
import App from './App';
import YourChickens from './YourChicks';
import { Route } from 'react-router-dom';

function Navagation() {
  return(
    <div>
      <Route exact path="/" component={App} />
      <Route exact path="/YourChickens" component={YourChickens} />
    </div>
  );
}

export default Navagation;
