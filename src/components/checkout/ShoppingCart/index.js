import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

/* Components */
import Breadcrumbs from '../Breadcrumbs/';
import ShoppingCartItem from '../ShoppingCartItem/';
import { ShoppingCartTotalsSection } from '../ShoppingCartTotals/';
import ShippingAddressForm from '../ShippingAddressForm/';
import PaymentGateway from '../PaymentGateway/';
import Loading from '../../Loading/';
import OrderSummary from '../OrderSummary/';

/* Styles */
import './index.css';

/* Storage */
import ShoppingCartStore from '../../../storage/ShoppingCartStore/';

/* Utility */
import RESTHelper from '../../../utility/RESTHelper/';

class ShoppingCart extends Component {
  
  constructor(props) {
    
    super(props);

    this.state = {
      isLoading: false,
      currentBreadcrumb: "DETAILS", 
      title: "Shopping Cart", 
      orderCompletion: {
        isShippingAddressComplete: false, 
        isBillingAddressComplete: false, 
        isShippingMethodComplete: false, 
        isPaymentMethodComplete: false
      },
      order: {
        orderItems: [],
        paymentMethod: {
          paymentMethodNonce: null
        },
        shippingAddress: {
          city: null,
          country: null,
          firstName: null,
          lastName: null,
          email: null, 
          state: null,
          street: null,
          zip: null
        },
        billingAddress: {
          city: null,
          country: null,
          firstName: null,
          lastName: null,
          state: null,
          street: null,
          zip: null
        },
        shippingMethod: null,
        shippingMethodDescription: null, 
        shippingRate: null, 
        taxRate: null
      }
    };

    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);
    
    this.shoppingCartStore = new ShoppingCartStore();

    this.getCartItems = this.getCartItems.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.updateOrderCompletion = this.updateOrderCompletion.bind(this);
    this.setCurrentBreadcrumb = this.setCurrentBreadcrumb.bind(this);
    this.getTaxRateForAddress = this.getTaxRateForAddress.bind(this);
    this.resetOrderShippingSelection = this.resetOrderShippingSelection.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
  }

  componentDidMount() {

    window.scrollTo(0, 0);
    this.getCartItems();
    document.title = `Black Plum Apparel - Cart`;
  }

  getCartItems() {

    let itemsPromise = this.shoppingCartStore.findAll("CART-ITEM:");
    
    itemsPromise.then(foundItems => {

      if(foundItems) {
      
        this.setState({
          order: { 
            ...this.state.order, 
            orderItems: foundItems 
          }
        });
      }
      else {
        console.log("No cart items found.");
      }
    });
  }

  updateOrder(order) {

    this.setState({order: order});
  }

  updateOrderCompletion(value) {

    this.setState({orderCompletion: value})
  }

  setCurrentBreadcrumb(value) {

    let title = "";

    if(value === "DETAILS") {
      
      title = "Shopping Cart"
    }
    else if(value === "SHIPPING") {

      title = "Shipping Details";
    }
    else if(value === "PAYMENT") {

      title = "Payment Details";
    }
    else if(value === "SUMMARY") {

      title = "Order Summary";
    }

    this.setState({currentBreadcrumb: value, title: title});
  }
  
  getTaxRateForAddress(address) {
    
    let { order } = this.state;
    let url = `${this.RESTHelper.getBaseUrl()}/v1/fulfillment/taxrate`;

    return axios.post(url, address)
      .then(result => {
        
        order.taxRate = result.data;
        
        this.updateOrder(order);
      });
  }
  
  resetOrderShippingSelection() {
    
    let { order, orderCompletion } = this.state;
    
    this.setState({
      orderCompletion: {
        ...orderCompletion, 
        isShippingMethodComplete: false
      },
      order: {
        ...order, 
        shippingMethod: null, 
        shippingMethodDescription: null, 
        shippingRate: null
      }
    });
  }
  
  setIsLoading(value) {
    
    this.setState({isLoading: value});
  }

  render() {

    let { currentBreadcrumb, title, order, orderCompletion, isLoading } = this.state;
    let { refreshShoppingCartItemCount } = this.props;

    return (
        
      <React.Fragment>
      
        { 
          isLoading ?  
            
            <Loading />
          : null
        }
        
        <main className="ShoppingCart">
  
          <h1 className="ShoppingCartTitle">{title}</h1>
  
          { order.orderItems && order.orderItems.length ? 
  
            <React.Fragment>
  
              <Breadcrumbs orderCompletion={ orderCompletion } currentBreadcrumb={ currentBreadcrumb } setCurrentBreadcrumb={ this.setCurrentBreadcrumb } />
              
              { currentBreadcrumb === "DETAILS" ? 
  
                <section aria-label="Selected Items" className="InvoiceItemContainer">
                  {
                    order.orderItems.map(item => {
                    
                      return (
                        <ShoppingCartItem key={item.id}
                          refreshShoppingCartItemCount={refreshShoppingCartItemCount} 
                          getCartItems={this.getCartItems} 
                          item={item} 
                          resetOrderShippingSelection={this.resetOrderShippingSelection} />
                      );
                    })
                  }
                    
                  <div className="ContinueShoppingButtonContainer">
                    <img src={process.env.REACT_APP_ICON_LEFT_ARROW} className="LeftArrow" alt="" />
                    <Link to="/">continue shopping</Link>
                  </div>
                </section>
              :  null }
              
              { currentBreadcrumb === "SHIPPING" ? 
  
                <ShippingAddressForm 
                  order={ order } 
                  updateOrder={ this.updateOrder } 
                  orderCompletion={ orderCompletion } 
                  updateOrderCompletion={ this.updateOrderCompletion } 
                  setCurrentBreadcrumb={ this.setCurrentBreadcrumb } 
                  getTaxRateForAddress={ this.getTaxRateForAddress } 
                  resetOrderShippingSelection={ this.resetOrderShippingSelection } 
                  setIsLoading={ this.setIsLoading } />
               :  null }
              
              { currentBreadcrumb === "PAYMENT" ? 
  
                <PaymentGateway 
                  order={ order } 
                  updateOrder={ this.updateOrder } 
                  orderCompletion={ orderCompletion } 
                  updateOrderCompletion={ this.updateOrderCompletion } 
                  setCurrentBreadcrumb={ this.setCurrentBreadcrumb } 
                  getTaxRateForAddress={ this.getTaxRateForAddress } 
                  setIsLoading={ this.setIsLoading } />
              :  null }
              
              
              { currentBreadcrumb === "SUMMARY" ? 
                  
                  <OrderSummary order={ order } />
                  
              : null }
  
              <ShoppingCartTotalsSection 
                order={ order } 
                orderCompletion={ orderCompletion } 
                currentBreadcrumb={ currentBreadcrumb } 
                refreshShoppingCartItemCount={ refreshShoppingCartItemCount } 
                setCurrentBreadcrumb={ this.setCurrentBreadcrumb } 
                setIsLoading={ this.setIsLoading } />
  
            </React.Fragment>
            
            :
  
            <p className="EmptyShoppingCartContainer">The shopping cart is empty.</p>
          }
        </main>
      </React.Fragment>
    );
  }
}

export default ShoppingCart;

