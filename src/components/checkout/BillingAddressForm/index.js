import React, { Component } from 'react';
import axios from 'axios';

/* Styles */
import './index.css';

/* Utility */
import RESTHelper from '../../../utility/RESTHelper/';

const AddressFields = {
  CITY: "city",
  COUNTRY: "country", 
  FIRST_NAME: "firstName", 
  LAST_NAME: "lastName", 
  STATE: "state", 
  STREET: "street", 
  ZIP: "zip"
}

class BillingAddressForm extends Component {
  
  constructor(props) {
    
    super(props);

    this.state = {
      address: {
        city: '',
        country: 'US', 
        firstName: '', 
        lastName: '', 
        state: 'AL', 
        street: '', 
        zip: ''
      },
      addressValidation: {
        isAddressValid: true, 
        isFirstNameValid: true,
        isLastNameValid: true,
        isStreetValid: true,
        isCityValid: true,
        isZipValid: true
      }, 
      stateOptions: [],
      countryOptions: ["United States"],
      useShippingAddress: false
    };

    this.RESTHelper = new RESTHelper(process.env.NODE_ENV);

    this.updateAddressField = this.updateAddressField.bind(this);
    this.gatherAddressDetails = this.gatherAddressDetails.bind(this);
    this.getStates = this.getStates.bind(this);
    this.validateAddressFields = this.validateAddressFields.bind(this);
    this.copyShippingAddressToBillingAddress = this.copyShippingAddressToBillingAddress.bind(this);
  }

  componentDidMount() {

    let { address } = this.state;
    let { order } = this.props;
    
    window.scrollTo(0, 0);
    
    this.getStates();
    this.setState({
      address: {
        city: order.billingAddress.city ? order.billingAddress.city : address.city, 
        country: order.billingAddress.country ? order.billingAddress.country : address.country, 
        firstName: order.billingAddress.firstName ? order.billingAddress.firstName : address.firstName, 
        lastName: order.billingAddress.lastName ? order.billingAddress.lastName : address.lastName, 
        state: order.billingAddress.state ? order.billingAddress.state : address.state, 
        street: order.billingAddress.street ? order.billingAddress.street : address.street, 
        zip: order.billingAddress.zip ? order.billingAddress.zip : address.zip
      }
    });
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

    let { order, updateOrder, orderCompletion, updateOrderCompletion, setCurrentBreadcrumb, getTaxRateForAddress } = this.props;
    let { address } = this.state;
    
    e.preventDefault();
    
    if(this.validateAddressFields(address)) {

      getTaxRateForAddress(address) // easy way to validate address
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
            order.billingAddress = address;
            orderCompletion.isBillingAddressComplete = true;
  
            updateOrder(order);
            updateOrderCompletion(orderCompletion);
            
            setCurrentBreadcrumb("SUMMARY");
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
    let { city, country, firstName, lastName, state, street, zip } = address;
    
    let isFirstNameValid = false;
    let isLastNameValid = false;
    let isStreetValid = false;
    let isCityValid = false;
    let isZipValid = false;
    let isStateValid = false;
    let isCountryValid = false;
    
    if(firstName) {
      isFirstNameValid = true;
    }
    
    if(lastName) {
      isLastNameValid = true;
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
    
    let hasValidationError = !isFirstNameValid || !isLastNameValid || !isStreetValid || !isCityValid || !isZipValid || !isStateValid || !isCountryValid;
    
    if(hasValidationError) {
      
      this.setState({
        addressValidation: {
          ...addressValidation, 
          isFirstNameValid,
          isLastNameValid,
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
          isStreetValid: true, 
          isCityValid: true, 
          isZipValid: true
        }
      });
    }
    
    return !hasValidationError; 
  }
  
  copyShippingAddressToBillingAddress(event) {
    
    let { order } = this.props;
    
    if(event.target.checked) {
      
      this.setState({
        address: {
          city: order.shippingAddress.city,
          country: order.shippingAddress.country, 
          firstName: order.shippingAddress.firstName, 
          lastName: order.shippingAddress.lastName, 
          state: order.shippingAddress.state, 
          street: order.shippingAddress.street, 
          zip: order.shippingAddress.zip
        }, 
        useShippingAddress: true
      });
    }
    else {
      this.setState({ 
        useShippingAddress: false
      });
    }
  }

  render() {

    let { stateOptions, countryOptions, address, addressValidation, useShippingAddress } = this.state;

    return (
      
      <form className="BillingAddressFormContainer Bordered">

        <section className="BillingAddressForm">

          <h2 className="CheckoutFormSectionHeading">Billing Address</h2>
          
          <div className="UseShippingAddressCheckboxContainer">
            <label>
              <input type="checkbox" name="use_shipping_address" checked={ useShippingAddress } onChange={(event) => this.copyShippingAddressToBillingAddress(event)} />
              Use Shipping Address
            </label>
          </div>

          <div className="InputSection FirstNameInput">
            <div className="InputLabel">
              <label htmlFor="firstname">First Name</label>
            </div>
            <div className={ addressValidation.isFirstNameValid ? "InputField" : "InputField ValidationErroredField" }>
              <input type="text" name="firstname" id="firstname" maxLength="100" value={ address.firstName } onChange={(event) => this.updateAddressField(AddressFields.FIRST_NAME, event.target.value)} tabindex="1" />
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
              <input type="text" name="lastname" id="lastname" maxLength="100" value={ address.lastName } onChange={(event) => this.updateAddressField(AddressFields.LAST_NAME, event.target.value)} tabindex="2" />
            </div>
              
            { !addressValidation.isLastNameValid ? 
                
                <div className="ValidationErrorMessage">Last Name is required</div>
              
              : null
            }
          </div>

          <div className="InputSection StreetInput">
            <div className="InputLabel">
              <label htmlFor="street">Street</label>
            </div>
            <div className={ addressValidation.isStreetValid ? "InputField" : "InputField ValidationErroredField" }>
              <input type="text" name="street" id="street" maxLength="100" value={ address.street } onChange={(event) => this.updateAddressField(AddressFields.STREET, event.target.value)} tabindex="4" />
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
              <input type="text" name="city" id="city" maxLength="100" value={ address.city } onChange={(event) => this.updateAddressField(AddressFields.CITY, event.target.value)} tabindex="5" />
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
              <select className="FormSelect" name="state" id="state" value={ address.state } onChange={(event) => this.updateAddressField(AddressFields.STATE, event.target.value)} tabindex="6">

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
                tabindex="7" />
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
              <select className="FormSelect" name="country" id="country" onChange={(event) => this.updateAddressField(AddressFields.COUNTRY, event.target.value)} tabindex="8">

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

        <button type="submit" className="MediumButton SubmitBillingAddressButton" onClick={(e) => this.gatherAddressDetails(e)}>Submit Address</button>

      </form>
    )
  }

}

export default BillingAddressForm;

