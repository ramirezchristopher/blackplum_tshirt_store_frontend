import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReturnRefund from './index.js';

describe('ReturnRefund', () => {
	
  let propsMock = {
	setClickedTabName: (tab) => null, 
	tab: {
      name: "RETURNREFUND",
      displayName: "Return/Refund Policy", 
      url: "/info/returns"
    }
  };
  
  let componentWithRouter = 
    (<BrowserRouter>
	  <ReturnRefund { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
