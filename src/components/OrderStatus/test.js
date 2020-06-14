import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import OrderStatus from './index.js';

describe('OrderStatus', () => {
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OrderStatus />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
