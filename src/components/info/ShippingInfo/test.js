import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ShippingInfo from './index.js';

describe('ShippingInfo', () => {
	
  let propsMock = {
	setClickedTabName: (tab) => null, 
	tab: {
      name: "SHIPPINGINFO", 
      displayName: "Shipping",
      url: "/info/shipping"
    }
  };
  
  let componentWithRouter = 
    (<BrowserRouter>
	  <ShippingInfo { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
