import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* Style */
import './index.css';

class MerchandiseCard extends Component {
  
  render() {
    
    const { item } = this.props;
    let path = `/details/${item.id}`;
    
    return (
        <div className="MerchandiseCardContainer">
          <article className="MerchandiseCard">
    
            <Link to={path} className="ProductLink">
              <div className="ProductImageContainer">
                <picture>
                  <img src={item.imageUrl} alt={item.imageAltDescription} className="ProductImage" />
                </picture>
              </div>
              
              <section className="ProductDetailsSection">
                <div>
                  {item.name}
                </div>
                
                <div className="MerchandisePrice">
                  $ {item.price.toFixed(2)}
                </div>
              </section>
            </Link>
    
          </article>
      </div>
    );
  }
}

export default MerchandiseCard;
