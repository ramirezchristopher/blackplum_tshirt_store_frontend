import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import { SearchBarSection } from './index.js';

let componentWithRouter = (<BrowserRouter><SearchBarSection /></BrowserRouter>);

describe('SearchBarSection', () => {
	
  it('renders without crashing', () => {
	
	const elementMock = { addEventListener: jest.fn() };
    jest.spyOn(document, 'querySelector').mockImplementation(() => elementMock);
	
    const div = document.createElement('div');
    ReactDOM.render(componentWithRouter, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
