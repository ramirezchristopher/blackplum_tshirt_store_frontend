import React from 'react';
import ReactDOM from 'react-dom';
import HamburgerButton from './index.js';

describe('HamburgerButton', () => {
	
  let toggleHamburgerMenuMock = () => null;
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<HamburgerButton toggleHamburgerMenu={toggleHamburgerMenuMock} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
