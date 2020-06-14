import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PaymentGateway from './index.js';

describe('PaymentGateway', () => {
	
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
    }, 
	updateOrder: () => null, 
	orderCompletion: () => null, 
	updateOrderCompletion: () => null, 
	setCurrentBreadcrumb: () => null, 
	getTaxRateForAddress: () => null, 
	setIsLoading: () => null
  };
	
  it('renders without crashing', () => {
	
	window.scrollTo = jest.fn();
	
    const div = document.createElement('div');
    ReactDOM.render(<PaymentGateway { ...propsMock } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
