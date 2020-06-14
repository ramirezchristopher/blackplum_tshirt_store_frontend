import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CompanyInfoComponent } from './index.js';

describe('CompanyInfo', () => {
	
  let propsMock = {
	setClickedTabName: (tab) => null, 
	clickedTabName: null, 
	getTabDisplayName: () => null, 
	menu: {} 
  };

  let componentWithRouter = 
    (<BrowserRouter>
	  <CompanyInfoComponent { ...propsMock } />
	</BrowserRouter>);

  it('renders without crashing', () => {
	
	window.scrollTo = jest.fn();
    
	Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });

    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
