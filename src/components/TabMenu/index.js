import React, { Component } from 'react';
import './index.css';

class TabMenu extends Component {
  
  render() {
    
    const {doOnNavClick, tabs, clickedTabName, menu} = this.props;

    return (

        <nav aria-label="Main Menu" className="NavContainer">
          
          { menu.isVisible || window.matchMedia("(min-width: 42em)").matches ? 

                tabs.map(tab => {
                
                  return(
                    <a href="#" className={clickedTabName === tab.name ? "NavItem Selected" : "NavItem"} key={tab.name} onClick={() => doOnNavClick(tab)}>
                      {tab.displayName}
                    </a> 
                  );
                })

            
          : null }
        </nav>
    );
  }
}

export default TabMenu;
