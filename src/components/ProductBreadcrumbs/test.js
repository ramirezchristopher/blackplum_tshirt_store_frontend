import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import ProductBreadcrumbs from './index.js';

let componentWithRouter = (<BrowserRouter><ProductBreadcrumbs itemName={'Test Product'} /></BrowserRouter>);

describe('ProductBreadcrumbs', () => {
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
