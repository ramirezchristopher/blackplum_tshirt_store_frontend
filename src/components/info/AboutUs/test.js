import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AboutUs from './index.js';

describe('AboutUs', () => {
	
  let propsMock = {
	setClickedTabName: (tab) => null, 
	tab: {
      name: "ABOUTUS",
      displayName: "About Us", 
      url: "/info/about"
    }
  };

  let componentWithRouter = 
    (<BrowserRouter>
	  <AboutUs { ...propsMock } />
	</BrowserRouter>);

  it('renders without crashing', () => {
	
	window.scrollTo = jest.fn();
    
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
