import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

/* Utility */
import storeUserInteraction from '../../../utility/UserInteractionTracker/';

class PrivacyPolicy extends Component {

  componentDidMount() {
    
    let { setClickedTabName, tab } = this.props;
    
    window.scrollTo(0, 0);
    setClickedTabName(tab);
    document.title = `Black Plum Apparel - ${tab.displayName}`;
    storeUserInteraction("VIEW_INFO", {name: tab.displayName});
  }
  
  render() {
    
    return (
        
       <article className="PrivacyPolicyContainer">
       
         <p>This privacy notice discloses the privacy practices for <span className="StoreName">Black Plum Apparel</span>. This privacy notice applies solely to information collected by this website. It will notify you of the following:</p>

         <ul>
           <li>What personally identifiable information is collected from you through the website, how it is used and with whom it may be shared.</li>
           <li>What choices are available to you regarding the use of your data.</li>
           <li>The security procedures in place to protect the misuse of your information.</li>
         </ul>
         
         <section aria-labelledby="sectionTitle1">
           <h2 id="sectionTitle1">Information collection, use, and sharing</h2> 
             
           <p>We are the sole owners of the information collected on this site. We only have access to/collect information that you voluntarily give us via email or other direct contact from you. We will not sell or rent this information to anyone.</p>
           <p>We request information from you on our order form. To buy from us, you must provide contact information (like name and shipping address) and financial information (like credit card number, expiration date). This information is used for billing purposes and to fill your orders. If we have trouble processing an order, we'll use this information to contact you.</p>
           <p>We will use your information to respond to you, regarding the reason you contacted us. We will not share your information with any third party outside of our organization, other than as necessary to fulfill your request, e.g. to ship an order.</p>
           <p>Unless you ask us not to, we may contact you via email in the future to tell you about specials, new products or services, or changes to this privacy policy.</p>
           <p>We use an outside shipping company to ship orders, and a credit card processing company to bill users for goods and services. These companies do not retain, share, store or use personally identifiable information for any secondary purposes beyond filling your order.</p>
           <p>We share aggregated demographic information with our partners. This is not linked to any personal information that can identify any individual person.</p>
         </section>
         
         <section aria-labelledby="sectionTitle2">
           <h2 id="sectionTitle2">Your access to and control over information</h2>
           
           <p>You may opt out of any future contacts from us at any time. You can do the following at any time by contacting us via the email address on our website:</p>
  
           <ul>
             <li>See what data we have about you, if any</li>
             <li>Change/correct any data we have about you</li>
             <li>Have us delete any data we have about you</li>
             <li>Express any concern you have about our use of your data</li>
           </ul>
         </section>
         
         <section aria-labelledby="sectionTitle3">
           <h2 id="sectionTitle3">Security</h2>
           
           <p>We take precautions to protect your information. When you submit sensitive information via the website, your information is protected both online and offline.</p>
           <p>Wherever we collect sensitive information, that information is encrypted and transmitted to us in a secure way. You can verify this by looking for a lock icon in the address bar and looking for "https" at the beginning of the address of the Web page.</p>
           <p>While we use encryption to protect sensitive information transmitted online, we also protect your information offline. Only employees who need the information to perform a specific job are granted access to personally identifiable information. The computers/servers in which we store personally identifiable information are kept in a secure environment.</p>
         </section>
         
         <section aria-labelledby="sectionTitle4">
           <h2 id="sectionTitle4">Links to other sites</h2>

           <p>This website contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.</p>
         </section>
         
         <section aria-labelledby="sectionTitle5">
           <h2 id="sectionTitle5">Contact us</h2>
           
           <p>If you feel that we are not abiding by this privacy policy, you should <Link to ="/info/contact" className="ContactEmail">contact us</Link> immediately.</p>
         </section>
         
       </article>
    );
  }
}

export default PrivacyPolicy;
