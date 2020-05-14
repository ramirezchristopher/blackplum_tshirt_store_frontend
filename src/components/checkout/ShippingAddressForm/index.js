import React, { Component } from 'react';
import axios from 'axios';

/* Components */
import ShippingMethods from '../ShippingMethods/';

/* Styles */
import './index.css';

/* Utility */
import RESTHelper from '../../../utility/RESTHelper/';

const AddressFields = {
  CITY: "city",
  COUNTRY: "country", 
  FIRST_NAME: "firstName", 
  LAST_NAME: "lastName", 
  EMAIL: "email", 
  STATE: "state", 
  STREET: "street", 
  ZIP: "zip"
}

class ShippingAddressForm extends Component {
  
  constructor(props) {
    
    super(props);

    this.state = {
      address: {
        city: '',
        country: 'US', 
        firstName: '', 
        lastName: '', 
        email: '', 
        state: 'AL', 
        street: '', 
        zip: ''
      },
      addressValidation: {
        isAddressValid: true, 
        isFirstNameValid: true,
        isLastNameValid: true,
        isEmailValid: true, 
        isStreetValid: true,
        isCityValid: true,
        isZipValid: true
      }, 
      stateOptions: [],
      countryOptions: ["United States"],
      hasSubmittedShippingAddress: false
    };

    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);

    this.updateAddressField = this.updateAddressField.bind(this);
    this.gatherAddressDetails = this.gatherAddressDetails.bind(this);
    this.getStates = this.getStates.bind(this);
    this.validateAddressFields = this.validateAddressFields.bind(this);
  }

  componentDidMount() {

    let { address } = this.state;
    let { order, storeUserInteraction } = this.props;
    
    window.scrollTo(0, 0);
    
    this.getStates();
    this.setState({
      address: {
        city: order.shippingAddress.city ? order.shippingAddress.city : address.city, 
        country: order.shippingAddress.country ? order.shippingAddress.country : address.country, 
        firstName: order.shippingAddress.firstName ? order.shippingAddress.firstName : address.firstName, 
        lastName: order.shippingAddress.lastName ? order.shippingAddress.lastName : address.lastName, 
        email: order.shippingAddress.email ? order.shippingAddress.email : address.email, 
        state: order.shippingAddress.state ? order.shippingAddress.state : address.state, 
        street: order.shippingAddress.street ? order.shippingAddress.street : address.street, 
        zip: order.shippingAddress.zip ? order.shippingAddress.zip : address.zip
      }
    });
    
    storeUserInteraction("CHECKOUT_SHIPPING", {});
  }

  getStates() {

    let url = `${this.RESTHelper.getBaseUrl()}/v1/fulfillment/states`;

    return axios(url)
      .then(result => {

        let states = result.data;

        this.setState({stateOptions: states});
      })
      .catch(error => console.log(error))
  }

  updateAddressField(fieldName, value) {

    let { address } = this.state;

    if(fieldName === AddressFields.ZIP) {
      
      if(value.length > 5) {
        value = value.slice(0, 5);
      }
    }
    
    this.setState({address: {...address, [fieldName]: value}});
  }

  gatherAddressDetails(e) {

    let { order, updateOrder, orderCompletion, updateOrderCompletion, getTaxRateForAddress, resetOrderShippingSelection } = this.props;
    let { address } = this.state;
    
    e.preventDefault();
    
    if(this.validateAddressFields(address)) {

      getTaxRateForAddress(address)
        .then(() => {
          
          if(order.taxRate && order.taxRate.validationErrors) {
            
            let { addressValidation } = this.state;
            
            this.setState({
              addressValidation: {
                ...addressValidation,
                isAddressValid: false
              }
            });
            
            console.log("Error getting tax rate: ", order.taxRate.validationErrors.join("|"));
          }
          else {
            order.shippingAddress = address;
            order.shippingMethod = null; 
            order.shippingRate = null;
            
            orderCompletion.isShippingAddressComplete = true;
            
            this.setState({hasSubmittedShippingAddress: true});
            
            updateOrder(order);
            updateOrderCompletion(orderCompletion);
            
            resetOrderShippingSelection();
          }
        })
        .catch(error => {
          
          let { addressValidation } = this.state;
          
          this.setState({
            addressValidation: {
              ...addressValidation,
              isAddressValid: false
            }
          });
          
          console.log("Error getting tax rate: ", error);
        });
    }
    
    return false;
  }
  
  validateAddressFields(address) {
    
    let { addressValidation } = this.state;
    let { city, country, firstName, lastName, email, state, street, zip } = address;
    
    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isEmailValid = false;
    let isStreetValid = false;
    let isCityValid = false;
    let isZipValid = false;
    let isStateValid = false;
    let isCountryValid = false;
    
    let emailFormat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(firstName) {
      isFirstNameValid = true;
    }
    
    if(lastName) {
      isLastNameValid = true;
    }
    
    if(email && emailFormat.test(email)) {
      isEmailValid = true;
    }
    
    if(street) {
      isStreetValid = true;
    }
    
    if(city) {
      isCityValid = true;
    }
    
    if(zip) {
      isZipValid = true;
    }
    
    if(state) {
      isStateValid = true;
    }
    
    if(country) {
      isCountryValid = true;
    }
    
    let hasValidationError = !isFirstNameValid || !isLastNameValid || !isEmailValid || !isStreetValid || !isCityValid || !isZipValid || !isStateValid || !isCountryValid;
    
    if(hasValidationError) {
      this.setState({
        addressValidation: {
          ...addressValidation, 
          isFirstNameValid,
          isLastNameValid,
          isEmailValid, 
          isStreetValid, 
          isCityValid, 
          isZipValid
        }
      });
    }
    else {
      this.setState({
        addressValidation: { 
          ...addressValidation,
          isFirstNameValid: true,
          isLastNameValid: true,
          isEmailValid: true, 
          isStreetValid: true, 
          isCityValid: true, 
          isZipValid: true
        }
      });
    }
    
    return !hasValidationError;
    
  }

  render() {

    let { order, orderCompletion, updateOrder, updateOrderCompletion, setCurrentBreadcrumb, setIsLoading } = this.props;
    let { stateOptions, countryOptions, address, addressValidation, hasSubmittedShippingAddress } = this.state;

    return (

      <React.Fragment>
      
        { !hasSubmittedShippingAddress ? 
      
          <form className="ShippingAddressFormContainer Bordered">
    
            <section className="ShippingAddressForm">
    
              <h2 className="CheckoutFormSectionHeading">Shipping Address</h2>
    
              <div className="InputSection FirstNameInput">
                <div className="InputLabel">
                  <label htmlFor="firstname">First Name</label>
                </div>
                <div className={ addressValidation.isFirstNameValid ? "InputField" : "InputField ValidationErroredField" }>
                  <input type="text" name="firstname" id="firstname" maxLength="100" value={ address.firstName } onChange={(event) => this.updateAddressField(AddressFields.FIRST_NAME, event.target.value)} tabIndex="1" />
                </div>
                  
                { !addressValidation.isFirstNameValid ? 
                    
                    <div className="ValidationErrorMessage">First Name is required</div>
                  
                  : null
                }
              </div>
    
              <div className="InputSection LastNameInput">
                <div className="InputLabel">
                  <label htmlFor="lastname">Last Name</label>
                </div>
                <div className={ addressValidation.isLastNameValid ? "InputField" : "InputField ValidationErroredField" }>
                  <input type="text" name="lastname" id="lastname" maxLength="100" value={ address.lastName } onChange={(event) => this.updateAddressField(AddressFields.LAST_NAME, event.target.value)} tabIndex="2" />
                </div>
                  
                { !addressValidation.isLastNameValid ? 
                    
                    <div className="ValidationErrorMessage">Last Name is required</div>
                  
                  : null
                }
              </div>
              
              <div className="InputSection EmailInput">
                <div className="InputLabel">
                  <label htmlFor="email">E-Mail</label>
                </div>
                <div className={ addressValidation.isEmailValid ? "InputField" : "InputField ValidationErroredField" }>
                  <input type="email" name="email" id="email" maxLength="100" value={ address.email } onChange={(event) => this.updateAddressField(AddressFields.EMAIL, event.target.value)} tabIndex="3" />
                </div>
                  
                { !addressValidation.isEmailValid ? 
                    
                    <div className="ValidationErrorMessage">E-Mail is required</div>
                  
                  : null
                }
              </div>
    
              <div className="InputSection StreetInput">
                <div className="InputLabel">
                  <label htmlFor="street">Street</label>
                </div>
                <div className={ addressValidation.isStreetValid ? "InputField" : "InputField ValidationErroredField" }>
                  <input type="text" name="street" id="street" maxLength="100" value={ address.street } onChange={(event) => this.updateAddressField(AddressFields.STREET, event.target.value)} tabIndex="4" />
                </div>
                  
                { !addressValidation.isStreetValid ? 
                    
                    <div className="ValidationErrorMessage">Street is required</div>
                  
                  : null
                }
              </div>
    
              <div className="InputSection CityInput">
                <div className="InputLabel">
                  <label htmlFor="city">City</label>
                </div>
                <div className={ addressValidation.isCityValid ? "InputField" : "InputField ValidationErroredField" }>
                  <input type="text" name="city" id="city" maxLength="100" value={ address.city } onChange={(event) => this.updateAddressField(AddressFields.CITY, event.target.value)} tabIndex="5" />
                </div>
                  { !addressValidation.isCityValid ? 
                    
                      <div className="ValidationErrorMessage">City is required</div>
                    
                    : null
                  }
              </div>
    
              <div className="InputSection StateInput">
                <div className="InputLabel">
                  <label htmlFor="state">State</label>
                </div>
    
                <div className="InputField">
                  <select className="FormSelect" name="state" id="state" value={ address.state } onChange={(event) => this.updateAddressField(AddressFields.STATE, event.target.value)} tabIndex="6">
    
                  { 
                    stateOptions.map(stateOption => {
    
                      return <option key={stateOption.code} value={stateOption.code}>{stateOption.name}</option>
                    })
                  }
                  </select>
                </div>
              </div>
    
              <div className="InputSection ZipInput">
                <div className="InputLabel">
                  <label htmlFor="zip">Zip Code</label>
                </div>
                <div className={ addressValidation.isZipValid ? "InputField" : "InputField ValidationErroredField" }>
                  <input 
                    type="number" 
                    name="zip" 
                    id="zip" 
                    value={ address.zip } 
                    onChange={(event) => this.updateAddressField(AddressFields.ZIP, event.target.value)} 
                    tabIndex="7" />
                </div>
                  
                { !addressValidation.isZipValid ? 
                    
                    <div className="ValidationErrorMessage">Zip is required</div>
                  
                  : null
                }
              </div>
    
              <div className="InputSection CountryInput">
                <div className="InputLabel">
                  <label htmlFor="country">Country</label>
                </div>
                <div className="InputField">
                  <select className="FormSelect" name="country" id="country" onChange={(event) => this.updateAddressField(AddressFields.COUNTRY, event.target.value)} tabIndex="8">
    
                  { 
                    countryOptions.map(countryOption => {
    
                      return <option key={countryOption} value={countryOption}>{countryOption}</option>
                    })
                  }
                  </select>
                </div>
              </div>
              
              { !addressValidation.isAddressValid ? 
                  
                  <div className="ValidationErrorMessage AddressNotValidMessage">The provided address was not found. <br />Please verify the address is correct and then try again.</div>
                
                : null
              }
              
            </section>
    
            <button type="submit" className="MediumButton SubmitShippingAddressButton" onClick={(e) => this.gatherAddressDetails(e)}>Submit Address</button>
    
          </form>
        
          :
        
          <ShippingMethods 
            address={address} 
            order={ order } 
            updateOrder={ updateOrder } 
            orderCompletion={ orderCompletion } 
            updateOrderCompletion={ updateOrderCompletion } 
            setCurrentBreadcrumb={ setCurrentBreadcrumb }
            setIsLoading={ setIsLoading } />
        }
      </React.Fragment>
    )
  }

}

export default ShippingAddressForm;

