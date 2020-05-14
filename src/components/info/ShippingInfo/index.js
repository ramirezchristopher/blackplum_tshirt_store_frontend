import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class ShippingInfo extends Component {

  componentDidMount() {
    
    let { setClickedTabName, tab, storeUserInteraction } = this.props;
    
    window.scrollTo(0, 0);
    setClickedTabName(tab);
    document.title = `Black Plum Apparel - ${tab.displayName}`;
    storeUserInteraction("VIEW_INFO", {name: tab.displayName});
  }
  
  render() {
    
    return (
        
       <article className="ShippingInfoContainer">
         
         <section aria-labelledby="question1">
           <h2 id="question1" className="Question">How much do you charge for shipping?</h2>
           <p className="Answer">The price is determined by the shipping address and the size of the order. You will be able to view the prices for your order upon checkout.</p>
         </section>
         
         <section aria-labelledby="question2">
           <h2 id="question2" className="Question">Do you deliver to any address?</h2>
           <p className="Answer">As of now, <span className="StoreName">Black Plum Apparel</span> only ships to valid addresses within the United States.</p>
         </section>
         
         <section aria-labelledby="question3">
           <h2 id="question3" className="Question">What happens if I put the wrong address on my order?</h2>
           <p className="Answer">We will first attempt to deliver the order to the address provided. If the carrier is unable to deliver to that address, we will contact you by e-mail to request an updated address before reshipping the order.</p>
         </section>
         
         <section aria-labelledby="question4">
           <h2 id="question4" className="Question">Will my order arrive in a single package or multiple?</h2>
           <p className="Answer">In most cases, your order should arrive in a single package. However, under certain conditions, we may need to ship your order in multiple packages.</p>
         </section>
         
         <section aria-labelledby="question5">
           <h2 id="question5" className="Question">Have a question about our shipping?</h2>
           <Link to ="/info/contact" className="ContactEmail">Contact us</Link>
         </section>
       </article>
    );
  }
}

export default ShippingInfo;
