import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import WelcomeBanner from './index.js';

describe('WelcomeBanner', () => {
	
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<WelcomeBanner />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
