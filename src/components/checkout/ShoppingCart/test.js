import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ShoppingCart from './index.js';

describe('ShoppingCart', () => {
	
  it('renders without crashing', () => {
	
	window.scrollTo = jest.fn();
	
    const div = document.createElement('div');
    ReactDOM.render(<ShoppingCart />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
