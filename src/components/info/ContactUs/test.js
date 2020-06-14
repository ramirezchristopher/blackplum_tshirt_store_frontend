import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ContactUs from './index.js';

describe('ContactUs', () => {

  let propsMock = {
	setClickedTabName: (tab) => null, 
	tab: {
      name: "CONTACTUS",
      displayName: "Contact Us", 
      url: "/info/contact"
    }
  };
  
  let componentWithRouter = 
    (<BrowserRouter>
	  <ContactUs { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
