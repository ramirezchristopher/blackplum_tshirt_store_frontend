import React, { Component } from 'react';

import './index.css';

class WelcomeBanner extends Component {
  
  componentDidMount() {
    
    document.title = `Black Plum Apparel`;
  }
  
  render() {
    
    let { navigation } = this.props;

    return (   

        <div className="BannerContainer">
        {
          !navigation.clickedTabName ?
        
            <section role="banner" className="Bordered WelcomeBanner">
              <h1 className="WelcomeBannerGreetingContainer">
                <div className="WelcomeBannerGreeting">Welcome to </div>
                <div className="WelcomeBannerGreeting"><span className="WelcomeBannerGreetingCompanyName">Black Plum</span> Apparel</div>
              </h1>
              <p className="WelcomeBannerTagline">Check out our newly designed tees</p>
            </section>
        
          : null
        }  
      </div>

    );
  }
}

export default WelcomeBanner;
