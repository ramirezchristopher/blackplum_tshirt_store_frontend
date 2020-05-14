import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class ReturnRefund extends Component {

  componentDidMount() {
    
    let { setClickedTabName, tab, storeUserInteraction } = this.props;
    
    window.scrollTo(0, 0);
    setClickedTabName(tab);
    document.title = `Black Plum Apparel - ${tab.displayName}`;
    storeUserInteraction("VIEW_INFO", {name: tab.displayName});
  }
  
  render() {
    
    return (
        
       <article className="ReturnRefundContainer">
       
         <section aria-labelledby="question1">
           <h2 id="question1" className="Question">Can I return my purchase if something is wrong?</h2>
    
           <p className="Answer">If there is a problem with any item in your order, and the problem is deemed to be our fault, we will be able to exchange or refund the item at no cost to you.</p>
    
           <div className="Answer">For example,
             <ul>
               <li>We are unable to deliver the item to you</li>
               <li>The item was damaged during delivery</li>
               <li>The item received does not match the size, color, or style that was ordered</li>
               <li>The item was misprinted or is defective</li>
             </ul>
           </div>
           
           <p className="Answer">If an order is returned to us by the shipping carrier due to wrong address, we will first contact you to confirm a correct address before reshipping the order.</p>
         </section>
         
         <section aria-labelledby="question2">
           <h2 id="question2" className="Question">Are there any reasons I would not be able to return an item?</h2>
           
           <p className="Answer">Because each item is custom made to order, we are not able to accept returns if for the following reasons:</p>
           
           <div className="Answer">
             <ul>
               <li>You do not like the style of an ordered item</li>
               <li>You do not like the size or fit of an ordered item</li>
             </ul>
           </div>
         </section>
         
         <section aria-labelledby="question3">
           <h2 id="question3" className="Question">How do I start the return process?</h2>
           
           <div className="Answer">
             <ol>
               <li>E-mail us at <a href="mailto:support@blackplumapparel.com" className="ContactEmail">support@BlackPlumApparel.com</a></li>
               <li>In the e-mail, tell us the problem and include the Transaction #. Also, if returning a damaged item, please include pictures of the damage</li>
               <li>We will respond to your e-mail with the next steps to take</li>
             </ol>
           </div>
         </section>
  
         <section aria-labelledby="question4">
           <h2 id="question4" className="Question">How much time do I have to return an item?</h2>
    
           <p className="Answer">We allow up to 4 weeks from the order date to submit a return request.</p>
           <p className="Answer">To find your order date, please refer to the purchase confirmation e-mail you received from us, or lookup your order <Link to ="/info/order-status" className="ContactEmail">here</Link>.</p>
         </section>
         
         <section aria-labelledby="question5">
           <h2 id="question5" className="Question">Have a question about our return policy?</h2>
           <Link to ="/info/contact" className="ContactEmail">Contact us</Link>
         </section>
         
       </article>
    );
  }
}

export default ReturnRefund;
