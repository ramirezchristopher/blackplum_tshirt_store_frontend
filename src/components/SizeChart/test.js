import React from 'react';
import ReactDOM from 'react-dom';
import SizeChart from './index.js';

describe('SizeChart', () => {
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SizeChart categoryType={'FUNNY'} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
