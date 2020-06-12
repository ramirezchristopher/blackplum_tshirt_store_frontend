import React, { Component } from 'react';

import './index.css';

/* Utility */
import storeUserInteraction from '../../../utility/UserInteractionTracker/';

class OrderStatus extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.lookupOrder = this.lookupOrder.bind(this);
  }

  componentDidMount() {
    
    let { setClickedTabName, tab } = this.props;
    
    window.scrollTo(0, 0);
    setClickedTabName(tab);
    document.title = `Black Plum Apparel - ${tab.displayName}`;
    storeUserInteraction("VIEW_INFO", {name: tab.displayName});
  }
  
  lookupOrder(e) {

    e.preventDefault();
    
    let orderNumber = document.getElementById("orderNumberField").value.trim();
    
    if(orderNumber) {
    
      this.props.history.push(`/order/${orderNumber}`);
    }
  }
  
  render() {
    
    return (
        
       <article className="OrderTrackingContainer">
       
         <p>To lookup an order, please enter the Transaction # in the box below, then click the 'Find Order' button.</p>
       
         <form>
         
           <div className="InputField">
             <input type="text" name="orderNumber" id="orderNumberField" maxLength="100" tabIndex="1" />
           </div>
           <div className="LookupOrderButtonContainer">
             <button type="submit" className="MediumButton" onClick={(e) => this.lookupOrder(e)}>Find Order</button>
           </div>
         </form>
       </article>
    );
  }
}

export default OrderStatus;
