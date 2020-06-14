import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import ProductDetails from './index.js';

let container = null;

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  ReactDOM.unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe('ProductDetails', () => {
	
  it('renders without crashing', () => {
	
	window.scrollTo = jest.fn();
	
	const elementMock = { addEventListener: jest.fn() };
    jest.spyOn(document, 'getElementById').mockImplementation(() => elementMock);
	
    const div = document.createElement('div');
    ReactDOM.render(<ProductDetails />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
