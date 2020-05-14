import React, { Component } from 'react';
import axios from 'axios';

/* Style */
import './index.css';

/* Components */
import OrderSummary from '../OrderSummary/';
import Loading from '../Loading/';

/* Utility */
import RESTHelper from '../../utility/RESTHelper/';

class OrderStatus extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.state = {
      isLoading: false, 
      transactionId: null, 
      transactionInfo: null
    }
    
    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);
    
    this.getTransactionInfo = this.getTransactionInfo.bind(this);
    this.getFormattedDate = this.getFormattedDate.bind(this);
    this.leftPadZero = this.leftPadZero.bind(this);
    this.setIsLoading = this.setIsLoading.bind(this);
  }
  
  componentDidMount() {
    
    let {match: {params}} = this.props;

    this.getTransactionInfo(params.transactionId);
    this.setState({transactionId: params.transactionId});
    
    document.title = `Black Plum Apparel - Order Status`;
  }
  
  getTransactionInfo(transactionId) {
    
    let url = `${this.RESTHelper.getBaseUrl()}/v1/transaction/${transactionId}`;

    this.setIsLoading(true);
    
    return axios(url)
      .then(result => {
        
        let transactionInfo = result.data;

        this.setState({isLoading: false, transactionInfo});
      })
      .catch(error => {
        
        console.log(error);
        this.setState({isLoading: false});
      });
  }
  
  getFormattedDate(value) {
    
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let period = hours > 12 ? "PM" : "AM";
    
    return `${this.leftPadZero(month)}/${this.leftPadZero(day)}/${year} ${hours > 12 ? hours - 12 : hours}:${this.leftPadZero(minutes)} ${period} (CST)`;
  }
  
  leftPadZero(value) {
    
    if(value < 10) {
      
      value = '0' + value;
    }
    
    return value;
  }
  
  setIsLoading(value) {
    
    this.setState({isLoading: value});
  }
  
  render() {

    let { isLoading, transactionInfo } = this.state;
    
    return (
        
      <React.Fragment>
        { 
          isLoading ?  
            
            <Loading />
         :

          <article className="OrderStatusContainer">
          
            <h1 className="OrderStatusTitle">Order Details</h1>
            
            { transactionInfo && transactionInfo.id ? 
                
                <React.Fragment>
            
                  <p>Thank you for your purchase!</p>
                  <p>Please take a moment to write down your Transaction #.</p>
                  
                  <section className="TransactionDetailsContainer Bordered">
                  
                    <div className="OrderStatusField">
                      <span className="OrderStatusFieldLabel">Transaction #:</span> 
                      {transactionInfo.id}
                    </div>
                    
                    <div className="OrderStatusField">
                      <span className="OrderStatusFieldLabel">Order Date:</span>
                      {this.getFormattedDate(transactionInfo.orderDate)}
                    </div>
                    
                    <div className="OrderStatusField">
                      <span className="OrderStatusFieldLabel">Order Status:</span>
                      {transactionInfo.orderStatusSimpleDescription}
                    </div>
                  </section>
                
                  <OrderSummary order={ transactionInfo.order } />
    
                  <section className="TransactionDetailsContainer TransactionDetailsTotalsSection Bordered">
    
                    <h2 className="CheckoutFormSectionHeading">Transaction Totals</h2>
                  
                    <div className="OrderStatusField">
                      <span className="OrderStatusTransactionTotalsLabel">Subtotal:</span>
                      <span className="OrderStatusFieldValue">$ { transactionInfo.totals.subtotal.toFixed(2) }</span>
                    </div>
      
                    <div className="OrderStatusField">
                      <span className="OrderStatusTransactionTotalsLabel">Shipping:</span>
                      <span className="OrderStatusFieldValue">$ { transactionInfo.totals.shipping.toFixed(2) }</span>
                    </div>
      
                    <div className="OrderStatusField">
                      <span className="OrderStatusTransactionTotalsLabel">Tax:</span>
                      <span className="OrderStatusFieldValue">$ { transactionInfo.totals.tax.toFixed(2) }</span>
                    </div>
                    
                    <hr />
                    
                    <div className="OrderStatusField">
                      <span className="OrderStatusTransactionTotalsLabel">Total:</span>
                      <span className="OrderStatusFieldValue">$ { transactionInfo.totals.total.toFixed(2) }</span>
                    </div>
                  </section>
                  
                </React.Fragment> 
             
              : <div className="TransactionNotFound">Transaction not found.</div>
            }
      
          </article>
        }
      </React.Fragment>
    );
  }
}

export default OrderStatus;
