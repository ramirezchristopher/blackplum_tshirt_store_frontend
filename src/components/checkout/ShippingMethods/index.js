import React, { Component } from 'react';
import axios from 'axios';

/* Styles */
import './index.css';

/* Utility */
import RESTHelper from '../../../utility/RESTHelper/';

class ShippingMethods extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      shippingMethods: [],
      selectedShippingMethod: null,
      selectedShippingMethodDescription: null, 
      selectedShippingRate: null
    };
    
    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);
    
    this.getShippingMethodOptions = this.getShippingMethodOptions.bind(this);
    this.updateSelectedShippingMethod = this.updateSelectedShippingMethod.bind(this);
    this.submitShippingMethod = this.submitShippingMethod.bind(this);
  }
  
  componentDidMount() {
    
    window.scrollTo(0, 0);
    
    this.getShippingMethodOptions()
      .then((shippingMethods) => {
        
        return this.updateSelectedShippingMethod(shippingMethods[0].id, shippingMethods[0].name, shippingMethods[0].rate);
      });
  }

  getShippingMethodOptions() {
    
    let { address, order, setIsLoading } = this.props;
    let url = `${this.RESTHelper.getBaseUrl()}/v1/fulfillment/shipping/methods`;
    
    setIsLoading(true);

    return axios.post(url, { address, orderItems: order.orderItems })
      .then(result => {

        let shippingMethods = result.data;

        setIsLoading(false);
        this.setState({shippingMethods});
        
        return shippingMethods;
      })
      .catch(error => console.log(error));
  }
  
  updateSelectedShippingMethod(method, description, rate) {
    
    this.setState(
      {
        ...this.state, 
        selectedShippingMethod: method, 
        selectedShippingMethodDescription: description, 
        selectedShippingRate: rate
      });
  }
  
  submitShippingMethod(e) {
    
    let { order, updateOrder, orderCompletion, updateOrderCompletion, setCurrentBreadcrumb } = this.props;
    let { selectedShippingMethod, selectedShippingMethodDescription, selectedShippingRate } = this.state;
    
    e.preventDefault();
    
    if(selectedShippingMethod) {
      
      order.shippingMethod = selectedShippingMethod;
      order.shippingMethodDescription = selectedShippingMethodDescription;
      order.shippingRate = selectedShippingRate;
      
      orderCompletion.isShippingMethodComplete = true;
      
      updateOrder(order);
      updateOrderCompletion(orderCompletion);
      setCurrentBreadcrumb("PAYMENT");
    }
    
    return false;
  }
    
  render() {
    
    let { shippingMethods, selectedShippingMethod } = this.state;
    
    return (

      <form className="ShippingMethodsContainer Bordered">
      
        <h2 className="CheckoutFormSectionHeading">Shipping Method</h2>

        {
          shippingMethods.map(method => {
          
            return (
              <section key={method.id} className="ShippingMethod Bordered">

                <label className="ShippingMethodRadioButton">
                  <input type="radio" aria-labelledby="ShippingMethodDescription" value={method.id} onChange={() => this.updateSelectedShippingMethod(method.id, method.name, method.rate)} checked={selectedShippingMethod === method.id} />
                </label>
                    
                <div id="ShippingMethodDescription" className="ShippingMethodDetailsContainer">
                  <div className="ShippingMethodName">{method.name}</div>
                  <div className="ShippingMethodRate">$ {method.rate.toFixed(2)}</div>
                </div>
                
              </section>
            );
          })
        }
        
        <button type="submit" className="MediumButton SubmitShippingMethodButton" onClick={(e) => this.submitShippingMethod(e)}>Submit Shipping Method</button>
        
      </form>
    )
  }

}

export default ShippingMethods;

