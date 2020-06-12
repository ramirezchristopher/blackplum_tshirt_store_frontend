import React, { Component, Suspense } from 'react';
import { Route } from 'react-router-dom';
import { withRouter, Switch, Redirect } from 'react-router'

import './index.css';

/* Components */
import TabMenu from '../../TabMenu/';

const AboutUs = React.lazy(() => import('../AboutUs/'));
const ReturnRefund = React.lazy(() => import('../ReturnRefund/'));
const ShippingInfo = React.lazy(() => import('../ShippingInfo/'));
const OrderStatus = React.lazy(() => import('../OrderStatus/'));
const ContactUs = React.lazy(() => import('../ContactUs/'));
const PrivacyPolicy = React.lazy(() => import('../PrivacyPolicy/'));
const TermsConditions = React.lazy(() => import('../TermsConditions/'));

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
    
    let {setClickedTabName, clickedTabName, getTabDisplayName, menu } = this.props;

    return (
        
      <div className="CompanyInfoContainer">
         
        <TabMenu doOnNavClick={this.navigateToInfoUrl} tabs={CompanyInfoTabs} clickedTabName={clickedTabName} menu={menu} />
       
        <main className="CompanyInfoContent">
       
          <h1 className="PageName">{ getTabDisplayName(CompanyInfoTabs, clickedTabName ? clickedTabName : "ABOUTUS") }</h1> 
       
          <Switch>
            <Route path={CompanyInfoTabs[0].url} render={(props) => (
	          <Suspense fallback={<div>Loading...</div>}>
                  <AboutUs {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[0]} exact />
              </Suspense>
            )} exact />
           
            <Route path={CompanyInfoTabs[1].url} render={(props) => (
	            <Suspense fallback={<div>Loading...</div>}>
                    <ContactUs {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[1]} exact />
                </Suspense>
              )} exact />
            
            <Route path={CompanyInfoTabs[2].url} render={(props) => (
	          <Suspense fallback={<div>Loading...</div>}>
                  <ReturnRefund {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[2]} exact />
              </Suspense>
            )} exact />
            
            <Route path={CompanyInfoTabs[3].url} render={(props) => (
	            <Suspense fallback={<div>Loading...</div>}>
                    <ShippingInfo {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[3]} exact /> 
                </Suspense>
              )} exact />
           
            <Route path={CompanyInfoTabs[4].url} render={(props) => (
	          <Suspense fallback={<div>Loading...</div>}>
                  <OrderStatus {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[4]} exact />
              </Suspense>
            )} exact />
           
            <Route path={CompanyInfoTabs[5].url} render={(props) => (
	            <Suspense fallback={<div>Loading...</div>}>
                    <PrivacyPolicy {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[5]} exact />
                </Suspense>
              )} exact />
            
            <Route path={CompanyInfoTabs[6].url} render={(props) => (
	            <Suspense fallback={<div>Loading...</div>}>
                   <TermsConditions {...props} setClickedTabName={setClickedTabName} tab={CompanyInfoTabs[6]} exact />
                </Suspense>
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


