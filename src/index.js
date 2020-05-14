import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { AppComponent } from './components/App/';
// import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <BrowserRouter>
    <AppComponent />
  </BrowserRouter>, 
  document.getElementById('root'));

if(module.hot) {
  module.hot.accept();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();


if("serviceWorker" in navigator) {

  navigator.serviceWorker.register("/serviceworker.js")
    .then(registration => console.log("Service worker registered with scope:", registration.scope))
    .catch(err => console.log("Service worker registration failed:", err));
}