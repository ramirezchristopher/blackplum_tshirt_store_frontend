import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { HeaderSection } from './index.js';

describe('Header', () => {
	
  let propsMock = { 
	clearClickedTabName: () => null, 
	toggleHamburgerMenu: () => null,
	shoppingCartItemCount: 0,
	getCatalogItemsBySearchTerm: () => null
  };

  let componentWithRouter = 
    <BrowserRouter>
	  <HeaderSection { ...propsMock } />
	</BrowserRouter>
	
  it('renders without crashing', () => {
	
	const elementMock = { addEventListener: jest.fn() };
    jest.spyOn(document, 'querySelector').mockImplementation(() => elementMock);
	
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});