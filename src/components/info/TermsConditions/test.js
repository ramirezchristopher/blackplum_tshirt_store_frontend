import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import TermsConditions from './index.js';

describe('TermsConditions', () => {
	
  let propsMock = {
	setClickedTabName: (tab) => null, 
	tab: {
      name: "TERMSCONDITIONS",
      displayName: "Terms & Conditions",
      url: "/info/terms-conditions"
    }
  };
  
  let componentWithRouter = 
    (<BrowserRouter>
	  <TermsConditions { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});