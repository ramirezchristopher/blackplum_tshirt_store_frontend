import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ShoppingCartItem from './index.js';

describe('ShoppingCartItem', () => {
	
  let propsMock = {
	item: {
	  id: 1,
      size: null, 
      color: null, 
      name: null, 
      quantity: 0, 
      price: 9.99, 
      imageUrl: null, 
      imageAltDescription: null, 
	}, 
	refreshShoppingCartItemCount: () => null, 
	getCartItems: () => null, 
	resetOrderShippingSelection: () => null
  };
	
  let componentWithRouter = 
    (<BrowserRouter>
	  <ShoppingCartItem { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
