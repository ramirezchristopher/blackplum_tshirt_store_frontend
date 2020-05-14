import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class Footer extends Component {
  
  render() {
    
    let { clearClickedTabName } = this.props;
    
    return (
      <footer role="contentinfo" className="Footer">
        <div className="FooterItemsContainer">
        
          <Link to="/" onClick={() => clearClickedTabName(true)}>        
            <div className="FooterItem">Home</div>
          </Link>
            
          <Link to="/info/about">
            <div className="FooterItem">About Us</div>
          </Link>
          
          <Link to ="/info/contact">
            <div className="FooterItem">Contact Us</div>
          </Link>
          
          <Link to ="/info/returns">
            <div className="FooterItem">Return/Refund Policy</div>
          </Link>
          
          <Link to="/info/shipping">
            <div className="FooterItem">Shipping</div>
          </Link>
          
          <Link to ="/info/order-status">
            <div className="FooterItem">Order Status</div>
          </Link>
 
          <Link to ="/info/privacy-policy">
            <div className="FooterItem">Privacy Policy</div>
          </Link>
          
          <Link to ="/info/terms-conditions">
            <div className="FooterItem">Terms & Conditions</div>
          </Link>
        </div>

        <div className="SocialMediaButtons">
          <span>
            <a href="https://www.facebook.com/blackplumapparel/" target="_blank" rel="noopener noreferrer">
              <img src={process.env.REACT_APP_ICON_URL_FACEBOOK} className="SocialMediaButton" alt="Visit the Black Plum Apparel Facebook page" />
            </a>
          </span>
          <span>
            <a href="https://twitter.com/ApparelPlum/" target="_blank" rel="noopener noreferrer">
              <img src={process.env.REACT_APP_ICON_URL_TWITTER} className="SocialMediaButton" alt="Visit the Black Plum Apparel Twitter page" />
            </a>
          </span>
        </div>

        <div className="Copyright">
          <div><span className="CopyrightSymbol">©</span>Copyright</div>
          <div>Black Plum Apparel LLC</div>
        </div>

        <div className="ComodoSealContainer">
          <img src={process.env.REACT_APP_ICON_URL_COMODO_SEAL} className="comodoSeal" alt="Comodo SSL certificate seal. This website uses communication ecryption for improved security." />
        </div>

      </footer>
    );
  }
}

export default Footer;
