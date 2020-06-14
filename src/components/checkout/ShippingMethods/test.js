import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ShippingMethods from './index.js';

describe('ShippingMethods', () => {
	
  let propsMock = {
	address: {}, 
	order: {}, 
	setIsLoading: () => null, 
	updateOrder: () => null, 
	orderCompletion: () => null, 
	updateOrderCompletion: () => null, 
	setCurrentBreadcrumb: () => null
  };

  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    const div = document.createElement('div');
    ReactDOM.render(<ShippingMethods { ...propsMock } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
