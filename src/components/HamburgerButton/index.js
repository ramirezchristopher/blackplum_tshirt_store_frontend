import React, { Component } from 'react';

import './index.css';

class HamburgerButton extends Component {
  
  render() {

    const {toggleHamburgerMenu} = this.props;

    return (
      
      <button aria-label="Main Menu" id="HamburgerMenuButton" className="HamburgerMenuButton" ref={elem => this.hamburgerButtonRef = elem} onClick={() => toggleHamburgerMenu(this.hamburgerButtonRef)}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </button>
    );
  }
}

export default HamburgerButton;
