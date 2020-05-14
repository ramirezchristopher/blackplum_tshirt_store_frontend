import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';
import * as math from 'mathjs';

/* Styles */
import './index.css';

/* Utility */
import RESTHelper from '../../../utility/RESTHelper/';

/* Database */
import ShoppingCartStore from '../../../storage/ShoppingCartStore/';

class ShoppingCartTotals extends Component {
  
  constructor(props) {
    
    super(props);

    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);

    this.shoppingCartStore = new ShoppingCartStore();
    
    this.checkout = this.checkout.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.clearCartAndShowConfirmationPage = this.clearCartAndShowConfirmationPage.bind(this);
    this.showOrderConfirmation = this.showOrderConfirmation.bind(this);
    
    this.calculateSubtotal = this.calculateSubtotal.bind(this);
    this.calculateTax = this.calculateTax.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
    this.formatCurrency = this.formatCurrency.bind(this);
  }

  checkout(e) {

    let { setCurrentBreadcrumb } = this.props;

    e.target.disabled = true;
    setCurrentBreadcrumb("SHIPPING");
  }

  submitOrder(e) {

    let { order, setIsLoading } = this.props;
    let url = `${this.RESTHelper.getBaseUrl()}/v1/checkout/complete`;

    e.target.disabled = true;
    
    setIsLoading(true);
    
    return axios.post(url, order)
      .then(result => {

        let transactionInfo = result.data;
        
        setIsLoading(false);

        return this.clearCartAndShowConfirmationPage(transactionInfo);
      })
      .catch(error => console.log(error));
  }

  clearCartAndShowConfirmationPage(transactionInfo) {

    let { refreshShoppingCartItemCount } = this.props;
    
    return this.shoppingCartStore.emptyAllItems()
      .then(() => {

        refreshShoppingCartItemCount();
      })
      .then(() => {

        this.showOrderConfirmation(transactionInfo);
      });
  }

  showOrderConfirmation(transactionInfo) {

    let { history } = this.props;

    history.push(`/order/${transactionInfo.id}`);
  }
  
  calculateSubtotal() {

    let { order } = this.props;
    let subtotal = order.orderItems.reduce((acc, curr) => {

      return acc + (curr.price * curr.quantity);
    }, 0);

    return subtotal;
  }
  
  calculateTax(taxRate, shippingRate) {
    
    let subtotal = this.calculateSubtotal();
    let shipping = isNaN(shippingRate) ? 0 : shippingRate;
    let tax = 0;
    
    if(taxRate && taxRate.required) {
      
      if(taxRate.shippingTaxable) {
      
        tax = math.multiply(math.add(math.bignumber(subtotal), math.bignumber(shipping)), math.bignumber(taxRate.rate));
      }
      else {
        tax = math.multiply(math.bignumber(subtotal), math.bignumber(taxRate.rate));
      }
    }
    
    return tax;
  }
  
  calculateTotal(taxRate, shippingRate) {
    
    let subtotal = this.calculateSubtotal();
    let shipping = isNaN(shippingRate) ? 0 : shippingRate;
    
    let total = subtotal;
    
    if(taxRate) {
      
      total = math.add(math.bignumber(total), math.bignumber(this.calculateTax(taxRate, shipping)));
    }

    if(!isNaN(shippingRate)) {
      
      total = math.add(math.bignumber(total), math.bignumber(shipping));
    }
    
    return total;
  }
  
  formatCurrency(value) {
    
    return `$ ${math.format(value, {notation: 'fixed', precision: 2}).replace(/"/g, '')}`;
  }
  
  render() {

    let { orderCompletion, currentBreadcrumb, order } = this.props;
    
    let isInitialState = currentBreadcrumb === "DETAILS";
    let isProcessing = !orderCompletion.isShippingAddressComplete || !orderCompletion.isShippingMethodComplete || !orderCompletion.isPaymentMethodComplete || !orderCompletion.isBillingAddressComplete;
    let isFinalizedState = currentBreadcrumb === "SUMMARY";
    
    let subtotal = this.formatCurrency(this.calculateSubtotal());
    let shipping = !order.shippingRate ? "TBD" : this.formatCurrency(order.shippingRate);
    let tax = !order.taxRate ? "TBD" : this.formatCurrency(this.calculateTax(order.taxRate, order.shippingRate));
    let total = this.formatCurrency(this.calculateTotal(order.taxRate, order.shippingRate));

    return (

      <section aria-label="Totals" className="TotalsContainer Bordered">

        <div className="TotalsLabelValueContainer">
          <div className="TotalLabel">Subtotal:</div>
          <div className="TotalValue">{ subtotal }</div>
        </div>

        <div className="TotalsLabelValueContainer">
          <div className="TotalLabel">Shipping:</div>
          <div className="TotalValue">{ shipping }</div>
        </div>

        <div className="TotalsLabelValueContainer">
          <div className="TotalLabel">Tax:</div>
          <div className="TotalValue">{ tax }</div>
        </div>
        
        <hr />
        <div className="TotalsLabelValueContainer">
          <div className="TotalLabel">Total:</div>
          <div className="TotalValue">{ total }</div>
        </div>

        <div className="CheckoutButtonContainer">

          { isInitialState ? 
          
              <button className="CheckoutButton LargeButton" onClick={(e) => this.checkout(e)}>Checkout</button>
            :

            isProcessing ? 

              null

            :
              
            isFinalizedState ? 
                
              <button className="SubmitOrderButton LargeButton" onClick={(e) => this.submitOrder(e)}>Complete Order</button>
              
            : 

              null
          }
        </div>

      </section>
    )
  }
}

export const ShoppingCartTotalsSection = withRouter(ShoppingCartTotals);

