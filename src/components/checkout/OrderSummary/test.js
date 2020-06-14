import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import OrderSummary from './index.js';

describe('OrderSummary', () => {
	
  let propsMock = {
	order: {
        orderItems: [],
        paymentMethod: {
          paymentMethodNonce: null
        },
        shippingAddress: {
          city: null,
          country: null,
          firstName: null,
          lastName: null,
          email: null, 
          state: null,
          street: null,
          zip: null
        },
        billingAddress: {
          city: null,
          country: null,
          firstName: null,
          lastName: null,
          state: null,
          street: null,
          zip: null
        },
        shippingMethod: null,
        shippingMethodDescription: null, 
        shippingRate: null, 
        taxRate: null
      }
  };
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<OrderSummary { ...propsMock } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
