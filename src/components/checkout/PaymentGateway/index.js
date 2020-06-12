import React, { Component } from 'react';
import axios from 'axios';

/* Styles */
import './index.css';

/* Components */
import BillingAddressForm from '../BillingAddressForm/';

/* Utility */
import RESTHelper from '../../../utility/RESTHelper/';
import storeUserInteraction from '../../../utility/UserInteractionTracker/';

var dropin = require('braintree-web-drop-in');

class PaymentGateway extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      
      isLoading: false, 
      hasSubmittedPaymentInfo: false,
      hasPaymentMethodError: false
    };
    
    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);

    this.getClientToken = this.getClientToken.bind(this);
    this.gatherPaymentDetails = this.gatherPaymentDetails.bind(this);
  }

  componentDidMount() {
    
    let { setIsLoading } = this.props;

    window.scrollTo(0, 0);
    
    setIsLoading(true);
    
    this.getClientToken()
      .then(token => {

        this.dropinPromise = dropin.create({
          authorization: token,
          container: '.PaymentGatewayDropinContainer',
          paypal: {
            flow: 'vault'
          }
        });
      })
      .then(() => {
        setIsLoading(false);
      });
    
    storeUserInteraction("CHECKOUT_PAYMENT", {});
  }

  getClientToken() {

    let url = `${this.RESTHelper.getBaseUrl()}/v1/checkout/token`;

    return axios(url)
      .then(result => {

        let token = result.data;

        return token;
      })
      .catch(error => console.log(error))
  }

  gatherPaymentDetails() {

    this.dropinPromise
      .then(instance => {

        instance.requestPaymentMethod()
          .then(payload => {

            let { order, updateOrder, orderCompletion, updateOrderCompletion } = this.props;

            order.paymentMethod.paymentMethodNonce = payload.nonce;
            orderCompletion.isPaymentMethodComplete = true;
            
            updateOrder(order);
            updateOrderCompletion(orderCompletion);
            
            this.setState({hasSubmittedPaymentInfo: true});
          },
          requestPaymentMethodErr => {
            
            this.setState({hasPaymentMethodError: true});
            
            console.log("Payment Method Error: ", requestPaymentMethodErr.message);
          });
      });
  }

  render() {
    
    let { order, updateOrder, orderCompletion, updateOrderCompletion, setCurrentBreadcrumb, getTaxRateForAddress, setIsLoading } = this.props;
    let { hasSubmittedPaymentInfo, hasPaymentMethodError } = this.state;

    return (
  
      <React.Fragment>
        { !hasSubmittedPaymentInfo ? 
            
          <section className="PaymentGateway">
            <div className="PaymentGatewayDropinContainer"></div>
            <button className="MediumButton" onClick={() => this.gatherPaymentDetails()}>Submit Payment Details</button>
            
            { hasPaymentMethodError ? 
                
                <div className="ValidationErrorMessage">Please complete payment details before clicking</div>
              
              : null
            }
            
          </section>
          
          :
            
          <BillingAddressForm 
            order={ order } 
            updateOrder={ updateOrder } 
            orderCompletion={ orderCompletion } 
            updateOrderCompletion={ updateOrderCompletion } 
            setCurrentBreadcrumb={ setCurrentBreadcrumb } 
            getTaxRateForAddress={ getTaxRateForAddress } 
            setIsLoading={ setIsLoading } />
    
        }
      </React.Fragment>
    )
  }

}

export default PaymentGateway;

