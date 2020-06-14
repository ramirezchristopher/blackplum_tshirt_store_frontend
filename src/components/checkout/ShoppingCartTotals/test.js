import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { ShoppingCartTotalsSection } from './index.js';

describe('ShoppingCartTotalsSection', () => {
	
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
	setIsLoading: () => null, 
	refreshShoppingCartItemCount: () => null, 
	orderCompletion: {
        isShippingAddressComplete: false, 
        isBillingAddressComplete: false, 
        isShippingMethodComplete: false, 
        isPaymentMethodComplete: false
    }, 
	currentBreadcrumb: "DETAILS", 
	setCurrentBreadcrumb: () => null
  };
	
  let componentWithRouter = 
    (<BrowserRouter>
	  <ShoppingCartTotalsSection { ...propsMock } />
	</BrowserRouter>);
	
  it('renders without crashing', () => {
   const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
