import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

/* Style */
import './index.css';

/* Components */
import HamburgerButton from '../HamburgerButton/';
import { SearchBarSection } from '../SearchBar/';

/* Utility */
import storeUserInteraction from '../../utility/UserInteractionTracker/';

class Header extends Component {

  render() {
    
    const { clearClickedTabName, toggleHamburgerMenu, shoppingCartItemCount, getCatalogItemsBySearchTerm, location } = this.props;
    let shoppingCartLabel = `View your shopping cart. Current number of items in cart is ${shoppingCartItemCount}.`;
    
    return (

      <header className="SiteHeader">

        <Link to="/" className="BpaLogo" onClick={() => clearClickedTabName(true)}>
          <img src={process.env.REACT_APP_ICON_BPA_LOGO} className="BpaLogoImage" alt="Black Plum Apparel. Selling tee shirts with original designs." />
        </Link>

        { location.pathname !== "/cart" && !location.pathname.startsWith("/order") ? 

          <div className="ShoppingCartIconContainer" onClick={() => storeUserInteraction("VIEW_CART", {itemCount: shoppingCartItemCount})}>
            <Link to="/cart">
              <img src={process.env.REACT_APP_ICON_SHOPPING_CART} className="ShoppingCartIcon" alt={shoppingCartLabel} />

              { shoppingCartItemCount > 0 ? 
                
                <span className="ShoppingCartCountBadge">{shoppingCartItemCount}</span>

                : null
              }
            </Link>
              
          </div>

          : null
        }

        { location.pathname === "/" || location.pathname.startsWith("/info") ? 

          <HamburgerButton toggleHamburgerMenu={toggleHamburgerMenu} />
          
          : null
        }
        
        { location.pathname !== "/cart" && !location.pathname.startsWith("/order") ? 
        
          <SearchBarSection getCatalogItemsBySearchTerm={getCatalogItemsBySearchTerm} />
        
          : null
        }
      </header>
    );
  }
}

export const HeaderSection = withRouter(Header);
