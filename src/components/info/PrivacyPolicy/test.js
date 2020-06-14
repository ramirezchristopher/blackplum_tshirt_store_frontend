import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';
import PrivacyPolicy from './index.js';

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

let propsMock = {
  setClickedTabName: (tab) => null, 
    tab: {
    name: "PRIVACYPOLICY",
    displayName: "Privacy Policy",
    url: "/info/privacy-policy"
  }
};

describe('PrivacyPolicy', () => {
	
  it('renders without crashing', () => {
	window.scrollTo = jest.fn();
    ReactDOM.render(<BrowserRouter><PrivacyPolicy { ...propsMock } /></BrowserRouter>, container);
  });
});
