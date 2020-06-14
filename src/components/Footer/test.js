import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import Footer from './index.js';

describe('Footer', () => {
	
  let clearClickedTabNameMock = () => null;
	
  let componentWithRouter = 
    (<BrowserRouter>
	  <Footer clearClickedTabName={clearClickedTabNameMock} />
	</BrowserRouter>);

  it('renders without crashing', () => {
	
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
