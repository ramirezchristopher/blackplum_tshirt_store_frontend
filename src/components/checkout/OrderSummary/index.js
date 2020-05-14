import React, { Component } from 'react';

/* Styles */
import './index.css';

class OrderSummary extends Component {
  
  constructor(props) {
    
    super(props);
  }
  
  componentDidMount() {
    
    let { storeUserInteraction } = this.props;
    
    storeUserInteraction("CHECKOUT_SUMMARY", {});
  }

  render() {

    let { order } = this.props;

    return (
      
      <article className="OrderSummaryContainer Bordered">

        <h2 className="CheckoutFormSectionHeading">Items Summary</h2>
        
        <section aria-label="Selected Items" className="OrderSummaryItemsSection">
          {
            order.orderItems.map(item => {
              
              return (
  
                <div key={item.id} className="OrderSummaryItem">
                
                  <picture>
                    <img src={item.imageUrl} alt={item.imageAltDescription} className="OrderSummaryItemThumb Bordered" />
                  </picture>
                  
                  <div className="OrderSummaryItemDetailsContainer">
                    <div className="OrderSummaryItemDetails">{item.quantity} {item.name} | {item.size} / {item.color}</div>
                    <div className="OrderSummaryItemDetails">$ {item.price.toFixed(2)}</div>
                  </div>
                </div>
              );
            })
          }
        </section>
        
        <section aria-label="Shipping Address" className="OrderSummaryShipToSection">
          
          <h2 className="CheckoutFormSectionHeading">Shipping Address</h2>
          
          <div className="OrderSummaryShipToContainer">
            <div className="OrderSummaryShipToDetails">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</div>
            <div className="OrderSummaryShipToDetails">{order.shippingAddress.street}</div>
            <div className="OrderSummaryShipToDetails">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</div>
          </div>
        </section>
        
        <section aria-label="Shipping Method" className="OrderSummaryShippingMethodSection">
          
          <h2 className="CheckoutFormSectionHeading">Shipping Method</h2>
          <div className="OrderSummaryShippingMethodDetails">{order.shippingMethodDescription}</div>
        
        </section>

      </article>
    )
  }

}

export default OrderSummary;

