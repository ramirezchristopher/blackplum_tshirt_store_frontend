import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './index.css';

class AboutUs extends Component {

  componentDidMount() {
    
    let { setClickedTabName, tab, storeUserInteraction } = this.props;
    
    window.scrollTo(0, 0);
    setClickedTabName(tab);
    document.title = `Black Plum Apparel - ${tab.displayName}`;
    storeUserInteraction("VIEW_INFO", {name: tab.displayName});
  }
  
  render() {
    
    return (
        
       <article className="AboutUsContainer">
       
         <p><span className="StoreName">Black Plum Apparel</span> started out from a desire to create high-quality t-shirts with designs that tell unique stories about their wearer.</p>
         <p>Just as with sculpting with clay or painting with brush, clothing is also an artistic medium for expressing ourselves. Whether it be with humor, a clever phrase, or just a splash of color, we believe the statement your clothing makes should always reflect the best of you.</p>
         <p>At <span className="StoreName">Black Plum Apparel</span>, we are proud to help serve you in that endeavor.</p>
         
         <section aria-labelledby="question1">
           <h2 id="question1" className="Question">Have a question about our store?</h2>
           <Link to ="/info/contact" className="ContactEmail">Contact us</Link>
         </section>
       </article>
    );
  }
}

export default AboutUs;
