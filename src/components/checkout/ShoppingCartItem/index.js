import React, { Component } from 'react';
import { Link } from 'react-router-dom';

/* Styles */
import './index.css';

/* Storage */
import ShoppingCartStore from '../../../storage/ShoppingCartStore/';

class ShoppingCartItem extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.deleteInvoiceItem = this.deleteInvoiceItem.bind(this);
    
    // storage
    this.shoppingCartStore = new ShoppingCartStore();
  }
  
  deleteInvoiceItem(uid) {

    let { refreshShoppingCartItemCount, getCartItems, resetOrderShippingSelection } = this.props;

    this.shoppingCartStore.deleteItem(uid)
      .then(() => {

        refreshShoppingCartItemCount();
        getCartItems();
        resetOrderShippingSelection();
      });
  }
    
  render() {
    
    const { item } = this.props;
    
    let shoppingCartStoreKey = `CART-ITEM:${item.id}-${item.size}-${item.color}`;
    let productDetailsPath = `/details/${item.id}`;

    return (

      <article className="InvoiceItemCard Bordered">
        <section className="InvoiceItemThumbSection">
        
          <Link to={productDetailsPath}>
            <picture>
              <img src={item.imageUrl} alt={item.imageAltDescription} className="InvoiceItemThumb Bordered" />
            </picture>
          </Link>
        </section>

        <section className="InvoiceItemDetailsSection">
          <div className="InvoiceItemTitle"><Link to={productDetailsPath} className="InvoiceItemProductDetailsLink">{item.name}</Link></div>
          <div className="InvoiceItemStyle">Style:&nbsp;&nbsp;{item.size} / {item.color}</div>
          <div className="InvoiceItemQuantity">Qty:&nbsp;&nbsp;{item.quantity}</div>
          <div className="InvoiceItemPrice">$ {item.price.toFixed(2)}</div>
        </section>

        <a href="#" className="DeleteInvoiceItem" onClick={() => this.deleteInvoiceItem(shoppingCartStoreKey)}>Remove</a>
      </article>
    )
  }
}

export default ShoppingCartItem;

