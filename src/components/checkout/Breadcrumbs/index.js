import React, { Component } from 'react';
import './index.css';

class Breadcrumbs extends Component {
  
  constructor(props) {
    
    super(props);

    this.goToBreadCrumb = this.goToBreadCrumb.bind(this);
  }

  goToBreadCrumb(breadcrumb) {

    let { orderCompletion, setCurrentBreadcrumb } = this.props;
    let isShippingSectionComplete = orderCompletion.isShippingAddressComplete && orderCompletion.isShippingMethodComplete;
    let isBillingSectionComplete = orderCompletion.isPaymentMethodComplete && orderCompletion.isBillingAddressComplete;
    
    if(breadcrumb === "DETAILS" || 
      (breadcrumb === "SHIPPING" && isShippingSectionComplete) || 
      (breadcrumb === "PAYMENT" && isShippingSectionComplete) || 
      (breadcrumb === "SUMMARY" && isShippingSectionComplete && isBillingSectionComplete)) {
    
      setCurrentBreadcrumb(breadcrumb);
    }
  }
  
  render() {

    let { orderCompletion, currentBreadcrumb } = this.props;
    let isShippingSectionComplete = orderCompletion.isShippingAddressComplete && orderCompletion.isShippingMethodComplete;
    let isBillingSectionComplete = orderCompletion.isPaymentMethodComplete && orderCompletion.isBillingAddressComplete;

    return (   

      <div className="BreadcrumbContainer">

        <div className="breadcrumb flat">
          <span className={ currentBreadcrumb === "DETAILS" ? "active Enabled" : "Enabled" } onClick={() => this.goToBreadCrumb("DETAILS")}>Details</span>
          <span className={ currentBreadcrumb === "SHIPPING" ? "active Enabled" : isShippingSectionComplete ? "Enabled" : "Disabled" } onClick={() => this.goToBreadCrumb("SHIPPING")}>Shipping</span>
          <span className={ currentBreadcrumb === "PAYMENT" ? "active Enabled" : isShippingSectionComplete ? "Enabled" : "Disabled" } onClick={() => this.goToBreadCrumb("PAYMENT")}>Payment</span>
          <span className={ currentBreadcrumb === "SUMMARY" ? "active Enabled" : isShippingSectionComplete && isBillingSectionComplete ? "Enabled" : "Disabled" } onClick={() => this.goToBreadCrumb("SUMMARY")}>Summary</span>
        </div>
      </div>

    );
  }
}

export default Breadcrumbs;
