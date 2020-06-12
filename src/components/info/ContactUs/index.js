import React, { Component } from 'react';

import './index.css';

/* Utility */
import storeUserInteraction from '../../../utility/UserInteractionTracker/';

class ContactUs extends Component {

  componentDidMount() {
    
    let { setClickedTabName, tab } = this.props;
    
    window.scrollTo(0, 0);
    setClickedTabName(tab);
    document.title = `Black Plum Apparel - ${tab.displayName}`;
    storeUserInteraction("VIEW_INFO", {name: tab.displayName});
  }
  
  render() {
    
    return (
        
       <article className="ContactUsContainer">
       
         <p className="ContactGreeting">We hope your experience visiting <span className="StoreName">Black Plum Apparel</span> has been a great one. We would be very interested to hear all about it.</p>
         
         <section aria-labelledby="question1">
           <h2 id="question1" className="Question">How can you contact us?</h2>
           <p className="Answer">Feel free to contact us any time, by e-mailing <a href="mailto:info@blackplumapparel.com" className="ContactEmail">info@BlackPlumApparel.com</a></p>
         </section>
         
         <section aria-labelledby="question2">
           <h2 id="question2" className="Question">What sorts of things could you contact us about?</h2>
           <div className="Answer">
         
             We invite you to contact us about anything, really, including:
  
             <ul>
               <li>You would like to leave a review for an item you purchased</li>
               <li>You are having a problem viewing an item or placing an order</li>
               <li>You have a question about our store or one of our items</li>
               <li>You would like to make a suggestion for improving the website</li>
               <li>You have a complaint</li>
             </ul>
           </div>
         </section>
         
         <section aria-labelledby="question3">
           <h2 id="question3" className="Question">How quickly can you expect a response from us?</h2>
           <p className="Answer">We hope to be able to reply to any question, concern, or suggestion within 24 hours</p>
         </section>
       </article>
    );
  }
}

export default ContactUs;
