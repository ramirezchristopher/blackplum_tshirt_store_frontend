import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import OrderStatus from './index.js';

describe('OrderStatus', () => {
	
  let propsMock = {
	setClickedTabName: (tab) => null, 
	tab: {
      name: "ORDERSTATUS",
      displayName: "Order Status", 
      url: "/info/order-status"
    }
  };
  
  let componentWithRouter = 
    (<BrowserRouter>
	  <OrderStatus { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
