import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import BillingAddressForm from './index.js';

describe('BillingAddressForm', () => {
	
  let propsMock = {
    order: {
      billingAddress: {
        city: null,
        country: null,
        firstName: null,
        lastName: null,
        state: null,
        street: null,
        zip: null
      }
    },
    updateOrder: () => null,  
    orderCompletion: () => null,  
    updateOrderCompletion: () => null,  
    setCurrentBreadcrumb: () => null,  
    getTaxRateForAddress: () => null,  
    setIsLoading: () => null,
   
  };
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BillingAddressForm { ...propsMock } />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
