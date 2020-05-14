import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { withRouter, Switch, Redirect } from 'react-router'

import './index.css';

/* Components */
import TabMenu from '../../TabMenu/';
import AboutUs from '../AboutUs/';
import ReturnRefund from '../ReturnRefund/';
import ShippingInfo from '../ShippingInfo/';
import OrderStatus from '../OrderStatus/';
import ContactUs from '../ContactUs/';
import PrivacyPolicy from '../PrivacyPolicy/';
import TermsConditions from '../TermsConditions/';

const CompanyInfoTabs = [
  {
    name: "ABOUTUS",
    displayName: "About Us", 
    url: "/info/about"
  },
  {
    name: "CONTACTUS",
    displayName: "Contact Us", 
    url: "/info/contact"
  },
  {
    name: "RETURNREFUND",
    displayName: "Return/Refund Policy", 
    url: "/info/returns"
  },
  {
    name: "SHIPPINGINFO", 
    displayName: "Shipping",
    url: "/info/shipping"
  }, 
  {
    name: "ORDERSTATUS",
    displayName: "Order Status", 
    url: "/info/order-status"
  },
  {
    name: "PRIVACYPOLICY",
    displayName: "Privacy Policy",
    url: "/info/privacy-policy"
  },
  {
    name: "TERMSCONDITIONS",
    displayName: "Terms & Conditions",
    url: "/info/terms-conditions"
  }
];

class CompanyInfo extends Component {
  
  constructor(props) {
    
    super(props);
    
    this.navigateToInfoUrl = this.navigateToInfoUrl.bind(this);
  }
  
  navigateToInfoUrl(tab) {
    
    let { setClickedTabName, history } = this.props;
    
    history.push(tab.url);
    
    setClickedTabName(tab);
  }

  render() {
    
    let {setClickedTabName, clickedTabName, getTabDisplayName, menu, storeUserInteraction} = this.props;

    return (
        
      <div className="CompanyInfoContainer">
         
        <TabMenu doOnNavClick={this.navigateToInfoUrl} tabs={CompanyInfoTabs} clickedTabName={clickedTabName} menu={menu} />
       
        <main className="CompanyInfoContent">
       
          <h1 className="PageName">{ getTabDisplayName(CompanyInfoTabs, clickedTabName ? clickedTabName : "ABOUTUS") }</h1> 
       
          <Switch>
            <Route path={CompanyInfoTabs[0].url} render={(props) => (
              <AboutUs {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[0]} storeUserInteraction={storeUserInteraction} exact />
            )} exact />
           
            <Route path={CompanyInfoTabs[1].url} render={(props) => (
                <ContactUs {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[1]} storeUserInteraction={storeUserInteraction}exact />
              )} exact />
            
            <Route path={CompanyInfoTabs[2].url} render={(props) => (
              <ReturnRefund {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[2]} storeUserInteraction={storeUserInteraction} exact />
            )} exact />
            
            <Route path={CompanyInfoTabs[3].url} render={(props) => (
                <ShippingInfo {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[3]} storeUserInteraction={storeUserInteraction} exact />
              )} exact />
           
            <Route path={CompanyInfoTabs[4].url} render={(props) => (
              <OrderStatus {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[4]} storeUserInteraction={storeUserInteraction} exact />
            )} exact />
           
            <Route path={CompanyInfoTabs[5].url} render={(props) => (
                <PrivacyPolicy {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[5]} storeUserInteraction={storeUserInteraction} exact />
              )} exact />
            
            <Route path={CompanyInfoTabs[6].url} render={(props) => (
                <TermsConditions {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[6]} storeUserInteraction={storeUserInteraction} exact />
              )} exact />
           
            {/* fallback path */}
            <Redirect to={CompanyInfoTabs[0].url} />
          </Switch>
        </main>
       
      </div>
    );
  }
}

export const CompanyInfoComponent = withRouter(CompanyInfo);


